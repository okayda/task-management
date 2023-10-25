import "./global.scss";

import type { Metadata } from "next";
// import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ReduxProvider } from "@/redux/provider/Provider";

import Header from "@/components/Header/Header";

const jakarta = Plus_Jakarta_Sans({
  weight: ["500", "700"],
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Management",
  description:
    "Management is the process of organizing and tracking your tasks in order to achieve your goals. It can help you stay on track, avoid procrastination, and get more done.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ClerkProvider>
    // </ClerkProvider>
    <html lang="en">
      <body className={jakarta.className}>
        <ReduxProvider>
          <Header />
          <main>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
