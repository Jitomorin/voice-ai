import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";

export function Chat({ isMobile }: any) {
  const messages = [
    { id: 1, name: "Jane Doe", avatar: "/demo-img.jpg", message: "Hey, Jakob" },
    {
      id: 2,
      name: "John Smith",
      avatar: "/demo-img2.jpg",
      message: "Hello, Jane!",
    },
  ];

  const selectedUser = { id: 1, name: "Jane Doe", avatar: "/demo-img.jpg" };

  const [messagesState, setMessages] = React.useState(messages);

  const sendMessage = (newMessage: any) => {
    setMessages([...messagesState, newMessage]);
  };

  return (
    <div className="flex w-full h-full  border bg-white ">
      <div className=" flex flex-col border border-r h-full w-1/4 ">
        <div className="flex items-center gap-2 py-3 border-b hover:bg-accent px-4 cursor-pointer transition-all ease-in-out">
          <Avatar className="flex justify-center items-center">
            <AvatarImage
              src={selectedUser.avatar}
              alt={selectedUser.name}
              width={6}
              height={6}
              className="w-10 h-10 "
            />
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{selectedUser.name}</span>
            <span className="text-xs">Active 2 mins ago</span>
          </div>
        </div>
        <div className="flex items-center gap-2 py-3 border-b hover:bg-accent px-4 cursor-pointer transition-all ease-in-out">
          <Avatar className="flex justify-center items-center">
            <AvatarImage
              src={selectedUser.avatar}
              alt={selectedUser.name}
              width={6}
              height={6}
              className="w-10 h-10 "
            />
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{selectedUser.name}</span>
            <span className="text-xs">Active 2 mins ago</span>
          </div>
        </div>
        <div className="flex items-center gap-2 py-3 border-b hover:bg-accent px-4 cursor-pointer transition-all ease-in-out">
          <Avatar className="flex justify-center items-center">
            <AvatarImage
              src={selectedUser.avatar}
              alt={selectedUser.name}
              width={6}
              height={6}
              className="w-10 h-10 "
            />
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{selectedUser.name}</span>
            <span className="text-xs">Active 2 mins ago</span>
          </div>
        </div>
        <div className="flex items-center gap-2 py-3 border-b hover:bg-accent px-4 cursor-pointer transition-all ease-in-out">
          <Avatar className="flex justify-center items-center">
            <AvatarImage
              src={selectedUser.avatar}
              alt={selectedUser.name}
              width={6}
              height={6}
              className="w-10 h-10 "
            />
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{selectedUser.name}</span>
            <span className="text-xs">Active 2 mins ago</span>
          </div>
        </div>
      </div>
      <div className="w-full h-auto">
        <ChatTopbar selectedUser={selectedUser} />

        <ChatList
          messages={messagesState}
          selectedUser={selectedUser}
          sendMessage={sendMessage}
          isMobile={false}
        />
      </div>
    </div>
  );
}
