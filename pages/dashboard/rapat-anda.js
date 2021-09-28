import React from "react";
import TabelRapatUser from "../../components/rapat-anda/TabelRapatUser";
import SideMenu from "../../components/layout/SideMenu";
import DashboardContainer from "../../components/ui/DashboardContainer";
import PaperContainer from "../../components/ui/PaperContainer";
import MetaPage from "../../components/layout/MetaPage";
import PageTittle from "../../components/ui/PageTittle";
import { FiUser } from "react-icons/fi";

const RapatAnda = () => {
  return (
    <>
      <SideMenu>
        <MetaPage titlePage="Rapat Anda" />

        <DashboardContainer>
          <PageTittle title="Rapat Anda" icon={<FiUser />} />

          {/* ada warning pada formik */}
          <PaperContainer mt={5}>
            <TabelRapatUser />
          </PaperContainer>
        </DashboardContainer>
      </SideMenu>
    </>
  );
};

export default RapatAnda;
