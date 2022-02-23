const qs = require("qs");
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Divider,
  Flex,
  Heading,
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
import jwt_decode from "jwt-decode";
import router from "next/router";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { FiArrowLeft, FiArrowRight, FiSearch, FiX } from "react-icons/fi";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";
import { IsoToLocalDate, IsoToLocalTime } from "../../utils/utils";
import AksiTabel from "./ActionTableButton";
import Statistic from "./Statistic";

const RapatTable = () => {
  const cookies = parseCookies();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortby, setSortby] = useState("createdAt:desc");

  const [searchVal, setSearchVal] = useState("");
  const [searchValSubmit, setSearchValSubmit] = useState("");

  // fetc data rapat untuk tabel
  const { data: rapats, error } = useSWR(
    cookies.token
      ? [
          `${process.env.NEXT_PUBLIC_URL}/rapats?${qs.stringify(
            {
              fields: ["nama", "jadwal_rapat, slug_rapat"],
              pagination: {
                page: page,
                pageSize: pageSize,
              },

              sort: [sortby],
              filters: {
                pembuat: {
                  $eq: jwt_decode(cookies.token).id,
                },
                nama: {
                  $containsi: searchValSubmit,
                },
              },
            },
            {
              encodeValuesOnly: true,
            }
          )}`,
          cookies.token,
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
      <Statistic />

      <Divider my={5} />
      <Heading size="lg" mb={5}>
        Rapat Buatan Anda
      </Heading>
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
                <Text fontSize="sm">Aksi</Text>
              </Th>
            </Tr>
          </Thead>
          {rapats ? (
            <Tbody>
              {rapats.data.map((rowRapat) => (
                <Tr key={rowRapat.id}>
                  <Td>
                    <Text fontSize="sm">
                      <Link
                        color="blue.500"
                        onClick={() =>
                          router.push(
                            `/dashboard/rapats/${rowRapat.attributes.slug_rapat}`
                          )
                        }
                      >
                        {rowRapat.attributes.nama}
                      </Link>
                    </Text>
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
                    <AksiTabel
                      slug={rowRapat.attributes.slug_rapat}
                      idRapat={rowRapat.id}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          ) : (
            <Center minH="200px">
              <BeatLoader size={10} color="red.500" />
            </Center>
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

export default RapatTable;
