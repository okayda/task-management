"use client";

import { useState } from "react";
import Header from "@/components/Header/Header";
import { UserButton } from "@clerk/nextjs";
import Drag from "@/components/Drag/Drag";

import SideNav from "@/components/SideNav/SideNav";

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
    <>
      <Header theme={theme} />
      <div className={`main-container ${currentTheme}`}>
        {/* overlay is only for mobile layout */}
        {/* <div className="overlay">&nbsp;</div> */}
        <SideNav />

        {/* <h1>Authorized user page</h1>

<button onClick={changeTheme}>{currentTheme}</button>

<UserButton afterSignOutUrl="/" /> */}

        <Drag />
      </div>
    </>
  );
}
