import { api } from "@/trpc/server";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  console.log("🚀 ~ Home ~ hello:", hello);

  return (
    <main className="min-w-screen max-w-screen max-h-dvh min-h-dvh">
      <Button>Hello</Button>
    </main>
  );
}
