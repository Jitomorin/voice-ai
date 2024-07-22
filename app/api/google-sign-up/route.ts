import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/utils/mongodb";
import User from "@/model/User";
import { generateAccessAndRefreshTokens } from "@/utils/generateAccessAndRefreshTokens";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("body", body.decoded);
  const { email, name,picture } = body.decoded;
  if (!email || !name) {
    return NextResponse.json(
      {
        message: "email and name are required",
      },
      {
        status: 400,
        statusText: "Bad Request",
      }
    );
  }

  await dbConnect();

  try {
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        {
          status: 401,
          statusText: "Unauthorized",
        }
      );
    }

    const { accessToken, refreshToken } = generateAccessAndRefreshTokens({
      email,
      name,
      provider: "google",
      role: "user",
    });

    const user = await User.create({
      email,
      fullName: name,
      provider: "google",
      isVerified: true,
      password: null,
      role: "user",
      refreshToken,
      profilePic: picture
    });
    cookies().set("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    cookies().set("accessToken", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 1,
    });
    cookies().set("userRole", user.role, {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 24 * 1,
    });
    await user.save();
    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          email: user.email,
        },
      },
      {
        status: 201,
        statusText: "Created",
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
}
