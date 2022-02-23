import { useRouter } from "next/router";
import React from "react";
import ResetPassword from "../../../components/auth/ResetPassword";
import MetaPage from "../../../components/layout/MetaPage";

const ResetPwd = () => {
  const router = useRouter();
  const resetToken = router.query.token;

  return (
    <>
      <MetaPage titlePage="Selamat Datang" />
      <ResetPassword />
    </>
  );
};

export default ResetPwd;
