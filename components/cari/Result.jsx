import { Box, Text } from "@chakra-ui/layout";
import { IconButton, Input, InputGroup } from "@chakra-ui/react";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import useSWR from "swr";
import CardRapat from "./CardRapat";

const Field = () => {
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  console.log(search);

  return (
    <div>
      <InputGroup size="md">
        <Input
          w={{ base: "100%", sm: "100%", md: "100%", lg: "40%" }}
          mb={5}
          placeholder="Masukkan nama anda disini..."
          value={search}
          onChange={handleSearch}
          borderRadius="lg"
          variant="filled"
        />

        <IconButton
          ml={5}
          type="submit"
          colorScheme="green"
          icon={<FiSearch />}
        />
      </InputGroup>
    </div>
  );
};

const Result = () => {
  const { data: rapats, error } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/rekap-presensis?nama_peserta_contains=alfian`
  );
  console.log(rapats);

  if (error) {
    console.log(error);
    return (
      <Box>
        <Text>Maaf Terjadi kesalahan</Text>
      </Box>
    );
  }

  return (
    <>
      {/* <Field /> */}
      <CardRapat data={rapats} />
    </>
  );
};

export default Result;
