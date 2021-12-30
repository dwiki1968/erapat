import { Box } from "@chakra-ui/layout";
import nookies from "nookies";
import React from "react";
import { FiHome } from "react-icons/fi";
import Statistik from "../../components/dashboard/Statistik";
import MetaPage from "../../components/layout/MetaPage";
import SideMenu from "../../components/layout/SideMenu";
import TabelRapatUser from "../../components/rapat-anda/TabelRapatUser";
import DashboardContainer from "../../components/ui/DashboardContainer";
import PageTittle from "../../components/ui/PageTittle";
import PaperContainer from "../../components/ui/PaperContainer";

export async function getServerSideProps(ctx) {
  // Parse
  const cookies = nookies.get(ctx);
  // console.log("kuki", cookies);

  if (!cookies.token) {
    return {
      redirect: {
        destination: "/user/login",
      },
    };
  }

  return {
    props: {
      token: cookies.token,
    }, // will be passed to the page component as props
  };
}

const Dashboard = ({ token }) => {
  return (
    <>
      <MetaPage titlePage="Dashboard" />
      <SideMenu>
        <DashboardContainer>
          <PageTittle title="Beranda" icon={<FiHome />} />
          {/* <PaperContainer mt={5}> */}
          <Box m={4} />
          <Statistik />
          {/* </PaperContainer> */}
          <PaperContainer mt={5}>
            <TabelRapatUser />
          </PaperContainer>
        </DashboardContainer>
      </SideMenu>
    </>
  );
};

export default Dashboard;
