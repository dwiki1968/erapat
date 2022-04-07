import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect } from "react";
import { FiFileText } from "react-icons/fi";
import AllRapat from "../../components/AllRapat";
import DashboardContainer from "../../components/container/DashboardContainer";
import PaperContainer from "../../components/container/PaperContainer";
import DashboardMenu from "../../components/layout/DashboardMenu";
import MetaPage from "../../components/layout/MetaPage";
import PageTitle from "../../components/ui/PageTitle";

const SemuaRapat = () => {
  const cookies = parseCookies();
  const router = useRouter();

  useEffect(() => {
    if (!cookies.erapat_token) {
      router.push("/user/login/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
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
    </>
  );
};

export default SemuaRapat;
