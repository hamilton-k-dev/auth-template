import React from "react";
import { SessionProvider, signIn } from "next-auth/react";
import { auth } from "@/auth";

async function LayoutPage({ children }: { children: any }) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div>{children}</div>
    </SessionProvider>
  );
}

export default LayoutPage;
