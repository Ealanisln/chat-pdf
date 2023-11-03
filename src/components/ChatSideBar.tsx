"use client";

import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import SubscriptionButton from "./SubscriptionButton";
import FreeCounter from "./FreeCounter";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
  isPro: boolean;
  apiLimitCount: number;
};

const ChatSideBar = ({ chats, chatId, isPro, apiLimitCount = 0 }: Props) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="w-full h-screen p-4 text-gray-200 bg-gray-900">
      <Link href="/">
        <Button className="w-full border-dashed border-white border">
          <PlusCircle className="mr-2 w-4 h-4" />
          Nuevo chat
        </Button>
      </Link>

      <div className="flex max-h-screen pb-20 flex-col gap-2 mt-4">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <div
              className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                "bg-purple-600 text-white": chat.id === chatId,
                "hover:text-white": chat.id !== chatId,
              })}
            >
              <MessageCircle className="mr-2" />
              <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                {chat.pdfName}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="fixed bottom-4 left-4">
      <div className="pt-4">
          <SubscriptionButton isPro={isPro} />
        </div>
        <div className="flex items-center gap-2 text-md text-slate-500 flex-wrap px-4 py-4">
          
          <Link href="/">Inicio</Link>
          <Link href="/">Recursos</Link>
        </div>
        <div className="py-4">
          <SubscriptionButton isPro={isPro} />
        </div>
      </div>
      
      {/* Conditionally render the FreeCounter based on the isPro flag */}
      {!isPro && (
        <FreeCounter apiLimitCount={apiLimitCount} />
      )}
    </div>
  );
};

export default ChatSideBar;
