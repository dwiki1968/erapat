import { useDisclosure } from "@chakra-ui/hooks";
import {
  Box,
  Button,
  Center,
  Collapse,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import qs from "qs";
import { FiPlus, FiUserCheck } from "react-icons/fi";
import PuffLoader from "react-spinners/PuffLoader";
import useSWR from "swr";
import { IsoToLocalDate, IsoToLocalTime } from "../../utils/utils";
import Clipboard from "./Clipboard";
import FileBahan from "./file/FileBahan";
import FileRisalah from "./file/FileRisalah";
import UploadBahan from "./file/UploadBahan";
import UploadRisalah from "./file/UploadRisalah";

function AlatDetail({ jwtToken }) {
  const router = useRouter();
  const slug = router.query.slug;

  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();

  const { data, error } = useSWR(
    slug && jwtToken
      ? [
          `${process.env.NEXT_PUBLIC_URL}/api/rapats?${qs.stringify(
            {
              populate: "*",
              filters: {
                slug_rapat: {
                  $eq: slug,
                },
              },
            },
            {
              encodeValuesOnly: true,
            }
          )}`,
          jwtToken,
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
          <PuffLoader color="red.300" />
        </Center>
      </>
    );
  }

  // console.log("data", data);

  if (!data.data.length) {
    return (
      <>
        <Text color="red.500" fontStyle="italic">
          Opps, data tidak ditemukan
        </Text>
      </>
    );
  }

  //jika ada data maka dijalankann baris dibaawah

  const dataRapat = data.data[0];
  // console.log(dataRapat);
  const {
    nama,
    jadwal_rapat,
    pimpinan,
    tempat,
    agenda_rapat,
    file_risalah,
    file_bahan,
    jenis,
    unit,
  } = dataRapat.attributes;

  const id = dataRapat.id;

  return (
    <>
      <Flex mb={3}>
        <Button
          borderRadius="xl"
          leftIcon={<FiUserCheck />}
          colorScheme="green"
          mr={10}
          size="md"
          onClick={() => router.push(`/dashboard/rekap-presensi/${slug}`)}
        >
          Rekap Presensi
        </Button>
      </Flex>

      {/* undangan  */}
      <Text fontWeight="semibold">Undangan Rapat</Text>
      <Box my={2} />
      <Clipboard
        kalimat={`Dengan hormat,\nBersama ini kami mengundang Bapak dan Ibu untuk menghadiri Undangan *${nama}*\n\nAgenda Rapat : ${agenda_rapat}\nHari/Tanggal : ${IsoToLocalDate(
          jadwal_rapat
        )}\nWaktu : ${IsoToLocalTime(
          jadwal_rapat
        )}\nPimpinan : ${pimpinan}\nLokasi / Tautan: ${tempat}\n\nKami mohon kehadiran Bapak/Ibu, terima kasih.`}
      />
      <Box my={5} />
      {/* copy presensi rapat  */}
      <Text fontWeight="semibold">Tautan presensi</Text>
      <Box my={2} />
      <Clipboard
        kalimat={`Yth. Bapak/Ibu peserta ${nama} \n\nBerikut link presensi: \n${process.env.NEXT_PUBLIC_CLIENT}/presensi/${slug}\n\nTerima kasih`}
      />
      <Box my={5} />

      {/* file risalah  */}
      <Text fontWeight="semibold">File Risalah</Text>
      <Box my={2} />
      <Box>
        {file_risalah.data ? (
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
        <Button
          onClick={onToggle}
          rightIcon={<FiPlus />}
          borderRadius="xl"
          colorScheme="blue"
          size="sm"
          mb={2}
        >
          Tambahkan
        </Button>
        {file_bahan.data !== null && <FileBahan fileBahan={file_bahan} />}

        <Collapse in={isOpen} animateOpacity>
          <Box mt={2} />
          <UploadBahan RapatId={id} />
        </Collapse>
        <Box my={2} />
      </Box>
    </>
  );
}

export default AlatDetail;
