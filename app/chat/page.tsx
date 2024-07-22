"use client";
import ChatLayout from "@/components/dashboard/chat/chat-layout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Chat() {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("email")?.toString() || "";
    if (email?.length > 0) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
     router.push("/sign-in");
    }
  }, []);

  return (
    <div className="flex flex-col w-full h-full min-h-screen">
      <ChatLayout />
    </div>
  );
}

export default Chat;
