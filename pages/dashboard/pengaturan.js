import React from "react";
import MetaPage from "../../components/layout/MetaPage";
import User from "../../components/pengaturan/User";
import DashboardContainer from "../../components/ui/DashboardContainer";
import PaperContainer from "../../components/ui/PaperContainer";
import SideMenu from "../../components/layout/SideMenu";
import PageTittle from "../../components/ui/PageTittle";
import { FiSettings } from "react-icons/fi";
import { Heading, Text } from "@chakra-ui/layout";
import nookies from "nookies";

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
    },
  };
}

const Pengaturan = () => {
  return (
    <>
      <SideMenu>
        <MetaPage titlePage="Pengaturan" />

        <DashboardContainer>
          <PageTittle title="Pengaturan" icon={<FiSettings />} />

          {/* ada warning pada formik */}
          <PaperContainer mt={5} maxWidth="900px">
            <Heading mb={5} size="md">
              👨‍💼 Pengaturan User
            </Heading>
            <User />
          </PaperContainer>
        </DashboardContainer>
      </SideMenu>
    </>
  );
};

export default Pengaturan;
