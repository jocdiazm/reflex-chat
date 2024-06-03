import React from "react";
import { type Message } from "@/server/api/routers/ai";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const UserMessage = ({
  content,
  optimistic,
}: {
  content: string;
  optimistic?: boolean;
}) => {
  return (
    <div className="flex w-full flex-col items-end">
      <div
        className={cn(
          "relative max-w-[70%] rounded-3xl bg-muted px-5 py-2.5",
          optimistic && "animate-pulse bg-muted",
        )}
      >
        {content}
      </div>
    </div>
  );
};
const SystemMessage = ({
  content,
  optimistic,
}: {
  content: string;
  optimistic?: boolean;
}) => {
  return (
    <div className="flex h-full w-full items-start justify-start">
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full bg-muted",
          optimistic && "animate-pulse bg-muted",
        )}
      >
        <Bot className={cn(optimistic && "text-muted-foreground")} />
      </div>
      {optimistic ? (
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="duration-[800] ml-2 h-[20px] w-[80%] animate-pulse rounded-full" />
          <Skeleton className="duration-[700] ml-2 h-[20px] w-[80%] animate-pulse rounded-full" />
          <Skeleton className="ml-2 h-[20px] w-[60%] animate-pulse rounded-full" />
        </div>
      ) : (
        <div className="relative w-full flex-1 px-5 py-2 text-left rtl:text-right">
          {content}
        </div>
      )}
    </div>
  );
};
export const ChatMessage = ({ message }: { message: Message }) => {
  const Message = message.role === "user" ? UserMessage : SystemMessage;
  return (
    <Message
      content={message.content}
      optimistic={message.id.includes("pending")}
    />
  );
};
