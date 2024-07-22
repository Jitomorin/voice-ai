import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import ChatBottombar from "./chat-bottombar";
import { AnimatePresence, motion } from "framer-motion";

export function ChatList({
  messages,
  selectedUser,
  sendMessage,
  isMobile,
}: any) {
  const messagesContainerRef = useRef(null);

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      // @ts-ignore
      messagesContainerRef.current.scrollTop =
        //   @ts-ignore
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full my-2 flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden min-h-[89vh] flex flex-col"
      >
        <AnimatePresence>
          {messages.map((message: any, index: any) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: index * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                message.name !== selectedUser.name ? "items-end" : "items-start"
              )}
            >
              <div className="flex gap-5 items-center ">
                {message.name === selectedUser.name && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={message.avatar}
                      alt={message.name}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
                <span
                  className={`${
                    message.name === selectedUser.name
                      ? "bubble-left"
                      : "bubble-right"
                  } bg-accent rounded-md max-w-xs`}
                >
                  {message.message}
                </span>
                {message.name !== selectedUser.name && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={message.avatar}
                      alt={message.name}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ChatBottombar sendMessage={sendMessage} isMobile={isMobile} />
    </div>
  );
}
