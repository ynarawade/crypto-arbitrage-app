import React from "react";
import { ModeToggle } from "./ThemeToggler";

function Header() {
  return (
    <nav className="h-16  w-full flex items-center justify-center px-2 border-b border-b-border">
      <div className="w-full max-w-5xl flex items-center justify-between ">
        <h2 className="text-3xl font-extrabold tracking-widest ">GAINLY</h2>
      <ModeToggle />
      </div>
    </nav>
  );
}

export default Header;
