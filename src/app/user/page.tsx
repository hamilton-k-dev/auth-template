import { auth, signOut } from "@/auth";
import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

async function App() {
  const session = await auth();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
      <div className="">
        <Link href={"/user/settings"} className="py-4 flex flex-row">
          Settings
          <ChevronRight />
        </Link>
      </div>
      <div className="">
        <Button asChild>
          <LogoutButton>Se deconnecter</LogoutButton>
        </Button>
      </div>
    </div>
  );
}

export default App;
