"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "/store/reducers/user";

import { adminConfirmVerify } from "/services/authenticationServices";

export default function AdminConfirmVerify() {
  const codeQuery = "code";
  const emailQuery = "email";

  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const onEnterPage = async () => {
    try {
      const code = searchParams.get(codeQuery) ?? "";
      const email = searchParams.get(emailQuery) ?? "";
      const response = await adminConfirmVerify({ code, email });
      dispatch(login(response));
      router.push("/");
    } catch (error) {}
  };

  useEffect(() => {
    onEnterPage();
  }, []);

  return <></>;
}
