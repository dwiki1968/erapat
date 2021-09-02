import { Flex } from "@chakra-ui/layout";
import React from "react";
import { FiFilePlus } from "react-icons/fi";
import MetaPage from "../../components/layout/MetaPage";
import SideMenu from "../../components/layout/SideMenu";
import FormTambah from "../../components/tambah/FormTambah";
import DashboardContainer from "../../components/ui/DashboardContainer";
import PageTittle from "../../components/ui/PageTittle";
import PaperContainer from "../../components/ui/PaperContainer";

function Tambah() {
  return (
    <>
      <SideMenu>
        <MetaPage titlePage="Tambah Rapat" />

        <DashboardContainer>
          <PageTittle title="Tambah Rapat" icon={<FiFilePlus />} />

          {/* ada warning pada formik */}
          <PaperContainer mt={5}>
            <FormTambah />
          </PaperContainer>
        </DashboardContainer>
      </SideMenu>
    </>
  );
}

export default Tambah;
