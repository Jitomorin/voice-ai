import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/utils/mongodb";
import User from "@/model/User";
import { generateAccessAndRefreshTokens } from "@/utils/generateAccessAndRefreshTokens";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const { accessToken, refreshToken } = generateAccessAndRefreshTokens({
      email: user.email,
      name: user.fullName,
      provider: user.provider,
      role: user.role,
    });

    const cookieOptions = {
      httpOnly: true,
      path: "/",
    };

    cookies().set("refreshToken", refreshToken, { ...cookieOptions, maxAge: 60 * 60 * 24 * 30 });
    cookies().set("accessToken", accessToken, { ...cookieOptions, maxAge: 60 * 60 * 24 });
    cookies().set("userRole", user.role, { path: "/", maxAge: 60 * 60 * 24 });

    return NextResponse.json(
      {
        message: "User signed in successfully",
        user: { email: user.email },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /signin:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
