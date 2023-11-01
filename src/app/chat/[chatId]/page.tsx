import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSideBar";
import MobileChatBar from "@/components/MobileChatBar";
import PDFViewer from "@/components/PDFViewer";
import { SheetDemo } from "@/components/Sheet";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats) {
    return redirect("/");
  }
  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }

  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
  const isPro = await checkSubscription();

  return (
    <div className="h-full">
    <div className="flex max-h-screen overflow-auto">
      <div className="flex w-full max-h-screen overflow-scroll">
        {/* chat sidebar */}
        <div className="hidden md:block flex-[1] max-w-xs">
          <ChatSideBar chats={_chats} chatId={parseInt(chatId)} isPro={isPro} />
        </div>
        {/* chat sidebar mobile component */}        
        {/* <div className="md:hidden flex-[1] max-w-xs">
          <SheetDemo chats={_chats} chatId={parseInt(chatId)} isPro={isPro}/>
        </div> */}
        {/* pdf viewer */}
        <div className="hidden md:block max-h-screen p-4 oveflow-scroll flex-[5]">
          <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
        </div>
        {/* chat component */}
        <div className="flex-[3] border-l-4 border-l-slate-200">
          <ChatComponent chatId={parseInt(chatId)} />
        </div>
      </div>
      </div>
    </div>
  );
};

export default ChatPage;
