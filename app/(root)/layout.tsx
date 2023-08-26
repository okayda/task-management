import "./global.scss";

import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  weight: ["500", "700"],
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskM",
  description:
    "TaskM is the process of organizing and tracking your tasks in order to achieve your goals. It can help you stay on track, avoid procrastination, and get more done.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={jakarta.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
