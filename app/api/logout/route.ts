import { NextResponse } from "next/server";
import { deleteCookie, setCookie } from "cookies-next";
import { cookies } from "next/headers";

// This function handles the GET request for the logout API
export async function GET() {
  // Delete the accessToken cookie
  cookies().set("accessToken", "", {
    httpOnly: true, // Ensures that the cookie is not accessible via JavaScript
    path: "/",
    maxAge: -1,
  });

  return new NextResponse(
    JSON.stringify({ message: "Logged out successfully" }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
