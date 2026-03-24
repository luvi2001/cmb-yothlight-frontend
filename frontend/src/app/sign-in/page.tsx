"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LoginPage } from "@/pages/LoginPage";

export default function Login() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push("/super-admin");
  };

  return <LoginPage onLoginSuccess={handleLoginSuccess} />;
}

