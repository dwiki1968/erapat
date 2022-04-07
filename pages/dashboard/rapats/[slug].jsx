import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect } from "react";
import DetailRapat from "../../../components/DetailRapat";

const Rapat = () => {
  const cookies = parseCookies();
  const router = useRouter();

  useEffect(() => {
    if (!cookies.erapat_token) {
      router.push("/user/login/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DetailRapat jwtToken={cookies.erapat_token} />
    </>
  );
};

export default Rapat;
