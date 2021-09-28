import React from "react";
import TabelRapatUser from "../../components/rapat-anda/TabelRapatUser";
import SideMenu from "../../components/layout/SideMenu";
import DashboardContainer from "../../components/ui/DashboardContainer";
import PaperContainer from "../../components/ui/PaperContainer";
import MetaPage from "../../components/layout/MetaPage";
import PageTittle from "../../components/ui/PageTittle";
import { FiUser } from "react-icons/fi";
import nookies from "nookies";

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

const RapatAnda = () => {
  return (
    <>
      <SideMenu>
        <MetaPage titlePage="Rapat Anda" />

        <DashboardContainer>
          <PageTittle title="Rapat Anda" icon={<FiUser />} />

          <PaperContainer mt={5}>
            <TabelRapatUser />
          </PaperContainer>
        </DashboardContainer>
      </SideMenu>
    </>
  );
};

export default RapatAnda;
