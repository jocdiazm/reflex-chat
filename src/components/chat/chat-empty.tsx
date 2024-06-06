import { ExternalLink } from "@/components/ui/external-link";

export function EmptyScreen() {
  return (
    <div className="mx-auto mt-10 h-full max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-center text-lg font-semibold">
          Hello from Reflex Chat!
        </h1>
        <p className="leading-normal text-muted-foreground">
          This is a chatbot application named Reflex Chat made using{" "}
          <ExternalLink href="https://nextjs.org">Next.js</ExternalLink> app
          directory and{" "}
          <ExternalLink href="https://trpc.io/">TRPC</ExternalLink>.
        </p>
        <p className="leading-normal text-muted-foreground">
          It uses{" "}
          <ExternalLink href="https://openai.com/">OpenAI API</ExternalLink> to
          simulate a conversation with a support service for a company. You can
          ask general questions about the history of the company, the products
          or the services they offer and, in general, get answers to most of
          your questions.
        </p>
      </div>
    </div>
  );
}
