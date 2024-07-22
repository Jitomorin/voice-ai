import {
  FileImage,
  Mic,
  Paperclip,
  PlusCircle,
  SendHorizontal,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottombar({
  sendMessage, isMobile, 
} : any
) {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const handleInputChange = (event:any) => {
    setMessage(event.target.value);
  };

  const handleThumbsUp = () => {
    const newMessage = {
      id: message.length + 1,
      name: 'Current User',
      avatar: '/current-user-avatar.jpg',
      message: "👍",
    };
    sendMessage(newMessage);
    setMessage("");
  };

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: message.length + 1,
        name: 'Current User',
        avatar: '/current-user-avatar.jpg',
        message: message.trim(),
      };
      sendMessage(newMessage);
      setMessage("");

      if (inputRef.current) {
        // @ts-ignore
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (event:any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  return (
    <div className="p-2 flex justify-between w-full items-center gap-2">
      <div className="flex">
          <Popover>
            <PopoverTrigger asChild>
            <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-9 w-9",
            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
          )}
        >
          <PlusCircle size={20} className="text-muted-foreground" />
        </Link>
            </PopoverTrigger>
            <PopoverContent 
            side="top"
            className="w-full p-2">
             {message.trim() || isMobile ? (
               <div className="flex gap-2">
                <Link 
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
              )}
              >
                <Mic size={20} className="text-muted-foreground" />
              </Link>
               {BottombarIcons.map((icon, index) => (
                 <Link
                   key={index}
                   href="#"
                   className={cn(
                     buttonVariants({ variant: "ghost", size: "icon" }),
                     "h-9 w-9",
                     "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                   )}
                 >
                   <icon.icon size={20} className="text-muted-foreground" />
                 </Link>
               ))}
             </div>
             ) : (
              <Link 
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
              )}
              >
                <Mic size={20} className="text-muted-foreground" />
              </Link>
             )}
            </PopoverContent>
          </Popover>
        {!message.trim() && !isMobile && (
          <div className="flex">
            {BottombarIcons.map((icon, index) => (
              <Link
                key={index}
                href="#"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-9 w-9",
                  "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                )}
              >
                <icon.icon size={20} className="text-muted-foreground" />
              </Link>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          key="input"
          className="w-full relative"
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: "spring",
              bounce: 0.15,
            },
          }}
        >
          <Textarea
            autoComplete="off"
            value={message}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            name="message"
            placeholder="Aa"
            className=" w-full border rounded-2xl flex items-center h-4 resize-none overflow-hidden bg-background"
          ></Textarea>
        </motion.div>

        {message.trim() ? (
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            )}
            onClick={handleSend}
          >
            <SendHorizontal size={20} className="text-muted-foreground" />
          </Link>
        ) : (
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            )}
            onClick={handleThumbsUp}
          >
            <ThumbsUp size={20} className="text-muted-foreground" />
          </Link>
        )}
      </AnimatePresence>
    </div>
  );
}
