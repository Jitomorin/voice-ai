"use client";
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
const GoogleOAuthProvide = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <GoogleOAuthProvider clientId="67588996400-ea4p83haedt9h4is518a97lc17k9lflk.apps.googleusercontent.com">
        {children}
      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleOAuthProvide;
