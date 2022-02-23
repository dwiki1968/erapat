import React from "react";
import RekapPresensi from "../../../components/RekapPresensi";
import nookies, { parseCookies } from "nookies";

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);

  if (!cookies.token) {
    return {
      redirect: {
        destination: "/user/login",
      },
    };
  }

  return {
    props: { token: cookies.token },
  };
}

const Presensi = () => {
  return (
    <>
      <RekapPresensi />
    </>
  );
};

export default Presensi;
