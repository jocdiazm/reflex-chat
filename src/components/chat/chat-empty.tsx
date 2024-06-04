import { ExternalLink } from "@/components/ui/external-link";

export function EmptyScreen() {
  return (
    <div className="mx-auto mt-10 h-full max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-center text-lg font-semibold">
          Hello from Reflex Chat!
        </h1>
        <p className="leading-normal text-muted-foreground">
          This is a chatbot application made for {""}
          <ExternalLink href="https://reflexai.com">ReflexAI</ExternalLink>,
          using <ExternalLink href="https://nextjs.org">Next.js</ExternalLink>{" "}
          app directory,{" "}
          <ExternalLink href="https://trpc.io/">TRPC</ExternalLink>
        </p>
        <p className="leading-normal text-muted-foreground">
          It uses{" "}
          <ExternalLink href="https://openai.com/">OpenAI API</ExternalLink> to
          simulate a conversation with a support agent called ReflexChat. You
          can ask questions about the company, the products or the services they
          offer and in general, get brief answers to most questions.
        </p>
      </div>
    </div>
  );
}
