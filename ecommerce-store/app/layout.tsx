import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

import { ModalProdiver } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Store",
  description: "Store",
};

export const revalidate = 0;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
        <ModalProdiver />
        <ToastProvider />
      </body>
    </html>
  );
}
