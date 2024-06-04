"use client";

import { MessageSquare, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import capitalize from "lodash-es/capitalize";
import { type Conversations } from "@/server/api/routers/ai";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

export function ConversationsList({
  conversations,
}: {
  conversations: Conversations;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (path: string) => path === pathname;

  const deleteChat = api.ai.deleteChat.useMutation({
    onSuccess: () => {
      toast.success("Conversation deleted successfully");
      router.refresh();
    },
    onError: () => {
      toast.error("Error deleting conversation");
    },
  });

  const handleDelete = (id: string, isActive?: boolean) => {
    deleteChat.mutate({ id });
    if (isActive) {
      router.push("/chat");
    }
  };

  return (
    <ul>
      {conversations.map((conversation) => {
        const active = isActive(`/chat/${conversation.id}`);
        return (
          <li
            key={conversation.id}
            className="focus-visible:ring:ring-primary group flex items-center justify-between"
          >
            <Link
              href={`/chat/${conversation.id}`}
              className={cn(
                " flex  items-center gap-3 rounded-lg px-1 py-2 text-muted-foreground transition-all hover:text-primary",
                active && "bg-muted text-primary/80",
              )}
            >
              <MessageSquare className="h-4 w-4 shrink-0 text-inherit" />
              <span className="max-w-[150px] truncate lg:max-w-[200px]">
                {capitalize(conversation.description)}
              </span>
            </Link>
            <Button
              variant="icon"
              size="icon"
              className="hidden justify-self-end text-muted-foreground hover:flex group-hover:flex"
              onClick={() => handleDelete(conversation.id, active)}
            >
              <Trash2 className=" text-inherit hover:text-primary" />
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
