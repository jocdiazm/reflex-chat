import { z } from "zod";

import OpenAI from "openai";
import { env } from "@/env";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { uniqueId } from "lodash-es";
import { type ChatCompletionCreateParams } from "openai/resources/index.mjs";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

export type Message = {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
};

let messages: Message[] = [
  {
    id: uniqueId("prompt"),
    role: "user",
    content: "Hello, my name is Jose,  how are you?",
  },
  {
    id: uniqueId("prompt"),
    role: "assistant",
    content:
      "Hello Jose, I'm doing well, thank you for asking. How can I help you today?",
  },
  {
    id: uniqueId("prompt"),
    role: "user",
    content: "Tell me more about yourself and ReflexAI",
  },
  {
    id: uniqueId("prompt"),
    role: "assistant",
    content:
      "ReflexAI is more than a call center software company. We are on a mission to improve training and quality assurance at contact centers and organizations providing human-led support, particularly among individuals who deal with sensitive or critical situations. Our team continues to push boundaries and break barriers, driven by our passion to make a difference in the lives of those in need.",
  },
];

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const aiRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `prompt: ${input.text}`,
      };
    }),

  completion: publicProcedure
    .input(z.object({ prompt: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const chatHistory = messages.map((message) => {
        const { role, content } = message;
        return {
          role,
          content,
        };
      }) as ChatCompletionCreateParams["messages"];

      const chatCompletion = await openai.chat.completions.create({
        messages: [...chatHistory, { role: "user", content: input.prompt }],
        model: "gpt-3.5-turbo",
        temperature: 0.7,
      });
      const message = chatCompletion.choices[0]?.message.content;

      messages = [
        ...messages,
        { id: uniqueId("prompt"), role: "user", content: input.prompt },
        { id: chatCompletion.id, role: "assistant", content: message ?? "" },
      ];

      return chatCompletion.choices[0]?.message.content;
    }),

  getMessages: publicProcedure.query(() => {
    return messages;
  }),
});
