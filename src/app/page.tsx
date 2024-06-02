import { api } from "@/trpc/server";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessageList } from "@/components/chat/chat-list";

export default async function Home() {
  const rawMessages = await api.ai.getMessages();
  const messages = rawMessages.filter(
    (message) => message.role === "assistant" || message.role === "user",
  );
  return (
    <main className="min-w-screen max-w-screen max-h-dvh min-h-dvh">
      <ChatMessageList messages={messages} />
      <ChatInput />
    </main>
  );
}
