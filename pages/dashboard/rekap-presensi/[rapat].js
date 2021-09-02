import RingLoader from "react-spinners/RingLoader";

import {
  Box,
  Center,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FiEdit, FiFileText, FiHome } from "react-icons/fi";
import useSWR from "swr";
import SideMenu from "../../../components/layout/SideMenu";
import EditRekap from "../../../components/rekap-presensi/EditRekap";
import Preview from "../../../components/rekap-presensi/Preview";
import DashBoardContainer from "../../../components/ui/DashboardContainer";
import PaperContainer from "../../../components/ui/PaperContainer";
import PageTittle from "../../../components/ui/PageTittle";
import MetaPage from "../../../components/layout/MetaPage";

const RekapPresensi = () => {
  const router = useRouter();
  const rapatId = router.query.rapat;
  console.log("slugparams", rapatId);

  const { data, error } = useSWR(
    rapatId
      ? `${process.env.NEXT_PUBLIC_URL}/rapats?slug_rapat=${rapatId}`
      : null
  );

  if (error) {
    console.log("err", error);
  }
  //handel untuk loading
  if (!data) {
    return (
      <>
        {" "}
        <SideMenu>
          <DashBoardContainer>
            <Center h="80vh">
              <RingLoader color="#FF6B7E" />
            </Center>
          </DashBoardContainer>
        </SideMenu>
      </>
    );
  }

  if (!data.length) {
    return <>kosong</>;
  }

  //jika ada data maka dijalankann baris dibaawah

  const dataRapat = data[0];

  return (
    <>
      <MetaPage titlePage="Rekap Presensi" />

      <SideMenu>
        <DashBoardContainer>
          <PageTittle title="Rekap Presensi" icon={<FiFileText />} />

          <Tabs size="md" colorScheme="red" variant="enclosed" mt={10}>
            <TabList>
              <Tab mr={5}>
                <Text size="lg" fontWeight="bold" mr={2}>
                  Preview
                </Text>{" "}
                <FiFileText />
              </Tab>
              <Tab>
                <Text size="lg" fontWeight="bold" mr={2}>
                  Edit Data
                </Text>
                <FiEdit />
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {/* preview rekap presensi berisi fungsionalitas untuk print data rekap presensi  */}
                <PaperContainer>
                  <Preview data={dataRapat} />
                </PaperContainer>
              </TabPanel>
              <TabPanel>
                <PaperContainer>
                  <EditRekap data={dataRapat} />
                </PaperContainer>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DashBoardContainer>
      </SideMenu>
    </>
  );
};

export default RekapPresensi;
