import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

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

export default Field;
