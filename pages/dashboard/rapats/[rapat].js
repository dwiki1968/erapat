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
          <PaperContainer mt={5}>
            <AlatDetail />
          </PaperContainer>
          <PaperContainer mt={5}>
            <IdentitasRapat />
          </PaperContainer>
        </DashboardContainer>
      </SideMenu>
    </>
  );
};

export default DetailRapat;
