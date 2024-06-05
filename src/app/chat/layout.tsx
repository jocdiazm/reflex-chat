import Link from "next/link";
import { BotMessageSquare, Menu, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ConversationsWrapper } from "@/components/sidebar/conversations-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { TooltipWrapper as Tooltip } from "@/components/ui/tooltip-wrapper";
import { ExternalLink } from "@/components/ui/external-link";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/chat/"
              className="flex items-center gap-2 font-semibold"
            >
              <BotMessageSquare className="h-6 w-6" />
              <span className="">Reflex Chat</span>
            </Link>

            <Tooltip tooltip="New chat" side="right" sideOffset={8}>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="ml-auto h-8 w-8"
              >
                <Link href="/chat">
                  <SquarePen className="h-4 w-4" />
                  <span className="sr-only">Toggle notifications</span>
                </Link>
              </Button>
            </Tooltip>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <ConversationsWrapper />
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="icon"
                size="icon"
                className="h-6 w-6 shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex w-full max-w-[350px] flex-col px-2 "
            >
              <div className="flex h-full max-h-screen flex-col gap-2 p-1">
                <div className="flex h-14 items-center  border-b px-4 lg:h-[60px] lg:px-6">
                  <Link
                    href="/chat/"
                    className="flex items-center gap-2 font-semibold"
                  >
                    <BotMessageSquare className="h-6 w-6" />
                    <span className="">Reflex Chat</span>
                  </Link>
                  <SheetClose asChild>
                    <Tooltip tooltip="New Chat" side="bottom" sideOffset={8}>
                      <Button
                        asChild
                        variant="outline"
                        size="icon"
                        className="ml-auto h-8 w-8"
                      >
                        <Link href="/chat">
                          <SquarePen className="h-4 w-4" />
                          <span className="sr-only">New chat</span>
                        </Link>
                      </Button>
                    </Tooltip>
                  </SheetClose>
                </div>
                <div className="flex flex-1 flex-col">
                  <ConversationsWrapper />
                </div>
              </div>
            </SheetContent>
          </Sheet>
          {/* reserved for breadcrumbs */}
          <div className="w-full flex-1"></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar className="border border-primary/50">
                  <AvatarImage
                    src="https://github.com/jocdiazm.png"
                    alt="@jocdiazm"
                  />
                  <AvatarFallback>JC</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user details</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Profiles</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-1">
                <GithubIcon />
                <ExternalLink href="https://www.linkedin.com/in/jocdiazm/">
                  Github
                </ExternalLink>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-1">
                <LinkedinIcon />
                <ExternalLink href="https://www.linkedin.com/in/jocdiazm/">
                  LinkedIn
                </ExternalLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/">
                  <span className="">Logout</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="relative flex max-h-[calc(100vh-60px)] flex-1 gap-4 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
