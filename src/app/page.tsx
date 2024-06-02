import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="min-w-screen max-w-screen grid max-h-dvh min-h-dvh place-content-center">
      <Button className="w-fit">
        <Link href="/chat">Go to chat</Link>
      </Button>
    </main>
  );
}
