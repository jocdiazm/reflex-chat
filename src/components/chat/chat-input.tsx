"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import isEmpty from "lodash-es/isEmpty";
import { cn } from "@/lib/utils";
import React from "react";

export function ChatInput({
  id,
  isPendingSubmit,
  onSubmitPrompt,
}: {
  id?: string;
  onSubmitPrompt: ({ prompt, id }: { prompt: string; id?: string }) => void;
  isPendingSubmit: boolean;
}) {
  const [prompt, setPrompt] = React.useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPendingSubmit && !isEmpty(prompt)) {
      onSubmitPrompt({ prompt, id });
      setPrompt("");
    }
  };

  const onEnterKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isPendingSubmit && !isEmpty(prompt)) {
        onSubmitPrompt({ prompt, id });
        setPrompt("");
      }
    }
  };

  return (
    <>
      <div
        className={cn(
          "absolute -top-10 left-1/2 flex -translate-x-1/2  items-center gap-2 p-2 text-sm opacity-50",
          !isPendingSubmit && "hidden",
        )}
      >
        <Loader2 className="animate-spin" />
        <span className="animate-pulse text-sm">
          Working on your request...
        </span>
      </div>

      <form
        className="mx-2 flex  items-center gap-2 border-gray-300 px-4 py-2"
        onSubmit={onSubmit}
      >
        <Textarea
          className="scrollbar-app resize-none overflow-y-auto rounded-lg text-lg placeholder:text-muted-foreground/50"
          placeholder="Tell me more about ReflexAI"
          disabled={isPendingSubmit}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={onEnterKey}
        />
        <Button
          className="h-14 rounded-lg bg-accent text-accent-foreground/50 hover:text-accent-foreground/50"
          variant="outline"
          type="submit"
          disabled={isPendingSubmit}
        >
          <Send className={cn(isPendingSubmit && "animate-pulse")} />
        </Button>
      </form>
    </>
  );
}
