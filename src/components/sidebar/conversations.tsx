"use client";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import capitalize from "lodash-es/capitalize";
import { type Conversations } from "@/server/api/routers/ai";

export function ConversationsList({
  conversations,
}: {
  conversations: Conversations;
}) {
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
