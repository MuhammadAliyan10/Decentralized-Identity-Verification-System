import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();
  console.log(user);

  if (user) redirect("/");
  return <>{children}</>;
}
