import { LoginButton } from "@/components/auth/login-button";
import LocaleSwitcher from "@/components/locale-switcher";
import { ModeToggleButton } from "@/components/mode-toggle-button";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Home() {
  const t = useTranslations("Index");
  return (
    <main className="w-full p-3 h-screen flex flex-col space-y-4 justify-center items-center">
      <div className="flex flex-row gap-6 items-center">
        <LocaleSwitcher />
        <ModeToggleButton />
      </div>
      <div className="flex flex-row text-center  gap-2">
        <h1 className="text-3xl lg:text-5xl font-semibold drop-shadow-md text-balance">
          {t("title")}
        </h1>
        <div className="hidden lg:flex text-5xl lg:animate-spin">⚙️</div>
      </div>
      <div className="max-w-6xl text-justify lg:text-center text-lg">
        {t("description")}
      </div>
      <div className="flex flex-row gap-4 lg:hidden">
        <LoginButton>
          <Button variant={"outline"}>{t("login")}</Button>
        </LoginButton>
        <Button variant={"default"} asChild>
          <Link href={"/auth/register"}>{t("register")}</Link>
        </Button>
      </div>
    </main>
  );
}
