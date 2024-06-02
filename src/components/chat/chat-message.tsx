import React from "react";
import { type Message } from "@/server/api/routers/ai";
import { Bot } from "lucide-react";

const UserMessage = ({ content }: { content: string }) => {
  return (
    <div className="flex w-full flex-col items-end">
      <div className="relative max-w-[70%] rounded-3xl bg-muted px-5 py-2.5">
        {content}
      </div>
    </div>
  );
};
const SystemMessage = ({ content }: { content: string }) => {
  return (
    <div className="flex h-full w-full items-start justify-start">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
        <Bot />
      </div>
      <div className="relative w-full flex-1 px-5 py-2 text-left rtl:text-right">
        {content}
      </div>
    </div>
  );
};
export const ChatMessage = ({ message }: { message: Message }) => {
  const Message = message.role === "user" ? UserMessage : SystemMessage;
  return <Message content={message.content} />;
};
