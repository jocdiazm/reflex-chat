# ChatBot APP - Reflex Chat

This is a Next.js application meant to showcase a modern chatbot.
<img width="1285" alt="chat-01" src="https://github.com/jocdiazm/reflex-chat/assets/13368066/0c7c1b17-f182-4f48-9ba7-59995347485e">
<img width="1285" alt="chat-02" src="https://github.com/jocdiazm/reflex-chat/assets/13368066/ca6394a0-ed0f-4d13-8303-6f18225a041b">


## How's built?

Pretty much using following:

- [Next.js](https://nextjs.org)
- [tRPC](https://trpc.io)
- [Drizzle](https://orm.drizzle.team)
- [Libsql](https://turso.tech/libsql)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/UI](https://ui.shadcn.com/)
- [OpenAI](https://github.com/openai/openai-node)
  
## Some caveats
> [!IMPORTANT]  
> You'll need an OpenAPI key to run locally or deploy this app. 

## How to run locally? 

Clone this repository, create a new `.env` file  by following `.env.example`. Install the dependencies, create the database and start the app at `http://localhost:3000`. 

```bash
git clone git@github.com:jocdiazm/reflex-chat.git
cd reflex-chat
npm install
cp .env.example .env
#Check the .env file
npm run db:push
npm run dev
#In another terminal you can check the db using Drizzle Studio
npm run db:studio
```


## How to deploy 

You can follow the deployment's guide for some of the providers [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
