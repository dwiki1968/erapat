import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect } from "react";
import { FiFilePlus } from "react-icons/fi";
import DashboardContainer from "../../components/container/DashboardContainer";
import PaperContainer from "../../components/container/PaperContainer";
import DashboardMenu from "../../components/layout/DashboardMenu";
import MetaPage from "../../components/layout/MetaPage";
import TambahRapat from "../../components/TambahRapat";
import PageTitle from "../../components/ui/PageTitle";

const TambahRapatPage = () => {
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
        <MetaPage titlePage="Tambah Rapat" />

        <DashboardContainer>
          <PageTitle title="Tambah Rapat" icon={<FiFilePlus />} />

          <PaperContainer mt={5} maxWidth="900px">
            <TambahRapat />
          </PaperContainer>
        </DashboardContainer>
      </DashboardMenu>
    </>
  );
};

export default TambahRapatPage;
