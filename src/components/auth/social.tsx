"use client ";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Cookies from "js-cookie";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { useState } from "react";

export const Social = () => {
  const [state, setState] = useState<{
    loading: boolean;
    name: "google" | "github";
  }>({ loading: false, name: "github" });
  const callbackUrl = Cookies.get("callback-url");
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
    setState({ loading: true, name: provider });
  };
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex items-center w-full gap-x-2">
        <Button
          className="w-full"
          variant="outline"
          onClick={() => onClick("github")}
          loading={state.loading && state.name === "github"}
        >
          <div className="inline-flex items-center justify-center gap-1">
            <FaGithub size={20} />
            <span className="">GitHub</span>
          </div>
        </Button>
        <Button
          className="w-full"
          variant="outline"
          onClick={() => onClick("google")}
          loading={state.loading && state.name === "google"}
        >
          <div className="inline-flex items-center justify-center gap-1">
            <FcGoogle size={20} />
            <span className="">Google</span>
          </div>
        </Button>
      </div>
      <div className="flex items-center">
        <div className="flex-1 border-t"></div>
        <span className="px-3 text-muted-foreground text-xs">
          OR CONTINUE WITH
        </span>
        <div className="flex-1 border-t "></div>
      </div>
    </div>
  );
};
