import "./globals.css";
import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "../components/Providers";
import { Toaster } from "react-hot-toast";
import { ModalProvider } from "@/components/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Charla PDF",
  description: "Charla PDF its a chatbot where you be able to interact with any pdf file."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <body className={inter.className}>
            <ModalProvider />
            {children}</body>
          <Toaster />
        </html>
      </Providers>
    </ClerkProvider>
  );
}
