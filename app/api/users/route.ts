import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/mongodb";
import User from "@/model/User";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const users = await User.find({}, { password: 0, refreshToken: 0 }); // Exclude sensitive fields

    return NextResponse.json(
      {
        message: "Users retrieved successfully",
        users,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /users:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
