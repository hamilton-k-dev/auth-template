"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";
import { ResetPasswordSchema } from "@/schemas";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { register } from "@/actions/register";
import { Loader } from "lucide-react";
import { resetPassword } from "@/actions/reset-password";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";

export const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [mailSend, setMailSend] = useState<boolean>(false);
  const [validToken, setValidToken] = useState<boolean>(false);
  const [passwordReset, setPasswordReset] = useState<boolean>(false);
  const headerLabel = passwordReset
    ? "Your password has been reset"
    : "Reset your password";
  const backButtonLabel = validToken ? "" : "Remember your password ?";
  const backButtonHref = validToken ? "" : "/auth/login";
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      token: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      resetPassword(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (data.success && data.validEmail) {
          setMailSend(true);
        }
        if (data.success && data.validEmail && data.validToken) {
          setValidToken(true);
        }
        if (
          data.success &&
          data.validEmail &&
          data.validToken &&
          data.passwordReset
        ) {
          setPasswordReset(true);
        }
      });
    });
  };
  return (
    <CardWrapper
      headerLabel={headerLabel}
      backButtonLabel={backButtonLabel}
      backButtonHref={backButtonHref}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <div className="space-y-4">
            {!mailSend && (
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
            )}
            {mailSend && !validToken && (
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
            {mailSend && validToken && !passwordReset && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Your new password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="enter your new password"
                        type="password"
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
          {mailSend && validToken && passwordReset ? (
            <Button type="submit" className="w-full" loading={isPending}>
              <Link href={"/auth/login"}>Login</Link>
            </Button>
          ) : (
            <Button type="submit" className="w-full" loading={isPending}>
              {!validToken ? <>Continue</> : <>Reset password</>}
            </Button>
          )}
        </form>
      </Form>
    </CardWrapper>
  );
};
