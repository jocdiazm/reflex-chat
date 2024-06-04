"use client";

import { MessageSquare, SquarePen, Trash2 } from "lucide-react";
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
import isEmpty from "lodash-es/isEmpty";

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
    <ul className="h-full w-full">
      {isEmpty(conversations) && (
        <li className="mt-10 flex flex-col items-center justify-center gap-2 text-center text-muted-foreground">
          <span className="inline-flex text-center font-semibold  text-muted-foreground">
            No conversations yet.
          </span>
          <span className="text-xs">
            Click the icon in the top right corner to start a new chat.
          </span>
        </li>
      )}
      {conversations.map((conversation) => {
        const active = isActive(`/chat/${conversation.id}`);
        return (
          <li
            key={conversation.id}
            className="focus-visible:ring:ring-primary group relative flex items-center justify-between px-1"
          >
            <Link
              href={`/chat/${conversation.id}`}
              className={cn(
                " flex flex-1 items-center gap-3 rounded-lg px-1 py-2 text-muted-foreground transition-all hover:text-primary",
                active && "bg-muted text-primary/80",
              )}
            >
              <MessageSquare className="h-4 w-4 shrink-0 text-inherit" />
              <span className="max-w-[150px] truncate lg:max-w-[200px]">
                {capitalize(conversation.description)}
              </span>

              <Button
                variant="icon"
                size="icon"
                className="absolute right-2 hidden justify-self-end text-muted-foreground hover:flex group-hover:flex"
                onClick={() => handleDelete(conversation.id, active)}
              >
                <Trash2 className=" text-inherit hover:text-primary" />
              </Button>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
