import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import useSWR from "swr";
import { IsoToLocalDate, IsoToLocalTime } from "../../utils/utils";
import AksiTabel from "./AksiTabel";
import DokumenTabel from "./DokumenTabel";
import FilterTabel from "./FilterTabel";

const TabelRapat = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const start = (page - 1) * limit;

  const { data: rapats, error } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/rapats?_limit=${limit}&_start=${start}`
  );

  const { data: totalRapat } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/rapats/count`
  );

  if (!totalRapat) {
    console.log("loading");
  }

  let lastPage = Math.ceil(totalRapat / limit);

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
        {rapats ? (
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
              {rapats.map((rapat) => (
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
          <ButtonGroup size="sm" variant="outline" isAttached>
            <IconButton
              icon={<FiArrowLeft />}
              isDisabled={page == 1}
              onClick={() => setPage(page - 1)}
            />

            <Button>Page : {page}</Button>

            <IconButton
              onClick={() => setPage(page + 1)}
              icon={<FiArrowRight />}
              isDisabled={page == lastPage}
            />
          </ButtonGroup>
        </Flex>
      </Box>
    </>
  );
};

export default TabelRapat;
