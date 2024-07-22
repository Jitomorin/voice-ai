import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/utils/mongodb";
import User from "@/model/User";
import { generateAccessAndRefreshTokens } from "@/utils/generateAccessAndRefreshTokens";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return NextResponse.json(
        { message: "Email, name, and password are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { accessToken, refreshToken } = generateAccessAndRefreshTokens({
      email,
      name,
      provider: "userpassword",
      role: "user",
    });

    const user = await User.create({
      email,
      fullName: name,
      provider: "userpassword",
      isVerified: false,
      password: hashedPassword,
      role: "user",
      refreshToken,
    });

    const cookieOptions = {
      httpOnly: true,
      path: "/",
    };

    cookies().set("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 30,
    });
    cookies().set("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24,
    });
    cookies().set("userRole", user.role, { path: "/", maxAge: 60 * 60 * 24 });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: { email: user.email },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
