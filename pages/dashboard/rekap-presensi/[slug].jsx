import React from "react";
import RekapPresensi from "../../../components/RekapPresensi";
import nookies, { parseCookies } from "nookies";

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);

  if (!cookies.erapat_token) {
    return {
      redirect: {
        destination: "/user/login",
      },
    };
  }

  return {
    props: { jwtToken: cookies.erapat_token },
  };
}

const Presensi = ({ jwtToken }) => {
  return (
    <>
      <RekapPresensi jwtToken={jwtToken} />
    </>
  );
};

export default Presensi;
