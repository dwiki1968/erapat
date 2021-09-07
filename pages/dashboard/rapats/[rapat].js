import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FiFileText } from "react-icons/fi";
import AlatDetail from "../../../components/detailrapat/AlatDetail";
import IdentitasRapat from "../../../components/detailrapat/IdentitasRapat";
import MetaPage from "../../../components/layout/MetaPage";
import SideMenu from "../../../components/layout/SideMenu";
import DashboardContainer from "../../../components/ui/DashboardContainer";
import PageTittle from "../../../components/ui/PageTittle";
import PaperContainer from "../../../components/ui/PaperContainer";

const DetailRapat = () => {
  return (
    <>
      <MetaPage titlePage="Detail Rapat" />
      <SideMenu>
        <DashboardContainer>
          <PageTittle title="Detail Rapat" icon={<FiFileText />} />

          <Flex
            flexDir={{
              base: "column-reverse",
              sm: "column-reverse",
              md: "column-reverse",
              lg: "row",
            }}
          >
            <PaperContainer mt={5} flex={1}>
              <IdentitasRapat />
            </PaperContainer>

            <Box m={2} />
            <PaperContainer mt={5} w={{ sm: "100%", md: "100%", lg: "60%" }}>
              <AlatDetail />
            </PaperContainer>
          </Flex>
        </DashboardContainer>
      </SideMenu>
    </>
  );
};

export default DetailRapat;
