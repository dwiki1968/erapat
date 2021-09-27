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
        >
          Print
        </Button>
      </Box>

      <Box ref={componentRef}>
        {data && (
          <Box>
            <Flex>
              <Box w="70px">
                <Image src={logoPPATK} />
              </Box>
              <Center>
                <Heading size="md" maxWidth="75%" textAlign="center">
                  PUSAT PELAPORAN DAN ANALISIS TRAKSAKSI KEUANGAN
                </Heading>
              </Center>
            </Flex>
            <Divider borderWidth="medium" my={3} />
            <Flex>
              <Box w="50%">
                <Heading size="sm" maxWidth="75%">
                  {data.nama}
                </Heading>

                <Text fontSize="sm">{data.unit}</Text>
              </Box>
              <Spacer />
              <Box>
                <Text fontSize="sm">{IsoToLocalDate(data.jadwal_rapat)}</Text>
                <Text fontSize="sm">
                  {IsoToLocalTime(data.jadwal_rapat)} WIB - Selesai
                </Text>
              </Box>
            </Flex>
          </Box>
        )}

        <Box>
          <Table mt={2} variant="simple" size="md">
            <Thead>
              <Tr>
                <Th>No.</Th>
                <Th>Nama</Th>
                <Th>Unit Kerja</Th>
                <Th>Tanda Tangan</Th>
              </Tr>
            </Thead>
            {data && (
              <Tbody>
                {data.presenses.map((rekap, index) => (
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
                      <Img w="100px" src={rekap.signature_url} />
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
