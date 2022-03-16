import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Img,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { FiPrinter } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";
import { IsoToLocalDate, IsoToLocalTime } from "../../utils/utils";
import Image from "next/image";
import logoPPATK from "../../public/LOGO_PPATK.png";

const Preview = ({ data }) => {
  // console.log(data);
  const { rapat, presensi } = data;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <Box mb={5}>
        <Button
          leftIcon={<FiPrinter />}
          colorScheme="green"
          variant="solid"
          onClick={handlePrint}
          size="md"
          borderRadius="xl"
        >
          Print
        </Button>
      </Box>

      <Box ref={componentRef}>
        {data && (
          <Box>
            <Flex alignContent="center">
              <Box w="70px">
                <Image src={logoPPATK} alt="logo" />
              </Box>
              <Box flex={1}>
                <Center mb={2}>
                  <Heading size="lg" textAlign="center">
                    Pusat Pelaporan dan Analisis Transaksi Keuangan
                  </Heading>
                </Center>
                <Center>
                  <Heading size="md" textAlign="center">
                    {rapat.unit}
                  </Heading>
                </Center>
              </Box>
            </Flex>
            <Divider borderWidth="2px" my={3} />

            <Box>
              <Heading size="sm">{rapat.nama}</Heading>
            </Box>
            <Spacer />
            <Box>
              <Text fontStyle="italic" fontSize="sm">
                {IsoToLocalDate(rapat.jadwal_rapat)}, Pukul{" "}
                {IsoToLocalTime(rapat.jadwal_rapat)} WIB - Selesai
              </Text>
            </Box>
          </Box>
        )}

        <Box m={3}></Box>

        <Box>
          <Table mt={2} variant="striped" size="sm">
            <Thead bg="gray.300" h="50px">
              <Tr>
                <Th>No.</Th>
                <Th>Nama</Th>
                <Th>Unit Kerja</Th>
                <Th>Tanda Tangan</Th>
              </Tr>
            </Thead>
            {data && (
              <Tbody>
                {presensi.map((rekap, index) => (
                  <Tr key={rekap.id}>
                    <Td>
                      <Text fontSize="sm">{(index += 1)}</Text>
                    </Td>

                    <Td>
                      <Text fontSize="sm">{rekap.nama_peserta} </Text>
                    </Td>
                    <Td>
                      <Text fontSize="sm">{rekap.unit_kerja} </Text>
                    </Td>
                    <Td>
                      <Img w="100px" h="40px" src={rekap.signature_url} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            )}
          </Table>
        </Box>
      </Box>
    </>
  );
};

export default Preview;
