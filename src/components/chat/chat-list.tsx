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
    <div className="flex w-full max-w-full flex-1 flex-col justify-end overflow-hidden">
      <div className="scrollbar-thin  scrollbar-track-gray-100 scrollbar-thumb-gray-200 flex flex-col-reverse gap-6 overflow-y-auto p-10">
        {messages
          ?.reverse()
          .map((message) => <ChatMessage message={message} key={message?.id} />)
          .reverse()}
      </div>
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
