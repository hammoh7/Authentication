"use client";

import { Card, CardFooter, CardHeader } from "../ui/card";
import { Header } from "./header";
import { BackButton } from "./back-button";
import { ClipLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { confirmVerification } from "@/activities/confirm-verification";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

export const VerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token");
      return;
    }
    confirmVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);
  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <Header label="Confirm your Verification" />
        </CardHeader>
        <div className="items-center justify-center flex">
          {!success && !error && ( <ClipLoader /> )}
          <FormSuccess message={success} />
          {!success && <FormError message={error} />}
        </div>
        <CardFooter className="p-5">
          <BackButton label="Back" href="/Login" />
        </CardFooter>
      </Card>
    </div>
  );
};
