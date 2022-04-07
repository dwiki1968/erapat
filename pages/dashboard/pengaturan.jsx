import { Heading } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import DashboardContainer from "../../components/container/DashboardContainer";
import PaperContainer from "../../components/container/PaperContainer";
import SideMenu from "../../components/layout/DashboardMenu";
import MetaPage from "../../components/layout/MetaPage";
import UnitKerja from "../../components/pengaturan/UnitKerja";
import User from "../../components/pengaturan/User";
import PageTitle from "../../components/ui/PageTitle";

const Pengaturan = () => {
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
      <SideMenu>
        <MetaPage titlePage="Pengaturan" />

        <DashboardContainer>
          <PageTitle title="Pengaturan" icon={<FiSettings />} />

          {/* ada warning pada formik */}
          <PaperContainer mt={5} maxWidth="900px">
            <Heading mb={5} size="md">
              👨‍💼 Pengaturan User
            </Heading>
            <User />
          </PaperContainer>

          <PaperContainer mt={5} maxWidth="900px">
            <Heading mb={5} size="md">
              🏛 Unit Kerja
            </Heading>
            <UnitKerja />
          </PaperContainer>
        </DashboardContainer>
      </SideMenu>
    </>
  );
};

export default Pengaturan;
