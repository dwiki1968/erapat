import nookies from "nookies";
import React from "react";
import HomeDashboard from "../../components/HomeDashboard";

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
    props: {
      token: cookies.erapat_token,
    },
  };
}

const Dashboard = ({ token }) => {
  return (
    <>
      <HomeDashboard />
    </>
  );
};

export default Dashboard;
