"use client";

import { ChatMessage } from "@/components/chat/chat-message";
import { cn } from "@/lib/utils";
import { type Message } from "@/server/api/routers/ai";
import { Loader2 } from "lucide-react";
import React from "react";

export const ChatMessageList = ({
  messages,
  isLoading = false,
}: {
  isLoading?: boolean;
  messages: Message[];
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  console.log(messages);
  React.useEffect(() => {
    if (messages.length) {
      setTimeout(() => {
        ref.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 50);
    }
  }, [messages.length]);

  return (
    <div className="scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-200 flex max-h-full w-full max-w-full flex-1 flex-col  justify-start overflow-auto">
      <div className="mb-[150px] flex flex-col  gap-6 px-2 py-5 " ref={ref}>
        {messages.map((message) => (
          <ChatMessage message={message} key={message?.id} />
        ))}
      </div>
      <div className="h-[200px] w-full" ref={ref}></div>
      <div
        className={cn(
          "flex items-center gap-2 p-2 text-sm opacity-50",
          !isLoading && "hidden",
        )}
      >
        <Loader2 className="animate-spin" />{" "}
        <span className="animate-pulse text-sm">Working...</span>
      </div>
    </div>
  );
};
