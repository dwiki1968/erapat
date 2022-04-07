import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect } from "react";
import Login from "../../components/auth/Login";
import MetaPage from "../../components/layout/MetaPage";

const LoginPage = () => {
  const cookies = parseCookies();
  const router = useRouter();

  useEffect(() => {
    if (cookies.erapat_token) {
      router.push("/dashboard/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MetaPage titlePage="Masuk ke Aplikasi" />
      <Login />
    </>
  );
};

export default LoginPage;
