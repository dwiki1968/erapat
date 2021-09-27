import { Box, Flex, Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FiFileText } from "react-icons/fi";
import AlatDetail from "../../../components/detailrapat/AlatDetail";
import IdentitasRapat from "../../../components/detailrapat/IdentitasRapat";
import MetaPage from "../../../components/layout/MetaPage";
import SideMenu from "../../../components/layout/SideMenu";
import BackButton from "../../../components/ui/BackButton";
import DashboardContainer from "../../../components/ui/DashboardContainer";
import PageTittle from "../../../components/ui/PageTittle";
import PaperContainer from "../../../components/ui/PaperContainer";
import nookies from "nookies";

export async function getServerSideProps(ctx) {
  // Parse
  const cookies = nookies.get(ctx);
  console.log("kuki", cookies);

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

const DetailRapat = () => {
  return (
    <>
      <MetaPage titlePage="Detail Rapat" />
      <SideMenu>
        <DashboardContainer>
          <BackButton />
          <PageTittle title="Detail Rapat" icon={<FiFileText />} />
          <PaperContainer mt={5}>
            <Flex
              flexDir={{
                base: "column-reverse",
                sm: "column-reverse",
                md: "column-reverse",
                lg: "row",
              }}
            >
              <Box flex={1}>
                <IdentitasRapat />
              </Box>

              <Divider
                m={5}
                colorScheme="green"
                orientation={{
                  base: "horizontal",
                  sm: "horizontal",
                  md: "horizontal",
                  lg: "vertical",
                }}
              />
              <Box w={{ sm: "100%", md: "100%", lg: "50%" }}>
                <AlatDetail />
              </Box>
            </Flex>
          </PaperContainer>
        </DashboardContainer>
      </SideMenu>
    </>
  );
};

export default DetailRapat;
