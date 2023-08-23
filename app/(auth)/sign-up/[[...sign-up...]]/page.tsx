"use client";

import ParticleBg from "@/components/Background/ParticleBg";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <ParticleBg dotColor="#103fef" />
      <SignUp />;
    </>
  );
}
