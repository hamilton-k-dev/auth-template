import { auth } from "@/auth";
import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

async function App() {
  const session = await auth();
  session!.user.image = undefined;
  const t = await getTranslations("Index");

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <div className="">
        <Link href={"/user/settings"} className="py-4 flex flex-row">
          {t("settings")}
          <ChevronRight />
        </Link>
      </div>
      <div className="">
        <Button asChild>
          <LogoutButton>{t("logout")}</LogoutButton>
        </Button>
      </div>
    </div>
  );
}

export default App;
