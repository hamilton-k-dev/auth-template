"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";
import { SettingsSchema } from "@/schemas";

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
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { settings } from "@/actions/settings";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Header from "../auth/header";
import useCurrentUser from "@/hooks/use-current-user";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export const SettingsForm = () => {
  const router = useRouter();
  const t = useTranslations("SettingsPage");
  const { data: session, status, update } = useSession();
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [verificationToken, setVerificationToken] = useState<
    boolean | undefined
  >(false);
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user!.email || "",
      isTwoFactorEnabled: user!.isTwoFactorEnabled,
    },
  });
  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      settings(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        setVerificationToken(data.verificationToken);
        update();
      });
    });
  };
  return (
    <Card className="w-full h-screen flex flex-col items-center justify-center shadow-md">
      <CardHeader>
        <Header label={t("hearder")} />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              {verificationToken ? (
                <FormField
                  control={form.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">
                        {t("verificationToken")}
                      </FormLabel>
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
                                ))}
                              </InputOTPGroup>
                            </>
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("firstName")}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="hamilton_k@example.com"
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
                        <FormLabel>{t("lastName")}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="hamilton_k@example.com"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {!user!.isOAuth && (
                    <>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("email")}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending}
                                placeholder="hamilton_k@example.com"
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
                          <FormItem>
                            <FormLabel>{t("oldPassword")}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending}
                                placeholder={t("passwordLabel")}
                                type="password"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("newPasswordLabel")}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending}
                                placeholder={t("passwordLabel")}
                                type="password"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="isTwoFactorEnabled"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>{t("tFAuthentication")}</FormLabel>
                              <FormDescription>
                                {t("enabledTFA")}
                              </FormDescription>
                            </div>

                            <FormControl>
                              <Switch
                                checked={field.value}
                                disabled={isPending}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>
              )}

              <FormError message={error} />
              <FormSuccess message={success} />
              <Button type="submit" className="w-full" loading={isPending}>
                {t("save")}
              </Button>
              <Button
                type="button"
                variant={"secondary"}
                className="w-full"
                onClick={() => router.back()}
              >
                {t("back")}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};
