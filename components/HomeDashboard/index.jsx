import { Box } from "@chakra-ui/layout";
import nookies from "nookies";
import React from "react";
import { FiHome } from "react-icons/fi";
import DashboardMenu from "../layout/DashboardMenu";
import DashboardContainer from "../container/DashboardContainer";
import MetaPage from "../layout/MetaPage";
import PageTittle from "../ui/PageTitle";
import PaperContainer from "../container/PaperContainer";
import RapatTable from "./RapatTable";

const HomeDashboard = ({ token }) => {
  return (
    <>
      <MetaPage titlePage="Dashboard" />
      <DashboardMenu>
        <DashboardContainer>
          <PageTittle title="Beranda" icon={<FiHome />} />
          <Box m={4} />
          <PaperContainer>
            <RapatTable />
          </PaperContainer>
        </DashboardContainer>
      </DashboardMenu>
    </>
  );
};

export default HomeDashboard;
