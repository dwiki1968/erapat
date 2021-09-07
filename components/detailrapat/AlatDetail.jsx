import { useClipboard } from "@chakra-ui/hooks";
import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import UploadBahan from "../request/UploadBahan";
import UploadRisalah from "../request/UploadRisalah";
import FilesRapat from "./FilesRapat";

import PuffLoader from "react-spinners/PuffLoader";

function AlatDetail() {
  const router = useRouter();
  const slugRapat = router.query.rapat;
  const { hasCopied, onCopy } = useClipboard(
    slugRapat ? `http://localhost:3000/presensi/${slugRapat}` : "loading..."
  );

  console.log("slugparams", slugRapat);
  const toast = useToast();
  const { data, error } = useSWR(
    slugRapat
      ? `${process.env.NEXT_PUBLIC_URL}/rapats?slug_rapat=${slugRapat}`
      : null
  );

  if (error) {
    console.log("err", error);
  }
  //handel untuk loading
  if (!data) {
    return (
      <>
        <Center p={10}>
          <PuffLoader color="#FF6B7E" />
        </Center>
      </>
    );
  }

  if (!data.length) {
    return <>kosong</>;
  }

  //jika ada data maka dijalankann baris dibaawah

  const dataRapat = data[0];
  const {
    id,
    nama,
    jadwal_rapat,
    pimpinan,
    jenis,
    tempat,
    agenda_rapat,
    file_bahan,
    file_risalah,
  } = dataRapat;
  console.log("dataRapat", dataRapat);

  return (
    <>
      <Flex mb={5}>
        <Button
          colorScheme="green"
          mr={10}
          size="md"
          onClick={() => router.push(`/dashboard/rekap-presensi/${slugRapat}`)}
        >
          👨‍💼 Rekap Presensi
        </Button>
      </Flex>
      {/* copy presensi rapat  */}
      <Flex alignItems="center">
        <Text fontWeight="semibold">Link Presensi</Text>
        <Spacer />
        <Input
          w="80%"
          value={
            slugRapat
              ? `http://localhost:3000/presensi/${slugRapat}`
              : "loading..."
          }
          isReadOnly
          placeholder="Welcome"
        />
        <Button onClick={onCopy} ml={2} colorScheme="green">
          {hasCopied ? "Copied" : "Copy"}
        </Button>
      </Flex>
      {/* file rapat  */}
      <Flex
        my={5}
        flexDir={{ base: "column", sm: "row", md: "column", lg: "row" }}
      >
        <Box w={{ base: "100%", sm: "50%", md: "100%", lg: "50%" }}>
          <UploadRisalah RapatId={id} />
          <Box my={5} />
          <UploadBahan RapatId={id} />
        </Box>
        <Box m={3} />
        <Box flex={1}>
          <FilesRapat fileRisalah={file_risalah} fileBahan={file_bahan} />
        </Box>
      </Flex>
    </>
  );
}

export default AlatDetail;
