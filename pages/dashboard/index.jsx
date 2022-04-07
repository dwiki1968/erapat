import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect } from "react";
import HomeDashboard from "../../components/HomeDashboard";

const Dashboard = () => {
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
      <HomeDashboard />
    </>
  );
};

export default Dashboard;
