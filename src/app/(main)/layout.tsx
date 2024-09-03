import { validateRequest } from "@/auth";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await validateRequest();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="grid min-h-screen grid-cols-12 gap-0">
      <div className="col-span-2 ">
        <Sidebar className="sticky w-full top-0 hidden h-screen border-r border-muted-foreground/20 sm:block " />
      </div>
      <div className="flex-1 col-span-10">
        <Navbar className="" />
        {children}
      </div>
      <Sidebar className="sticky bottom-0 flex w-full justify-center gap-5 border-t bg-card p-3 sm:hidden" />
    </div>
  );
}
