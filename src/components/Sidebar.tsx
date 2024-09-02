"use client";
import { cn } from "@/lib/utils";
import { BadgeHelp, BookUser, CopyPlus, Home, Link, Lock } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
interface SidebarProps {
  className: string;
}
const Sidebar = ({ className }: SidebarProps) => {
  const pathName = usePathname();
  console.log(pathName);

  return (
    <div className={className}>
      <div className="text-2xl text-muted-foreground font-600 text-center uppercase py-[22px]">
        Decentralize
      </div>
      <hr />
      <div className="px-4 py-6">
        <ul className="space-y-2">
          <li
            className={cn(
              "group flex justify-start py-4 cursor-pointer hover:bg-muted-foreground/10 rounded-lg px-4",
              pathName === "/" && "text-primary bg-muted-foreground/10"
            )}
          >
            <Home
              size={16}
              className={cn(
                "text-muted-foreground group-hover:text-primary",
                pathName === "/" && "text-primary"
              )}
            />
            <span
              className={cn(
                "ml-2 text-sm font-medium text-muted-foreground group-hover:text-primary",
                pathName === "/" && "text-primary"
              )}
            >
              Home
            </span>
          </li>
          <li
            className={cn(
              "group flex justify-start py-4 cursor-pointer hover:bg-muted-foreground/10 rounded-lg px-4",
              pathName === "/details" && "text-primary bg-muted-foreground/10"
            )}
          >
            <BookUser
              size={16}
              className={cn(
                "text-muted-foreground group-hover:text-primary",
                pathName === "/details" && "text-primary"
              )}
            />
            <span
              className={cn(
                "ml-2 text-sm font-medium text-muted-foreground group-hover:text-primary",
                pathName === "/details" && "text-primary"
              )}
            >
              Details
            </span>
          </li>
          <li
            className={cn(
              "group flex justify-start py-4 cursor-pointer hover:bg-muted-foreground/10 rounded-lg px-4",
              pathName === "/chain" && "text-primary bg-muted-foreground/10"
            )}
          >
            <CopyPlus
              size={16}
              className={cn(
                "text-muted-foreground group-hover:text-primary",
                pathName === "/chain" && "text-primary"
              )}
            />
            <span
              className={cn(
                "ml-2 text-sm font-medium text-muted-foreground group-hover:text-primary",
                pathName === "/chain" && "text-primary"
              )}
            >
              Add Chain
            </span>
          </li>
          {/* <li
            className={cn(
              "group flex justify-start py-4 cursor-pointer hover:bg-muted-foreground/10 rounded-lg px-4",
              pathName === "/" && "text-primary bg-muted-foreground/10"
            )}
          >
            <Link
              size={16}
              className={cn(
                "text-muted-foreground group-hover:text-primary",
                pathName === "/" && "text-primary"
              )}
            />
            <span
              className={cn(
                "ml-2 text-sm font-medium text-muted-foreground group-hover:text-primary",
                pathName === "/" && "text-primary"
              )}
            >
              Chain
            </span>
          </li> */}
          <li
            className={cn(
              "group flex justify-start py-4 cursor-pointer hover:bg-muted-foreground/10 rounded-lg px-4",
              pathName === "/privacy" && "text-primary bg-muted-foreground/10"
            )}
          >
            <Lock
              size={16}
              className={cn(
                "text-muted-foreground group-hover:text-primary",
                pathName === "/privacy" && "text-primary"
              )}
            />
            <span
              className={cn(
                "ml-2 text-sm font-medium text-muted-foreground group-hover:text-primary",
                pathName === "/privacy" && "text-primary"
              )}
            >
              Privacy & Security
            </span>
          </li>
          <li
            className={cn(
              "group flex justify-start py-4 cursor-pointer hover:bg-muted-foreground/10 rounded-lg px-4",
              pathName === "/help" && "text-primary bg-muted-foreground/10"
            )}
          >
            <BadgeHelp
              size={16}
              className={cn(
                "text-muted-foreground group-hover:text-primary",
                pathName === "/help" && "text-primary"
              )}
            />
            <span
              className={cn(
                "ml-2 text-sm font-medium text-muted-foreground group-hover:text-primary",
                pathName === "/help" && "text-primary"
              )}
            >
              Help
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
