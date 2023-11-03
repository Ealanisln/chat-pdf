import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import React from "react";
import { Loader } from "./ui/loader";

type Props = {
  isLoading: boolean;
  messages: Message[];
};

const MessageList = ({ messages, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
      <Loader />
    </div>
    );
  }
  if (!messages) return <></>;
  return (
    <div className="flex flex-col gap-2 px-4 py-2">
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            className={cn("flex", {
              "justify-end pl-10": message.role === "user",
              "justify-start pr-10": message.role === "assistant",
            })}
          >
            <div
              className={cn(
                "rounded-lg px-3 text-sm py-2 shadow-md ring-1 ring-gray-900/10",
                {
                  "bg-purple-600 text-white": message.role === "user",
                }
              )}
            >
              <p>{message.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
