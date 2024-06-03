import { api } from "@/trpc/server";
import React from "react";
import { Chat } from "@/components/chat/chat";

export interface ChatPageProps {
  params: {
    id: string;
  };
}
export default async function ChatPage({ params }: ChatPageProps) {
  const messages = await api.ai.getChatHistory({ id: params.id });
  return <Chat messages={messages} id={params.id} />;
}
