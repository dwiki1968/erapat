import RingLoader from "react-spinners/RingLoader";

import {
  Box,
  Center,
  Flex,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Spacer,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FiEdit, FiFileText, FiHome, FiPrinter } from "react-icons/fi";
import useSWR from "swr";
import SideMenu from "../../../components/layout/SideMenu";
import EditRekap from "../../../components/rekap-presensi/EditRekap";
import Preview from "../../../components/rekap-presensi/Preview";
import DashBoardContainer from "../../../components/ui/DashboardContainer";
import PaperContainer from "../../../components/ui/PaperContainer";
import PageTittle from "../../../components/ui/PageTittle";
import MetaPage from "../../../components/layout/MetaPage";
import BackButton from "../../../components/ui/BackButton";
import nookies from "nookies";

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
          <PageTittle title="Rekap Presensi" icon={<FiFileText />} />
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
              Preview dan cetak
            </Button>

            <EditRekap data={dataRapat} />
          </PaperContainer>
        </DashBoardContainer>
      </SideMenu>
    </>
  );
};

const Coba = () => {
  return (
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
  );
};
export default RekapPresensi;
