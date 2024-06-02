"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import isEmpty from "lodash-es/isEmpty";
import { cn } from "@/lib/utils";

export function ChatInput() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");

  const submitPrompt = api.ai.completion.useMutation({
    onSuccess: () => {
      router.refresh();
      setPrompt("");
    },
  });
  const onEnterKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!submitPrompt.isPending && !isEmpty(prompt)) {
        submitPrompt.mutate({ prompt });
      }
    }
  };

  return (
    <form
      className="flex items-center gap-2 border-t border-gray-300 px-4 py-2"
      onSubmit={(e) => {
        e.preventDefault();
        submitPrompt.mutate({ prompt });
      }}
    >
      <Textarea
        className="scrollbar-app resize-none overflow-y-auto rounded-lg text-lg placeholder:text-muted-foreground/50"
        placeholder="Tell me more about ReflexAI"
        disabled={submitPrompt.isPending}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={onEnterKey}
      />
      <Button
        className="h-14 rounded-lg bg-accent text-accent-foreground/50 hover:text-accent-foreground/50"
        variant="outline"
        type="submit"
        disabled={submitPrompt.isPending}
      >
        <Send className={cn(submitPrompt.isPending && "animate-pulse")} />
      </Button>
    </form>
  );
}
