import qs from "qs";
import {
  Box,
  Button,
  Center,
  Divider,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import nookies, { parseCookies } from "nookies";
import React from "react";
import { FiFileText, FiPrinter } from "react-icons/fi";
import { PuffLoader } from "react-spinners";
import useSWR from "swr";

import MetaPage from "../layout/MetaPage";
import SideMenu from "../layout/DashboardMenu";
import EditRekap from "./EditRekap";
import Preview from "./Preview";
import BackButton from "../ui/BackButton";
import DashBoardContainer from "../container/DashboardContainer";
import PageTittle from "../ui/PageTitle";
import PaperContainer from "../container/PaperContainer";
import Clipboard from "./Clipboard";

const RekapPresensi = ({ token }) => {
  const cookies = parseCookies();
  const router = useRouter();
  const slug = router.query.slug;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { data, error } = useSWR(
    slug && cookies.token
      ? [
          `${process.env.NEXT_PUBLIC_URL}/presensis/rekap/${slug}`,
          cookies.token,
        ]
      : null
  );

  if (error) {
    return (
      <>
        <Text color="red.500" fontStyle="italic">
          Opps, data tidak ditemukan
        </Text>
      </>
    );
  }

  //handel untuk loading
  if (!data) {
    return (
      <>
        <Center p={10}>
          <PuffLoader color="red.300" />
        </Center>
      </>
    );
  }
  const { rapat, presensi } = data;

  //jika ada data maka dijalankann baris dibaawah

  //jika ada data maka dijalankann baris dibaawah

  return (
    <>
      <MetaPage titlePage={`Rekap Presensi ${rapat.nama}`} />

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
            <DrawerContent overflow="scroll">
              <DrawerCloseButton mt={4} />
              <PaperContainer>
                <Preview data={data} />
              </PaperContainer>
            </DrawerContent>
          </Drawer>
          <BackButton />
          <PageTittle
            title={`Rekap Presensi ${rapat.nama}`}
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
              borderRadius="xl"
            >
              Cek / Cetak
            </Button>

            <Clipboard
              kalimat={`${process.env.NEXT_PUBLIC_CLIENT}/presensi/${slug}`}
            />
            <Divider my={5} />

            <EditRekap data={presensi} />
          </PaperContainer>
        </DashBoardContainer>
      </SideMenu>
    </>
  );
};

export default RekapPresensi;
