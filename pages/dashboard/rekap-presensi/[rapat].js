import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import nookies from "nookies";
import React from "react";
import { FiEdit, FiFileText, FiPrinter } from "react-icons/fi";
import { PuffLoader } from "react-spinners";
import useSWR from "swr";
import MetaPage from "../../../components/layout/MetaPage";
import SideMenu from "../../../components/layout/SideMenu";
import EditRekap from "../../../components/rekap-presensi/EditRekap";
import Preview from "../../../components/rekap-presensi/Preview";
import BackButton from "../../../components/ui/BackButton";
import DashBoardContainer from "../../../components/ui/DashboardContainer";
import PageTittle from "../../../components/ui/PageTittle";
import PaperContainer from "../../../components/ui/PaperContainer";

export async function getServerSideProps(ctx) {
  // Parse
  const cookies = nookies.get(ctx);
  // console.log("kuki", cookies);

  if (!cookies.token) {
    return {
      redirect: {
        destination: "/user/login",
      },
    };
  }

  return {
    props: { token: cookies.token }, // will be passed to the page component as props
  };
}

const RekapPresensi = ({ token }) => {
  const router = useRouter();
  const rapatId = router.query.rapat;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { data, error } = useSWR(
    rapatId && token
      ? [`${process.env.NEXT_PUBLIC_URL}/rapats?slug_rapat=${rapatId}`, token]
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
              <PuffLoader color="#95DAC1" />
            </Center>
          </DashBoardContainer>
        </SideMenu>
      </>
    );
  }

  if (!data.length) {
    return (
      <>
        <Text>Data Tidak Ada</Text>
      </>
    );
  }

  //jika ada data maka dijalankann baris dibaawah

  const dataRapat = data[0];

  return (
    <>
      <MetaPage titlePage={`Rekap Presensi ${dataRapat.nama}`} />

      <SideMenu>
        <DashBoardContainer>
          <Drawer
            size="xl"
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton mt={4} />
              <PaperContainer>
                <Preview data={dataRapat} />
              </PaperContainer>
            </DrawerContent>
          </Drawer>
          <BackButton />
          <PageTittle
            title={`Rekap Presensi ${dataRapat.nama}`}
            icon={<FiFileText />}
          />
          <Box m={5} />
          <PaperContainer>
            <Button
              size="md"
              ref={btnRef}
              colorScheme="blue"
              onClick={onOpen}
              mb={5}
              leftIcon={<FiPrinter />}
            >
              Preview and Print
            </Button>

            <EditRekap data={dataRapat} />
          </PaperContainer>
        </DashBoardContainer>
      </SideMenu>
    </>
  );
};

export default RekapPresensi;
