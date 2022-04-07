import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect } from "react";
import RekapPresensi from "../../../components/RekapPresensi";

const Presensi = () => {
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
      <RekapPresensi jwtToken={cookies.erapat_token} />
    </>
  );
};

export default Presensi;
