import nookies from "nookies";
import React from "react";
import DetailRapat from "../../../components/DetailRapat";

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
    props: {}, // will be passed to the page component as props
  };
}

const Rapat = () => {
  return (
    <>
      <DetailRapat />
    </>
  );
};

export default Rapat;
