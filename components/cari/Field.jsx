import { Box, Text } from "@chakra-ui/layout";
import { IconButton, Input, InputGroup } from "@chakra-ui/react";
import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import useSWR from "swr";
import CardRapat from "./CardRapat";

const Result = ({ params }) => {
  const { data: rapats, error } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/rekap-presensis?nama_peserta_contains=${params}`
  );

  if (error) {
    console.log(error);
    return (
      <Box>
        <Text>Maaf Terjadi kesalahan</Text>
      </Box>
    );
  }
  // console.log("get data", rapats);
  return (
    <>
      {/* <Field /> */}
      <CardRapat data={rapats} />
    </>
  );
};

const Field = () => {
  const [search, setSearch] = useState("");
  const [params, setParams] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    setParams(search);
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
          borderRadius="xl"
          ml={5}
          type="submit"
          colorScheme="green"
          icon={<FiSearch />}
          onClick={handleSubmit}
        />
        {params == "" ? null : (
          <IconButton
            ml={5}
            borderRadius="xl"
            colorScheme="red"
            icon={<FiX />}
            onClick={() => {
              setSearch("");
            }}
          />
        )}
      </InputGroup>
      {params == "" ? null : <Result params={params} />}
    </div>
  );
};

export default Field;
