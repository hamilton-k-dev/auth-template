"use client";
import { useSession } from "next-auth/react";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";

function App() {
  const session = useSession();
  const t = useTranslations("settings");
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="">{JSON.stringify(session)}</div>
      <form>
        <button type="submit">{t("logout")}</button>
      </form>
    </div>
  );
}

export default App;
