import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { checkSubscription } from "@/lib/subscription";
import SubscriptionButton from "@/components/SubscriptionButton";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import LandingHero from "@/components/LandingHero";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  const isPro = await checkSubscription();
  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-green-200 via-green-200 to-blue-400">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <LandingHero />
          </div>
          <UserButton afterSignOutUrl="/" />



          <div className="flex py-8">
            {isAuth && firstChat && (
              <>
                <Link href={`/chat/${firstChat.id}`}>
                  <Button variant="outline">
                    Ir a mis conversaciones <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <div className="ml-3">
                  <SubscriptionButton isPro={isPro} />
                </div>
              </>
            )}
          </div>



          <p className="max-w-xl mt-1 text-lg text-slate-800 pb-4">
            Únete a millones de estudiantes, investigadores y profesionales para
            responder instantáneamente preguntas y comprender mejor la
            investigación con la ayuda de la inteligencia artificial.
          </p>

          <div className="w-full mt-4">
            {isAuth ? (
              <FileUpload />
            ) : (
              <Link href="/sign-in">
                <Button>
                  Crea tu cuenta o inicia sesión ahora.
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
