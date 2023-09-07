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

  // only for mobile layout
  const [showNav, setShowNav] = useState(false);

  const openNav = function () {
    setShowNav(true);
  };

  const closeNav = function () {
    setShowNav(false);
  };

  return (
    <>
      <Header theme={theme} setShowNav={openNav} />
      <div className={`main-container ${currentTheme}`}>
        <SideNav showNav={showNav} setShowNav={closeNav} />

        {/* <button onClick={changeTheme}>{currentTheme}</button>
        <UserButton afterSignOutUrl="/" /> */}

        <Drag />
      </div>
    </>
  );
}
