import { useClipboard, useDisclosure } from "@chakra-ui/hooks";
import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Spacer,
  Text,
  useToast,
  Textarea,
  Collapse,
  IconButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import UploadBahan from "./request/UploadBahan";
import UploadRisalah from "./request/UploadRisalah";
import FilesRapat from "./FilesRapat";

import PuffLoader from "react-spinners/PuffLoader";
import { parseCookies } from "nookies";
import FileRisalah from "./request/FileRisalah";
import FileBahan from "./request/FileBahan";
import { FiPlus, FiPlusCircle, FiUserCheck } from "react-icons/fi";
import Clipboard from "./Clipboard";
import { IsoToLocalDate, IsoToLocalTime } from "../../utils/utils";

function AlatDetail() {
  const cookies = parseCookies(); //cookies.token

  const router = useRouter();
  const slugRapat = router.query.rapat;

  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();
  const { data, error } = useSWR(
    slugRapat && cookies.token
      ? [
          `${process.env.NEXT_PUBLIC_URL}/rapats?slug_rapat=${slugRapat}`,
          cookies.token,
        ]
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
  // console.log(dataRapat);
  const {
    id,
    nama,
    jadwal_rapat,
    pimpinan,
    jenis,
    tempat,
    agenda_rapat,
    file_bahan, //array of object
    file_risalah, //object
    slug_rapat,
  } = dataRapat;

  return (
    <>
      <Flex mb={3}>
        <Button
          leftIcon={<FiUserCheck />}
          colorScheme="green"
          mr={10}
          size="md"
          onClick={() => router.push(`/dashboard/rekap-presensi/${slugRapat}`)}
        >
          Rekap Presensi
        </Button>
      </Flex>

      {/* undangan  */}
      <Text fontWeight="semibold">Undangan Rapat</Text>
      <Box my={2} />
      <Clipboard
        kalimat={`Undangan *${nama}*\nAgenda Rapat : ${agenda_rapat}\nHari/Tanggal : ${IsoToLocalDate(
          jadwal_rapat
        )}\nWaktu : ${IsoToLocalTime(
          jadwal_rapat
        )}\nPimpinan : ${pimpinan}\nLokasi / Tautan: ${tempat}\nKami mohon kehadiran Bapak/Ibu, terima kasih.`}
      />
      <Box my={5} />

      {/* copy presensi rapat  */}
      <Text fontWeight="semibold">Tautan presensi</Text>
      <Box my={2} />
      <Clipboard
        kalimat={`Yth. Bapak/Ibu peserta ${nama} \nBerikut link presensi: \n${process.env.NEXT_PUBLIC_CLIENT}/${slug_rapat}\nTerima kasih`}
      />

      <Box my={5} />

      {/* file risalah  */}
      <Text fontWeight="semibold">File Risalah</Text>
      <Box my={2} />
      <Box>
        {file_risalah ? (
          <FileRisalah fileRisalah={file_risalah} />
        ) : (
          <UploadRisalah RapatId={id} />
        )}

        <Box my={5} />
        {/* file bahan rapat  */}
        <Text fontWeight="semibold">File Bahan Rapat </Text>
        <Text fontSize="sm" fontStyle="italic">
          *Optional
        </Text>
        <Box my={2} />
        <IconButton
          onClick={onToggle}
          icon={<FiPlus />}
          rounded="full"
          colorScheme="green"
          size="sm"
        />
        <Collapse in={isOpen} animateOpacity>
          <Box mt={2} />
          <UploadBahan RapatId={id} />
        </Collapse>
        <Box my={2} />
        {file_bahan.length > 0 ? <FileBahan fileBahan={file_bahan} /> : null}
      </Box>
    </>
  );
}

export default AlatDetail;
