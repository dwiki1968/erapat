import nookies from "nookies";
import React from "react";
import DetailRapat from "../../../components/DetailRapat";

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

const Rapat = ({ jwtToken }) => {
  return (
    <>
      <DetailRapat jwtToken={jwtToken} />
    </>
  );
};

export default Rapat;
