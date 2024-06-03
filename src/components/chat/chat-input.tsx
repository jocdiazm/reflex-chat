"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import isEmpty from "lodash-es/isEmpty";
import { cn } from "@/lib/utils";

export function ChatInput({
  id,
  prompt,
  setPrompt,
  isPendingSubmit,
  onSubmitPrompt,
}: {
  id?: string;
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmitPrompt: ({ prompt, id }: { prompt: string; id?: string }) => void;
  isPendingSubmit: boolean;
}) {
  const onEnterKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isPendingSubmit && !isEmpty(prompt)) {
        onSubmitPrompt({ prompt, id });
      }
    }
  };

  return (
    <form
      className="mx-2 flex  items-center gap-2 border-gray-300 px-4 py-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitPrompt({ prompt, id });
      }}
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
  );
}
