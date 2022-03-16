const qs = require("qs");
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  IconButton,
  Input,
  InputGroup,
  Link,
  Select,
  Spacer,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import router from "next/router";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { FiArrowLeft, FiArrowRight, FiSearch, FiX } from "react-icons/fi";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";
import { IsoToLocalDate, IsoToLocalTime } from "../../utils/utils";
import AksiTabel from "./ActionTableButton";

const AllRapat = () => {
  const cookies = parseCookies();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortby, setSortby] = useState("createdAt:desc");

  const [searchVal, setSearchVal] = useState("");
  const [searchValSubmit, setSearchValSubmit] = useState("");

  // fetc data rapat untuk tabel
  const { data: rapats, error } = useSWR(
    cookies.erapat_token
      ? [
          `${process.env.NEXT_PUBLIC_URL}/rapats?${qs.stringify(
            {
              fields: ["nama", "jadwal_rapat, slug_rapat", "unit"],
              pagination: {
                page: page,
                pageSize: pageSize,
              },

              sort: [sortby],
              filters: {
                nama: {
                  $containsi: searchValSubmit,
                },
              },
            },
            {
              encodeValuesOnly: true,
            }
          )}`,
          cookies.erapat_token,
        ]
      : null
  );

  if (error) {
    return (
      <Center>
        <Text color="red.500" fontStyle="italic">
          Maaf Terjadi kesalahan{error.message}
        </Text>
      </Center>
    );
  }

  return (
    <>
      <Flex flexDir={{ base: "column", sm: "column", md: "column", lg: "row" }}>
        <InputGroup size="md">
          <Input
            w={{ base: "100%", sm: "100%", md: "100%", lg: "40%" }}
            mb={5}
            placeholder="cari berdasar nama rapat . . ."
            value={searchVal}
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
            borderRadius="xl"
            variant="filled"
          />

          <IconButton
            colorScheme="blue"
            bg="blue.300"
            borderRadius="xl"
            icon={<FiSearch />}
            ml={3}
            onClick={() => {
              setSearchValSubmit(searchVal);
            }}
          />
          {searchValSubmit ? (
            <IconButton
              colorScheme="red"
              bg="red.300"
              borderRadius="xl"
              icon={<FiX />}
              ml={3}
              onClick={() => {
                setSearchValSubmit("");
                setSearchVal("");
              }}
            />
          ) : null}
        </InputGroup>
        <Spacer />
        <Flex w={{ base: "100%", sm: "100%", md: "100%", lg: "300px" }} mb={5}>
          <Select
            borderRadius="xl"
            size="md"
            variant="filled"
            onChange={(e) => {
              setSortby(e.target.value);
            }}
            value={sortby}
            textColor="gray.400"
          >
            <option value="createdAt:desc">tgl. buat terbaru</option>
            <option value="createdAt:asc">tgl. buat terlama</option>
            <option value="jadwal_rapat:desc">tgl. jadwal terbaru</option>
            <option value="jadwal_rapat:asc">tgl. jadwal terlama</option>
            <option value="nama:asc">nama rapat a-z</option>
            <option value="nama:desc">nama rapat z-a</option>
          </Select>
        </Flex>
      </Flex>
      <Box overflow="auto">
        <Table>
          <Thead>
            <Tr>
              <Th>
                <Text fontSize="sm">Nama</Text>
              </Th>
              <Th>
                <Text fontSize="sm">Waktu</Text>
              </Th>
              <Th>
                <Text fontSize="sm">Tanggal</Text>
              </Th>
              <Th>
                <Text fontSize="sm">Unit Kerja</Text>
              </Th>
            </Tr>
          </Thead>

          {rapats ? (
            <Tbody>
              {rapats.data.map((rowRapat) => (
                <Tr key={rowRapat.id}>
                  <Td>
                    <Text fontSize="sm">{rowRapat.attributes.nama}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">
                      ⏲ {IsoToLocalTime(rowRapat.attributes.jadwal_rapat)} WIB
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">
                      📆 {IsoToLocalDate(rowRapat.attributes.jadwal_rapat)}
                    </Text>
                  </Td>

                  <Td>
                    <Text fontSize="sm">{rowRapat.attributes.unit}</Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          ) : (
            <Tbody>
              <Td>
                <BeatLoader size={10} color="#90CDF4" />
              </Td>
              <Td>
                <BeatLoader size={10} color="#90CDF4" />
              </Td>
              <Td>
                <BeatLoader size={10} color="#90CDF4" />
              </Td>
              <Td>
                <BeatLoader size={10} color="#90CDF4" />
              </Td>
              <Td>
                <BeatLoader size={10} color="#90CDF4" />
              </Td>
            </Tbody>
          )}
        </Table>
      </Box>
      <Box my={5}>
        <Flex>
          {rapats && (
            <ButtonGroup size="md" variant="outline" isAttached>
              <IconButton
                icon={<FiArrowLeft />}
                isDisabled={page == 1}
                onClick={() => setPage(page - 1)}
              />

              <Button>Page : {page}</Button>

              <IconButton
                onClick={() => setPage(page + 1)}
                icon={<FiArrowRight />}
                isDisabled={page == rapats.meta.pagination.pageCount}
              />
            </ButtonGroup>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default AllRapat;
