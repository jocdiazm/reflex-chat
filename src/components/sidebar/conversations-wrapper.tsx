import { ConversationsList } from "@/components/sidebar/conversations";
import { api } from "@/trpc/server";

export async function ConversationsWrapper() {
  const conversations = await api.ai.getChatList();
  return <ConversationsList conversations={conversations} />;
}
