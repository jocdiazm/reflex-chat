"use client";

import { ChatInput } from "@/components/chat/chat-input";
import { ChatHistory } from "@/components/chat/chat-history";
import React from "react";
import { type Message } from "@/server/api/routers/ai";
import { EmptyScreen } from "@/components/chat/chat-empty";
import isEmpty from "lodash-es/isEmpty";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";
import { toast } from "sonner";

export function Chat({ id, messages }: { id?: string; messages?: Message[] }) {
  const router = useRouter();
  const utils = api.useUtils();
  const [prompt, setPrompt] = useState("");

  const optimisticHistory = [
    { id: "pending-user", role: "user", content: prompt },
    { id: "pending-assistant", role: "assistant", content: "" },
  ] as Message[];

  const submitPrompt = api.ai.completion.useMutation({
    onSuccess: async ({ id: conversationId }) => {
      router.refresh();
      setPrompt("");
      if (id) {
        await utils.ai.getChatHistory.refetch({ id });
      }
      if (!id) {
        router.push(`/chat/${conversationId}`);
      }
    },
    onError: () => {
      toast.error("Humn... so, there was an error.", {
        description:
          "We couldn't process your request. Please try again later.",
      });
    },
  });

  const handleSubmitPrompt = async ({
    prompt,
    id,
  }: {
    prompt: string;
    id?: string;
  }) => {
    submitPrompt.mutate({ prompt, id });
  };
  const optimisticMessages =
    submitPrompt.isPending && messages
      ? [...messages, ...optimisticHistory]
      : messages;

  return (
    <div className="relative flex h-full w-full flex-col">
      {!id || isEmpty(messages) ? (
        <EmptyScreen />
      ) : (
        <ChatHistory messages={optimisticMessages} isLoading={true} />
      )}
      <div className="absolute bottom-0  w-full rounded-t-3xl border-t border-border/50 bg-background pb-4 backdrop-blur-lg supports-[backdrop-filter]:bg-background/50">
        <ChatInput
          id={id}
          onSubmitPrompt={handleSubmitPrompt}
          prompt={prompt}
          setPrompt={setPrompt}
          isPendingSubmit={submitPrompt.isPending}
        />
      </div>
    </div>
  );
}
