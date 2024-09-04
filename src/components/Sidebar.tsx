"use client";
import { cn } from "@/lib/utils";
import {
  BadgeHelp,
  BookUser,
  CircleUser,
  CircleUserRound,
  CopyPlus,
  Home,
  Lock,
} from "lucide-react";
import Link from "next/link";
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
          <Link href="/addBlock">
            <li
              className={cn(
                "group flex justify-start py-4 cursor-pointer hover:bg-muted-foreground/10 rounded-lg px-4",
                pathName === "/addBlock" &&
                  "text-primary bg-muted-foreground/10"
              )}
            >
              <CopyPlus
                size={16}
                className={cn(
                  "text-muted-foreground group-hover:text-primary",
                  pathName === "/addBlock" && "text-primary"
                )}
              />
              <span
                className={cn(
                  "ml-2 text-sm font-medium text-muted-foreground group-hover:text-primary",
                  pathName === "/addBlock" && "text-primary"
                )}
              >
                Add Block
              </span>
            </li>
          </Link>

          <li
            className={cn(
              "group flex justify-start py-4 cursor-pointer hover:bg-muted-foreground/10 rounded-lg px-4",
              pathName === "/" && "text-primary bg-muted-foreground/10"
            )}
          >
            <CopyPlus
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
          </li>
        </ul>
        <div className="fixed bottom-2">
          <div className="relative my-6">
            <hr />
            <h4 className="text-muted-foreground text-sm mb-3 absolute -top-[17px] p-2 bg-card left-[30px]">
              User
            </h4>
          </div>
          <ul>
            <li
              className={cn(
                "group flex justify-start py-4 cursor-pointer hover:bg-muted-foreground/10 rounded-lg px-4",
                pathName === "/account" && "text-primary bg-muted-foreground/10"
              )}
            >
              <CircleUserRound
                size={16}
                className={cn(
                  "text-muted-foreground group-hover:text-primary",
                  pathName === "/account" && "text-primary"
                )}
              />
              <span
                className={cn(
                  "ml-2 text-sm font-medium text-muted-foreground group-hover:text-primary",
                  pathName === "/account" && "text-primary"
                )}
              >
                Account
              </span>
            </li>
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
    </div>
  );
};

export default Sidebar;
