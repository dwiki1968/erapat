import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import useSWR from "swr";
import CardRapat from "./CardRapat";

const AllRapat = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortby, setSortby] = useState("jadwal_rapat:DESC");

  const handleSort = (e) => {
    setSortby(e.target.value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const start = (page - 1) * limit;

  // fetc data rapat untuk tabel
  const { data: rapats, error } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/rapats?_limit=${limit}&_start=${start}&_sort=${sortby}&nama_contains=${search}`
  );

  //get data total rapat untuk paginasi
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
      <CardRapat data={rapats} />
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
    </>
  );
};

export default AllRapat;
