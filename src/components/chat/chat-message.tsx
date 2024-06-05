import React from "react";
import { type Message } from "@/server/api/routers/ai";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { TimeAgo } from "@/components/ui/timeago";
import { Avatar } from "@radix-ui/react-avatar";

const UserMessage = ({
  content,
  optimistic,
  date,
}: {
  content: string;
  optimistic?: boolean;
  date: string;
}) => {
  return (
    <div className="group flex w-full flex-col items-end">
      <div
        className={cn(
          "relative max-w-[70%] rounded-3xl bg-muted px-5 py-2.5",
          optimistic && "animate-pulse bg-muted",
        )}
      >
        {content}
      </div>
      <TimeAgo
        timestamp={date}
        className="invisible pr-4 group-hover:visible"
      />
    </div>
  );
};
const SystemMessage = ({
  content,
  date,
  optimistic,
}: {
  date: string;
  content: string;
  optimistic?: boolean;
}) => {
  return (
    <div className="flex h-full w-full items-start justify-start">
      <div
        className={cn(
          "flex h-10 w-10  items-center justify-center rounded-full bg-muted",
          optimistic && "animate-pulse bg-muted",
        )}
      >
        <Avatar>
          <Bot className={cn(optimistic && " text-muted-foreground")} />
        </Avatar>
      </div>
      {optimistic ? (
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="ml-2 h-[20px] w-[80%] animate-pulse rounded-full duration-700" />
          <Skeleton className="ml-2 h-[20px] w-[80%] animate-pulse rounded-full duration-500" />
          <Skeleton className="ml-2 h-[20px] w-[60%] animate-pulse rounded-full" />
        </div>
      ) : (
        <div className="group flex flex-col justify-center gap-0">
          <div className="relative w-full flex-1 px-2.5 py-2 text-left rtl:text-right">
            <ReactMarkdown
              className="prose dark:prose-invert break-words"
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {content.replace(/\n/g, "\n")}
            </ReactMarkdown>
          </div>
          <TimeAgo
            timestamp={date}
            className="invisible pl-4 group-hover:visible"
          />
        </div>
      )}
    </div>
  );
};
export const ChatMessage = ({ message }: { message: Message }) => {
  if (!message) return null;
  const Message = message.role === "user" ? UserMessage : SystemMessage;
  return (
    <Message
      date={message.createdAt}
      content={message.content}
      optimistic={message.id.includes("pending")}
    />
  );
};
