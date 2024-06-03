"use client";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import capitalize from "lodash-es/capitalize";
import { type Message } from "@/server/api/routers/ai";

//  replace this with a trpc call to get the conversations
export type Conversation = {
  id: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  chatHistory?: Message[];
};
const conversations: Conversation[] = [
  {
    id: "conversation-1",
    description: "Conversation about ReflexAI",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "conversation-2",
    description: "Another conversation about ReflexAI very very very long",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function ConversationsList() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  return (
    <ul>
      {conversations.map((conversation) => {
        const active = isActive(`/chat/${conversation.id}`);
        return (
          <li key={conversation.id} className="focus-visible:ring:ring-primary">
            <Link
              href={`/chat/${conversation.id}`}
              className={cn(
                "flex items-center  gap-3  rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ",
                active && "bg-muted text-primary/80",
              )}
            >
              <MessageSquare className="h-4 w-4 shrink-0 text-inherit" />
              <span className="max-w-[150px] truncate lg:max-w-[200px]">
                {capitalize(conversation.description)}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
