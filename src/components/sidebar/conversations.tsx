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
import isEmpty from "lodash-es/isEmpty";
import { TimeAgo } from "@/components/ui/timeago";
import { TooltipWrapper as Tooltip } from "@/components/ui/tooltip-wrapper";

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
    if (isActive) {
      router.push("/chat/");
    }
    deleteChat.mutate({ id });
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
            className={cn(
              "focus-visible:ring:ring-primary group relative flex flex-col gap-0 rounded-lg px-1 text-muted-foreground transition-all ",
            )}
          >
            <div
              className={cn(
                "rounded-lg pl-0.5 hover:bg-muted/60 hover:text-primary",
                active && "bg-muted text-primary/80 hover:bg-muted",
              )}
            >
              <Link
                href={`/chat/${conversation.id}`}
                className={cn(
                  "flex flex-1 items-center justify-start gap-1.5 rounded-lg px-0.5 py-2 ",
                )}
              >
                <MessageSquare className="h-4 w-4 shrink-0 text-inherit" />
                <span className="max-w-[250px] truncate  sm:max-w-[150px]">
                  {capitalize(conversation.description)}
                </span>
              </Link>
              <Tooltip tooltip="Delete" side="right" sideOffset={8}>
                <Button
                  variant="icon"
                  size="icon"
                  className="absolute right-1.5 top-2  hidden justify-self-end text-muted-foreground hover:flex group-hover:flex"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(conversation.id, active);
                  }}
                >
                  <Trash2 className=" text-inherit hover:text-primary" />
                </Button>
              </Tooltip>
            </div>
            <TimeAgo
              timestamp={conversation.createdAt}
              className={cn(
                "invisible pb-0.5 pl-8 text-[10px] leading-tight text-muted-foreground group-hover:visible",
                active && "visible",
              )}
            />
          </li>
        );
      })}
    </ul>
  );
}
