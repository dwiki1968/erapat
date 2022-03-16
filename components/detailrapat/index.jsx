import { Box, Divider, Flex } from "@chakra-ui/react";
import React from "react";
import { FiFileText } from "react-icons/fi";
import AlatDetail from "./AlatDetail";
import IdentitasRapat from "./IdentitasRapat";
import MetaPage from "../layout/MetaPage";
import SideMenu from "../layout/DashboardMenu";
import BackButton from "../ui/BackButton";
import DashboardContainer from "../container/DashboardContainer";
import PageTittle from "../ui/PageTitle";
import PaperContainer from "../container/PaperContainer";

const DetailRapat = ({ jwtToken }) => {
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
                <IdentitasRapat jwtToken={jwtToken} />
              </Box>

              <Divider
                borderWidth="1px"
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
                <AlatDetail jwtToken={jwtToken} />
              </Box>
            </Flex>
          </PaperContainer>
        </DashboardContainer>
      </SideMenu>
    </>
  );
};

export default DetailRapat;
