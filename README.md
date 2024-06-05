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
  
## DB schema relations 
# Database Schema

We got two tables. Chats and Messages. Which you can inspect using `npm run db:studio`

### Chats Table
Holds the information about the "Conversation" or (chat) history. 

| Column     | Type   | Constraints                         | Default Value          | Description               |
|------------|--------|-------------------------------------|------------------------|---------------------------|
| id         | TEXT   | NOT NULL, PRIMARY KEY               | randomUUID()           | Unique identifier for chat|
| description| TEXT   | NOT NULL                            |                        | Description of the chat   |
| author     | TEXT   | NOT NULL                            | "reflexchat-user"      | Author of the chat        |
| createdAt  | TEXT   | NOT NULL                            | CURRENT_TIMESTAMP      | Creation timestamp        |
| updatedAt  | TEXT   | NOT NULL                            | CURRENT_TIMESTAMP      | Last update timestamp     |

### Messages Table
Holds the information about each individual Message. It's related to Chats by the ID. Some fields follow the OpenAI convention regarding e.g. `Role`

| Column     | Type   | Constraints                         | Default Value          | Description               |
|------------|--------|-------------------------------------|------------------------|---------------------------|
| id         | TEXT   | NOT NULL, PRIMARY KEY               | randomUUID()           | Unique identifier for message|
| chatId     | TEXT   | NOT NULL, REFERENCES chats(id)      |                        | Foreign key to Chats table|
| role       | TEXT   | NOT NULL, ENUM ["user", "assistant"]|                        | Role of the message sender|
| content    | TEXT   | NOT NULL                            |                        | Content of the message    |
| createdAt  | TEXT   | NOT NULL                            | CURRENT_TIMESTAMP      | Creation timestamp        |

## Relationships

- **Messages.chatId** references **Chats.id**
  - **On Delete**: Cascade


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
