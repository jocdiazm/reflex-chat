import { z } from "zod";
import { eq, desc } from "drizzle-orm";

import OpenAI from "openai";
import { env } from "@/env";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { uniqueId } from "lodash-es";
import { type ChatCompletionCreateParams } from "openai/resources/index.mjs";

import { db } from "@/server/db";
import { chats as chatsTable } from "@/server/db/schema/chats";
import { messages as messagesTable } from "@/server/db/schema/messages";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

const systemPrompts = [
  {
    id: uniqueId("prompt"),
    role: "system",
    content:
      "You are a helpful assistant named ReflexAI. You can answer questions and provide information on a wide range of topics. You are not an expert in any field and your answers should be based on general knowledge and common sense. You are not allowed to use the word 'OpenAI' in your answers.",
  },
];

export type Messages = Awaited<ReturnType<typeof aiRouter.getChatHistory>>;
export type Message = Awaited<ReturnType<typeof aiRouter.getMessageById>>;
export type Conversations = Awaited<ReturnType<typeof aiRouter.getChatList>>;

export const aiRouter = createTRPCRouter({
  completion: publicProcedure
    .input(z.object({ prompt: z.string().min(1), id: z.string().optional() }))
    .mutation(async ({ input }) => {
      //  this is supposed to be an upsert of the new history or conversation
      const conversationId = input.id ?? uniqueId("conversation");
      if (!input?.id) {
        await db.insert(chatsTable).values({
          id: conversationId,
          description: `${input.prompt}`.slice(0, 25),
        });
      }
      const userHistory = await db
        .select()
        .from(messagesTable)
        .where(eq(messagesTable.chatId, conversationId))
        .orderBy(desc(messagesTable.createdAt))
        .all();

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

      await db.insert(messagesTable).values([
        {
          id: uniqueId("prompt"),
          role: "user",
          content: input.prompt,
          chatId: conversationId,
        },
        {
          id: chatCompletion.id,
          role: "assistant",
          content: message ?? "",
          chatId: conversationId,
        },
      ]);

      return {
        content: chatCompletion.choices[0]?.message.content,
        id: conversationId,
      };
    }),

  getMessageById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await db
        .select({
          id: messagesTable.id,
          role: messagesTable.role,
          content: messagesTable.content,
          createdAt: messagesTable.createdAt,
        })
        .from(messagesTable)
        .where(eq(messagesTable.id, input.id))
        .get();
    }),

  getChatList: publicProcedure.query(async () => {
    return await db
      .select({
        id: chatsTable.id,
        description: chatsTable.description,
        createdAt: chatsTable.createdAt,
      })
      .from(chatsTable)
      .all();
  }),

  getChatHistory: publicProcedure
    .input(z.object({ id: z.string().optional() }).optional())
    .query(async ({ input }) => {
      if (input?.id) {
        return await db
          .select({
            id: messagesTable.id,
            role: messagesTable.role,
            content: messagesTable.content,
            createdAt: messagesTable.createdAt,
          })
          .from(messagesTable)
          .where(eq(messagesTable.chatId, input.id))
          .orderBy(desc(messagesTable.createdAt))
          .all();
      }
      return [];
    }),
});
