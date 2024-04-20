import Link from "next/link";
import LocaleSwitcher from "./locale-switcher";
import { ModeToggleButton } from "./mode-toggle-button";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { LoginButton } from "./auth/login-button";

function Header() {
  const t = useTranslations("Global");
  return (
    <div className="fixed top-0 w-full border-b flex flex-row justify-between py-3 px-4 lg:px-32 items-center bg-primary-foreground z-50">
      <div className="hidden lg:flex gap-4 items-center">
        <Button variant={"default"} asChild>
          <Link href={"/auth/register"}>{t("register")}</Link>
        </Button>
        <LoginButton>
          <Button variant={"outline"}>{t("login")}</Button>
        </LoginButton>
      </div>
      <div className="flex flex-row gap-2 justify-between lg:justify-normal items-center w-full lg:w-fit">
        <ModeToggleButton />
        <LocaleSwitcher />
      </div>
    </div>
  );
}

export default Header;
