"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { supportedLanguage } from "@/locale";

export default function LocaleSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const localeActive = useLocale();
  const onSelectChange = (selectedValue: any) => {
    startTransition(() => {
      router.replace(`/${selectedValue}`);
    });
  };
  return (
    <Select
      onValueChange={onSelectChange}
      defaultValue={localeActive}
      disabled={isPending}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {supportedLanguage.map((language) => (
          <SelectItem value={language.tag} key={language.tag}>
            {language.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
