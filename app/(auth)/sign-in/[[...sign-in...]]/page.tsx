"use client";

import { neobrutalism } from "@clerk/themes";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <SignIn
        appearance={{
          baseTheme: neobrutalism,
        }}
      />
    </>
  );
}
