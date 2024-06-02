import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { HydrationOverlay } from "@builder.io/react-hydration-overlay";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata = {
  title: "Reflex Chat",
  description: "Simple and powerful chatbot",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="max-h-dvh min-h-dvh">
        <HydrationOverlay>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </HydrationOverlay>
      </body>
    </html>
  );
}
