"use client";
import { auth } from "@/auth";
import { NextIntlClientProvider, useMessages } from "next-intl";

function LayoutPage({
  children,
  params: { locale },
}: {
  children: any;
  params: { locale: string };
}) {
  const messages = useMessages();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div>{children} </div>
    </NextIntlClientProvider>
  );
}

export default LayoutPage;
