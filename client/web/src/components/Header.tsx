import React from "react";
import { Button } from "./ui/button";
import { Moon } from "lucide-react";

function Header() {
  return (
    <nav className="h-16  w-full bg-auto flex items-center justify-between px-2 border-b border-b-border">
      <h2 className="text-3xl font-extrabold tracking-widest ">GAINLY</h2>
      <Button>
        <Moon />
      </Button>
    </nav>
  );
}

export default Header;
