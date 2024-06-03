import { z } from "zod";

import OpenAI from "openai";
import { env } from "@/env";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { uniqueId } from "lodash-es";
import { type ChatCompletionCreateParams } from "openai/resources/index.mjs";
import { Conversation } from "@/components/sidebar/conversations";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

export type Message = {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
};

const systemPrompts: Message[] = [
  {
    id: uniqueId("prompt"),
    role: "system",
    content:
      "You are a helpful assistant. You can answer questions and provide information on a wide range of topics. You are not an expert in any field and your answers should be based on general knowledge and common sense.",
  },
];

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

const messages1: Message[] = [
  {
    id: uniqueId("prompt"),
    role: "user",
    content: "Hello from conversation-1",
  },
  {
    id: uniqueId("prompt"),
    role: "assistant",
    content: "Hello from conversation-1 assitant",
  },
];

const messages2: Message[] = [
  {
    id: uniqueId("prompt"),
    role: "user",
    content: "Hello from conversation-2",
  },
];

let conversations: Conversation[] = [
  {
    id: "conversation-1",
    description: "Conversation about ReflexAI",
    createdAt: new Date(),
    updatedAt: new Date(),
    chatHistory: messages1,
  },
  {
    id: "conversation-2",
    description: "Another conversation about ReflexAI very very very long",
    createdAt: new Date(),
    updatedAt: new Date(),
    chatHistory: messages2,
  },
];

const getChatHistoryById = (id?: string) => {
  if (!id) return [];
  const history = conversations.find((conversation) => conversation.id === id);
  return history?.chatHistory ?? [];
};
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
    .input(z.object({ prompt: z.string().min(1), id: z.string().optional() }))
    .mutation(async ({ input }) => {
      const userHistory = getChatHistoryById(input?.id);
      const history = [...systemPrompts, ...userHistory];
      const filteredChatHistory = history?.map((message) => {
        const { role, content } = message;
        return {
          role,
          content,
        };
      }) as ChatCompletionCreateParams["messages"];

      const chatCompletion = await openai.chat.completions.create({
        messages: [
          ...filteredChatHistory,
          { role: "user", content: input.prompt },
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.7,
      });
      const message = chatCompletion.choices[0]?.message.content;

      const newHistory = [
        { id: uniqueId("prompt"), role: "user", content: input.prompt },
        {
          id: chatCompletion.id,
          role: "assistant",
          content: message ?? "",
        },
      ] as Message[];

      //  this is supposed to be an upsert of the new history or conversation
      const conversationId = input.id ?? uniqueId("conversation");

      if (!input.id) {
        conversations = [
          ...conversations,
          {
            id: conversationId,
            description: `${input.prompt}`.slice(0, 25),
            createdAt: new Date(),
            updatedAt: new Date(),
            chatHistory: newHistory,
          },
        ];
      } else {
        const conversation = conversations.find(
          (conversation) => conversation.id === input.id,
        );
        console.log("🚀 ~ .mutation ~ conversation:", conversation);
        if (conversation?.chatHistory) {
          conversation.chatHistory = [
            ...conversation?.chatHistory,
            ...newHistory,
          ];
        }
        console.log("🚀 ~ conversation:", conversation?.chatHistory);
      }
      // messages = [
      //   ...messages,
      //   { id: uniqueId("prompt"), role: "user", content: input.prompt },
      //   { id: chatCompletion.id, role: "assistant", content: message ?? "" },
      // ];

      return {
        content: chatCompletion.choices[0]?.message.content,
        id: conversationId,
      };
    }),

  getChatHistory: publicProcedure
    .input(z.object({ id: z.string().optional() }).optional())
    .query(({ input }) => {
      if (input?.id) {
        return getChatHistoryById(input.id);
      }
      return;
    }),
});
