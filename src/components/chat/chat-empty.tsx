import { ExternalLink } from "@/components/ui/external-link";

export function EmptyScreen() {
  return (
    <div className="mx-auto mt-10 h-full max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">Hello from Reflex Chat!</h1>
        <p className="leading-normal text-muted-foreground">
          This is a submission application for a chatbot interview at {""}
          <ExternalLink href="https://nextjs.org">ReflexAI</ExternalLink>, using{" "}
          <ExternalLink href="https://sdk.vercel.ai">Next.js</ExternalLink> app
          directory,{" "}
          <ExternalLink href="https://vercel.com/storage/kv">TRPC</ExternalLink>
        </p>
        <p className="leading-normal text-muted-foreground">
          It uses{" "}
          <ExternalLink href="https://vercel.com/blog/ai-sdk-3-generative-ui">
            OpenAI API
          </ExternalLink>{" "}
          to simulate a conversation with a support agent from ReflexAI. You can
          ask questions about the company, the products or the services they
          offer.
        </p>
      </div>
    </div>
  );
}
