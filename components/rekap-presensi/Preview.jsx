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
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { FiPrinter } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";
import { IsoToLocalDate, IsoToLocalTime } from "../../utils/utils";

const Preview = ({ data }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <Box>
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

      <Box ref={componentRef} p={20}>
        {data && (
          <Box>
            <Center mb={5}>
              <Heading as="h3" size="lg" maxWidth="75%" textAlign="center">
                {data.nama}
              </Heading>
            </Center>

            <Text fontWeight="light">
              Hari, Tanggal : {IsoToLocalDate(data.jadwal_rapat)}
            </Text>
            <Text fontWeight="light">
              Waktu : Pukul {IsoToLocalTime(data.jadwal_rapat)} WIB - Selesai
            </Text>
          </Box>
        )}

        <Box>
          <Divider my={5} />
          <Table variant="simple" colorScheme="gray">
            <Thead bg="gray.200">
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
                    <Td>{(index += 1)}</Td>

                    <Td>{rekap.nama_peserta}</Td>
                    <Td>{rekap.unit_kerja}</Td>
                    <Td>
                      <Img w="50px" src={rekap.signature_url} />
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
