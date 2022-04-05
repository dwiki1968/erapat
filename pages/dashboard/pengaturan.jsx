import React from "react";
import MetaPage from "../../components/layout/MetaPage";
import User from "../../components/pengaturan/User";
import DashboardContainer from "../../components/container/DashboardContainer";
import PaperContainer from "../../components/container/PaperContainer";
import SideMenu from "../../components/layout/DashboardMenu";
import PageTitle from "../../components/ui/PageTitle";
import { FiSettings } from "react-icons/fi";
import { Heading, Text } from "@chakra-ui/layout";
import nookies from "nookies";
import UnitKerja from "../../components/pengaturan/UnitKerja";

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

const Pengaturan = () => {
  return (
    <>
      <SideMenu>
        <MetaPage titlePage="Pengaturan" />

        <DashboardContainer>
          <PageTitle title="Pengaturan" icon={<FiSettings />} />

          {/* ada warning pada formik */}
          <PaperContainer mt={5} maxWidth="900px">
            <Heading mb={5} size="md">
              👨‍💼 Pengaturan User
            </Heading>
            <User />
          </PaperContainer>

          <PaperContainer mt={5} maxWidth="900px">
            <Heading mb={5} size="md">
              🏛 Unit Kerja
            </Heading>
            <UnitKerja />
          </PaperContainer>
        </DashboardContainer>
      </SideMenu>
    </>
  );
};

export default Pengaturan;
