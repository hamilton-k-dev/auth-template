"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";
import { LoginSchema } from "@/schemas";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardWrapper } from "@/components/auth/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [twoFactor, setTwoFactor] = useState<boolean | undefined>(false);
  const [passwordInputType, setPasswordInputType] = useState<
    "password" | "text"
  >("password");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      token: "",
    },
  });
  const headerLabel = twoFactor
    ? "An email has been send tou you with a verification token"
    : "Login in your account";
  const buttonLabel = twoFactor ? "Continue" : "Login";
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        setError(data.error);
        setTwoFactor(data.twoFactor);
      });
    });
    console.log(values);
  };
  const Icon = passwordInputType === "password" ? Eye : EyeOff;
  return (
    <CardWrapper
      headerLabel={headerLabel}
      backButtonLabel="Don't have an account ?"
      backButtonHref="/auth/register"
      showSocial={!twoFactor}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <div className="space-y-4">
            {!twoFactor ? (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="thecodingh@example.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>
                        <div className="flex justify-between items-center">
                          <div>Password</div>
                          <Link
                            href={"/auth/reset-password"}
                            className=" text-primary text-sm"
                          >
                            forgot password ?
                          </Link>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Your very secured password "
                            type={passwordInputType}
                          />

                          <div
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            onClick={() => {
                              passwordInputType === "password"
                                ? setPasswordInputType("text")
                                : setPasswordInputType("password");
                            }}
                          >
                            <Icon
                              className="text-muted-foreground cursor-pointer text-xs"
                              size={18}
                            />
                          </div>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Verification token</FormLabel>
                    <FormControl>
                      <InputOTP
                        {...field}
                        maxLength={6}
                        render={({ slots }) => (
                          <>
                            <InputOTPGroup className="flex w-full justify-between items-center">
                              {slots.map((slot, index) => (
                                <React.Fragment key={index}>
                                  <InputOTPSlot
                                    className="rounded-md border w-16"
                                    {...slot}
                                  />
                                  {index !== slots.length - 1 && (
                                    <InputOTPSeparator />
                                  )}
                                </React.Fragment>
                              ))}{" "}
                            </InputOTPGroup>
                          </>
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" loading={isPending}>
            {buttonLabel}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
