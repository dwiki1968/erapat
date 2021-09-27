import nookies from "nookies";
import React from "react";
import { FiFilePlus } from "react-icons/fi";
import MetaPage from "../../components/layout/MetaPage";
import SideMenu from "../../components/layout/SideMenu";
import FormTambah from "../../components/tambah/FormTambah";
import DashboardContainer from "../../components/ui/DashboardContainer";
import PageTittle from "../../components/ui/PageTittle";
import PaperContainer from "../../components/ui/PaperContainer";

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

function Tambah({ token }) {
  return (
    <>
      <SideMenu>
        <MetaPage titlePage="Tambah Rapat" />

        <DashboardContainer>
          <PageTittle title="Tambah Rapat" icon={<FiFilePlus />} />

          {/* ada warning pada formik */}
          <PaperContainer mt={5} maxWidth="900px">
            <FormTambah token={token} />
          </PaperContainer>
        </DashboardContainer>
      </SideMenu>
    </>
  );
}

export default Tambah;
