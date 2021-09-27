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
  Select,
  Input,
  Spacer,
  InputGroup,
  InputRightAddon,
  Link,
} from "@chakra-ui/react";
import router from "next/router";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { FiArrowLeft, FiArrowRight, FiSearch } from "react-icons/fi";
import useSWR from "swr";
import { IsoToLocalDate, IsoToLocalTime } from "../../utils/utils";
import AksiTabel from "./AksiTabel";
import FilterTabel from "./FilterTabel";

const TabelRapat = () => {
  const cookies = parseCookies();
  // console.log("tabel", cookies);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortby, setSortby] = useState("created_at:DESC");

  const handleSort = (e) => {
    setSortby(e.target.value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const start = (page - 1) * limit;

  // fetc data rapat untuk tabel
  const { data: rapats, error } = useSWR(
    cookies.token
      ? [
          `${process.env.NEXT_PUBLIC_URL}/rapats?_limit=${limit}&_start=${start}&_sort=${sortby}&nama_contains=${search}`,
          cookies.token,
        ]
      : null
  );

  //get data total rapat untuk paginasi
  const { data: totalRapat } = useSWR(
    cookies.token
      ? [`${process.env.NEXT_PUBLIC_URL}/rapats/count`, cookies.token]
      : null
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
      <Flex flexDir={{ base: "column", sm: "column", md: "column", lg: "row" }}>
        <InputGroup size="md">
          <Input
            w={{ base: "100%", sm: "100%", md: "100%", lg: "40%" }}
            mb={5}
            placeholder="Pencarian . . ."
            value={search}
            onChange={handleSearch}
            borderRadius="lg"
            variant="filled"
          />
          <InputRightAddon>
            <FiSearch />
          </InputRightAddon>
        </InputGroup>
        <Spacer />
        <Flex w={{ base: "100%", sm: "100%", md: "100%", lg: "30%" }} mb={5}>
          <Select
            borderRadius="lg"
            size="md"
            variant="filled"
            onChange={handleSort}
            value={sortby}
          >
            <option value="created_at:ASC">Tgl. buat a-z</option>
            <option value="created_at:DESC">Tgl. buat z-a</option>
            <option value="jadwal_rapat:ASC">Tgl. jadwal a-z</option>
            <option value="jadwal_rapat:DESC">Tgl. jadwal z-a</option>
            <option value="nama:ASC">Nama rapat a-z</option>
            <option value="nama:DESC">Nama rapat z-a</option>
          </Select>
        </Flex>
      </Flex>
      <Box overflow="auto">
        {rapats ? (
          <Table>
            <Thead>
              <Tr>
                <Th>
                  <Text fontSize="sm">Nama</Text>
                </Th>
                <Th>
                  <Text fontSize="sm">Jadwal</Text>
                </Th>
                <Th>
                  <Text fontSize="sm">Pembuat</Text>
                </Th>
                <Th pl={10}>
                  <Text fontSize="sm">Aksi</Text>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {rapats.map((rapat) => (
                <Tr key={rapat.id}>
                  <Td>
                    <Text fontSize="sm">
                      <Link
                        color="blue.500"
                        onClick={() =>
                          router.push(`/dashboard/rapats/${rapat.slug_rapat}`)
                        }
                      >
                        {rapat.nama}
                      </Link>
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">
                      ⏲ {IsoToLocalTime(rapat.jadwal_rapat)} WIB
                    </Text>
                    <Text fontSize="sm">
                      📆 {IsoToLocalDate(rapat.jadwal_rapat)}
                    </Text>
                  </Td>

                  <Td>
                    <Text fontSize="sm">{rapat.user.nama}</Text>
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
              color="#FD6F96"
              size="xl"
            />
          </Center>
        )}
      </Box>
      <Box my={5}>
        <Flex>
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
              isDisabled={page == lastPage}
            />
          </ButtonGroup>
        </Flex>
      </Box>
    </>
  );
};

export default TabelRapat;
