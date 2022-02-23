import nookies from "nookies";
import React from "react";
import { FiFilePlus } from "react-icons/fi";
import MetaPage from "../../components/layout/MetaPage";
import DashboardMenu from "../../components/layout/DashboardMenu";
import Tambah from "../../components/TambahRapat";
import DashboardContainer from "../../components/container/DashboardContainer";
import PageTitle from "../../components/ui/PageTitle";
import PaperContainer from "../../components/container/PaperContainer";

export async function getServerSideProps(ctx) {
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

function TambahRapat({ token }) {
  return (
    <>
      <DashboardMenu>
        <MetaPage titlePage="Tambah Rapat" />

        <DashboardContainer>
          <PageTitle title="Tambah Rapat" icon={<FiFilePlus />} />

          {/* ada warning pada formik */}
          <PaperContainer mt={5} maxWidth="900px">
            <Tambah token={token} />
          </PaperContainer>
        </DashboardContainer>
      </DashboardMenu>
    </>
  );
}

export default TambahRapat;
