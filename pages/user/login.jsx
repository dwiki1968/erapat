import React from "react";
import Login from "../../components/auth/Login";
import MetaPage from "../../components/layout/MetaPage";
import nookies, { setCookie } from "nookies";

//user auth checking in browser cookies
export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  if (cookies.erapat_token) {
    return {
      redirect: {
        destination: "/dashboard/",
      },
    };
  }

  return {
    props: {},
  };
}

const login = () => {
  return (
    <>
      <MetaPage titlePage="Masuk ke Aplikasi" />
      <Login />
    </>
  );
};

export default login;
