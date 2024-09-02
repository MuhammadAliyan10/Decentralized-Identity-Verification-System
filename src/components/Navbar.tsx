"use client";
import React from "react";
import { Input } from "./ui/input";
import ModeToggle from "./ModeToggle";
import { Button } from "./ui/button";
import UserAccount from "./UserAccount";
import Notification from "./Notification";
import { Search } from "lucide-react";
interface NavbarProps {
  className: string;
}
const Navbar = ({ className }: NavbarProps) => {
  return (
    <div>
      <nav className="sticky top-0 z-10 w-full flex justify-between items-center p-5">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="text" placeholder="Search" />
          <Button type="submit" size={"default"}>
            <Search />
          </Button>
        </div>
        <div className="flex justify-center items-center gap-x-4">
          <UserAccount />
          <Notification />
          <ModeToggle />
        </div>
      </nav>
      <hr className="w-full" />
    </div>
  );
};

export default Navbar;
