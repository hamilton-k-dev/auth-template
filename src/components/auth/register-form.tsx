"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";

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
import { register } from "@/actions/register";
import { Loader } from "lucide-react";
import Link from "next/link";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [mailSend, setMailSend] = useState<boolean | undefined>(false);
  const [validToken, setValidToken] = useState<boolean | undefined>(false);
  const [registrationCompleted, setRegistrationCompleted] = useState<
    boolean | undefined
  >(false);
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
    },
  });
  const headerLabel = registrationCompleted
    ? "Account created"
    : "Create an account";
  const backButtonLabel = validToken ? "" : "Already have an account ?";
  const backButtonHref = validToken ? "" : "/auth/login";
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (data.success) {
          setMailSend(data.emailSend);
          setValidToken(data.validToken);
          setRegistrationCompleted(data.registrationCompleted);
        }
      });
    });
    console.log(values);
  };
  return (
    <CardWrapper
      headerLabel={headerLabel}
      backButtonLabel={backButtonLabel}
      backButtonHref={backButtonHref}
      showSocial={!mailSend}
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
            {mailSend && validToken && !registrationCompleted && (
              <>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="The"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Last name{" "}
                        <span className="text-xs text-primary">(optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="codingH"
                          type="text"
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
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Your very secured password "
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          {registrationCompleted ? (
            <div className="w-full">
              <Button type="button" className="w-full" asChild>
                <Link href={"/auth/login"} className="">
                  Login
                </Link>
              </Button>
            </div>
          ) : (
            <Button type="submit" className="w-full" loading={isPending}>
              {validToken ? <>Create an acoount</> : <>Continue</>}
            </Button>
          )}
        </form>
      </Form>
    </CardWrapper>
  );
};
