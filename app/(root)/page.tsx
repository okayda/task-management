"use client";

import { useState } from "react";
import Header from "@/components/Header/Header";
import { UserButton } from "@clerk/nextjs";

export default function page() {
  // false => Light theme
  // true => Dark theme
  const [theme, setTheme] = useState(false);
  const currentTheme = !theme ? "light" : "dark";

  const changeTheme = function (): void {
    // false = true , true = false
    setTheme((prev) => !prev);
  };

  return (
    <div className={`main-container ${currentTheme}`}>
      <Header theme={theme} />
      <h1>Protected & Landing Page</h1>
      <button onClick={changeTheme}>{currentTheme}</button>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
