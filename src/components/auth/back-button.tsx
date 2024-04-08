"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  href?: string;
  label?: string;
}

export const BackButton = ({ label, href }: BackButtonProps) => {
  if (!href || !label) return null;
  return (
    <Button variant={"link"} className="font-normal w-full" size={"sm"} asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
