import nookies from "nookies";
import React from "react";
import { FiCalendar } from "react-icons/fi";
import TabelRapat from "../../components/dashboard/TabelRapat";
import MetaPage from "../../components/layout/MetaPage";
import SideMenu from "../../components/layout/SideMenu";
import DashboardContainer from "../../components/ui/DashboardContainer";
import PageTittle from "../../components/ui/PageTittle";
import PaperContainer from "../../components/ui/PaperContainer";

export async function getServerSideProps(ctx) {
  // Parse
  const cookies = nookies.get(ctx);

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
    },
  };
}

const SemuaRapat = () => {
  return (
    <>
      <SideMenu>
        <MetaPage titlePage="Semua Rapat" />

        <DashboardContainer>
          <PageTittle title="Semua Rapat" icon={<FiCalendar />} />
          <PaperContainer mt={5}>
            <TabelRapat />
          </PaperContainer>
        </DashboardContainer>
      </SideMenu>
    </>
  );
};

export default SemuaRapat;
