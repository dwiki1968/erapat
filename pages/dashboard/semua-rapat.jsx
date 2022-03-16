import nookies from "nookies";
import React from "react";
import { FiFileText } from "react-icons/fi";
import AllRapat from "../../components/AllRapat";
import DashboardContainer from "../../components/container/DashboardContainer";
import PaperContainer from "../../components/container/PaperContainer";
import DashboardMenu from "../../components/layout/DashboardMenu";
import MetaPage from "../../components/layout/MetaPage";
import PageTitle from "../../components/ui/PageTitle";

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  if (!cookies.erapat_token) {
    return {
      redirect: {
        destination: "/user/login",
      },
    };
  }

  return {
    props: {
      token: cookies.erapat_token,
    },
  };
}

const SemuaRapat = () => {
  return (
    <div>
      <DashboardMenu>
        <MetaPage titlePage="Semua Rapat" />

        <DashboardContainer>
          <PageTitle title="Semua Rapat" icon={<FiFileText />} />

          {/* ada warning pada formik */}
          <PaperContainer mt={5}>
            <AllRapat />
          </PaperContainer>
        </DashboardContainer>
      </DashboardMenu>
    </div>
  );
};

export default SemuaRapat;
