import { LoginButton } from "@/components/auth/login-button";
import LocaleSwitcher from "@/components/locale-switcher";
import { ModeToggleButton } from "@/components/mode-toggle-button";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Index");
  return (
    <main className="w-full p-3 h-screen flex flex-col space-y-4 justify-center items-center">
      <div className="">
        <LocaleSwitcher />
      </div>
      <div className="flex flex-row text-center  gap-2 text-5xl">
        <h1 className="font-semibold   drop-shadow-md">{t("title")}</h1>
        <div className="lg:animate-spin">⚙️</div>
      </div>
      <div className="fixed top-1 right-4">
        <ModeToggleButton />
      </div>

      <div className="max-w-6xl text-justify lg:text-center text-lg">
        {t("description")}
      </div>
      <div className="">
        <LoginButton>
          <Button size={"lg"}>{t("login")}</Button>
        </LoginButton>
      </div>
    </main>
  );
}
