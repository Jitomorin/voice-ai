import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/utils/mongodb";
import User from "@/model/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Middleware to verify access token
const verifyAccessToken = (request: NextRequest) => {
  const accessToken =
    cookies().get("accessToken")?.value ||
    request.headers.get("Authorization")?.split(" ")[1];

  if (!accessToken) {
    return { error: "Access token is required", status: 401 };
  }

  try {
    const decoded = jwt.verify(accessToken, "access-token-secret");
    return { decoded };
  } catch (err) {
    return { error: "Invalid access token", status: 401 };
  }
};

// Get all users or a specific user by id
export async function GET(request: NextRequest) {
  try {
    const verification = verifyAccessToken(request);
    if (verification.error) {
      return NextResponse.json(
        { message: verification.error },
        { status: verification.status }
      );
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");

    if (userId) {
      const user = await User.findById(userId);
      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: "User retrieved successfully", user },
        { status: 200 }
      );
    } else {
      const users = await User.find({});
      return NextResponse.json(
        { message: "Users retrieved successfully", users },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error in GET /users:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create a new user
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
    const user = new User({
      email,
      fullName: name,
      password: hashedPassword,
      provider: "userpassword",
      isVerified: true,
      role: "user",
    });
    await user.save();

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /users:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update user information
export async function PUT(request: NextRequest) {
  try {
    const verification = verifyAccessToken(request);
    if (verification.error) {
      return NextResponse.json(
        { message: verification.error },
        { status: verification.status }
      );
    }

    const body = await request.json();
    const { id, email, name, password } = body;

    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (email) user.email = email;
    if (name) user.fullName = name;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();

    return NextResponse.json(
      { message: "User updated successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PUT /users:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete a user by id
export async function DELETE(request: NextRequest) {
  try {
    const verification = verifyAccessToken(request);
    if (verification.error) {
      return NextResponse.json(
        { message: verification.error },
        { status: verification.status }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE /users:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
