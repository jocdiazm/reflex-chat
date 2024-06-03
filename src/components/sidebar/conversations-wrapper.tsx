import { ConversationsList } from "@/components/sidebar/conversations";
import { api } from "@/trpc/server";

export async function ConversationsWrapper() {
  const conversations = await api.ai.getChatList();
  console.log("🚀 ~ ConversationsWrapper ~ conversations:", conversations);
  return <ConversationsList conversations={conversations} />;
}
