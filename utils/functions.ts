"use client";

import { cookies } from "next/headers";

export function logout() {
  // Get the cookies object
  const cookieStore = cookies();

  // Set the accessToken cookie to expire immediately
  cookieStore.set("accessToken", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  // Optionally, redirect to the login page
  window.location.href = "/login";
}
