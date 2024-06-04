import { EmptyScreen } from "@/components/chat/chat-empty";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="min-w-screen max-w-screen grid max-h-dvh min-h-dvh place-content-center">
      <div className="flex flex-col items-center gap-4">
        <EmptyScreen />
        <Button className="w-fit" size="lg" asChild>
          <Link href="/chat" className="flex items-center gap-2">
            <Bot className="h-4 w-4" /> Let&apos;s chat!
          </Link>
        </Button>
      </div>
    </main>
  );
}
