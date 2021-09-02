import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import AksiTabel from "./AksiTabel";
import DokumenTabel from "./DokumenTabel";
import FilterTabel from "./FilterTabel";
import { IsoToLocalDate, IsoToLocalTime } from "../../utils/utils";

const TabelRapat = () => {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}/rapats`); //get data--> kedepannya ganti slug bukan id

  if (error) {
    return (
      <Box>
        <Text>Maaf Terjadi kesalahan</Text>
      </Box>
    ); //lgoic jika gagal
  }
  return (
    <>
      <FilterTabel />
      <Box overflow="auto">
        {data ? (
          <Table>
            <Thead>
              <Tr>
                <Th>
                  <Text fontSize="md">Nama</Text>
                </Th>
                <Th>
                  <Text fontSize="md">Jadwal</Text>
                </Th>
                <Th>
                  <Text fontSize="md">Dokumen</Text>
                </Th>
                <Th pl={10}>
                  <Text fontSize="md">Aksi</Text>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((rapat) => (
                <Tr key={rapat.id}>
                  <Td>
                    <Text fontSize="md">{rapat.nama}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">
                      📆 {IsoToLocalDate(rapat.jadwal_rapat)}
                    </Text>
                    <Text fontSize="sm">
                      ⏲ {IsoToLocalTime(rapat.jadwal_rapat)} WIB
                    </Text>
                  </Td>

                  <Td>
                    <DokumenTabel idRapat={rapat.id} slug={rapat.slug_rapat} />
                  </Td>
                  <Td>
                    <AksiTabel slug={rapat.slug_rapat} idRapat={rapat.id} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Center py={20}>
            <Spinner
              thickness="5px"
              speed="0.45s"
              emptyColor="gray.200"
              color="purple.200"
              size="xl"
            />
          </Center>
        )}
      </Box>
      <Box my={5}>
        <Flex>
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button>👈 Sebelum</Button>
            <Button>1</Button>
            <Button>Sesudah 👉</Button>
          </ButtonGroup>
        </Flex>
      </Box>
    </>
  );
};

export default TabelRapat;
