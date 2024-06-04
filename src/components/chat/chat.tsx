"use client";

import { ChatInput } from "@/components/chat/chat-input";
import { ChatHistory } from "@/components/chat/chat-history";
import { type Messages } from "@/server/api/routers/ai";
import React from "react";
import { EmptyScreen } from "@/components/chat/chat-empty";
import isEmpty from "lodash-es/isEmpty";
import { useRouter } from "next/navigation";

import { api } from "@/trpc/react";
import { toast } from "sonner";

export function Chat({ id, messages }: { id?: string; messages?: Messages }) {
  const router = useRouter();
  const utils = api.useUtils();

  const [optimisticPrompt, setOptimisticPrompt] =
    React.useState<Messages | null>(null);

  React.useEffect(() => {
    if (isEmpty(messages) && id) {
      toast.info("No messages to show");
      router.push("/chat/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, messages]);

  const submitPrompt = api.ai.completion.useMutation({
    onMutate: (variables) => {
      const optimisticHistory = [
        { id: "pending-user", role: "user", content: variables.prompt },
        { id: "pending-assistant", role: "assistant", content: "" },
      ] as Messages;
      setOptimisticPrompt(optimisticHistory);
    },
    onSuccess: async ({ id: conversationId }) => {
      setOptimisticPrompt(null);
      if (id) {
        await utils.ai.getChatHistory.refetch({ id });
      }
      if (!id) {
        router.push(`/chat/${conversationId}`);
        await utils.ai.getChatList.invalidate();
      }
      router.refresh();
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
    await submitPrompt.mutateAsync({ prompt, id });
  };

  const optimisticMessages =
    submitPrompt.isPending && messages && optimisticPrompt
      ? [...messages, ...optimisticPrompt]
      : messages;

  return (
    <div className="relative flex h-full w-full flex-col">
      {!id || isEmpty(messages) ? (
        <EmptyScreen />
      ) : (
        <ChatHistory messages={optimisticMessages} />
      )}
      <div className="absolute bottom-0  w-full rounded-t-3xl border-t border-border/50 bg-background pb-4 backdrop-blur-lg supports-[backdrop-filter]:bg-background/50">
        <ChatInput
          id={id}
          onSubmitPrompt={handleSubmitPrompt}
          isPendingSubmit={submitPrompt.isPending}
        />
      </div>
    </div>
  );
}
