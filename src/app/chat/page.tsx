import { api } from "@/trpc/server";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessageList } from "@/components/chat/chat-list";
import React from "react";

export default async function ChatPage() {
  const rawMessages = await api.ai.getMessages();
  const messages = rawMessages.filter(
    (message) => message.role === "assistant" || message.role === "user",
  );
  return (
    <div className="flex h-full w-full flex-col">
      <ChatMessageList messages={messages} />
      <div className="absolute bottom-0  m-0 w-full rounded-t-3xl border-t border-border/50 bg-background pb-4 backdrop-blur-lg supports-[backdrop-filter]:bg-background/50">
        <ChatInput />
      </div>
    </div>
  );
}
