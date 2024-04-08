import { auth, signOut } from "@/auth";
import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import React from "react";

async function App() {
  const session = await auth();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="">{JSON.stringify(session)}</div>
      <div className="">
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit">Se deconnerter</button>
        </form>
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
