"use client";

import ParticleBg from "@/components/Background/ParticleBg";
import { neobrutalism } from "@clerk/themes";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <ParticleBg dotColor="#de1b1b" />
      <SignIn
        appearance={{
          baseTheme: neobrutalism,
        }}
      />
    </>
  );
}
