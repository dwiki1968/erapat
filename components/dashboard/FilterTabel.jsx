import { Flex, IconButton, Input, Select, Spacer } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const FilterTabel = () => {
  return (
    <Flex flexDir={{ base: "column", sm: "column", md: "row" }}>
      <Flex w={{ base: "100%", sm: "100%", md: "50%" }} mb={5}>
        <Select placeholder="Kategori" size="sm" variant="filled" w="40%">
          <option value="option1">Nama</option>
          <option value="option2">Jadwal</option>
        </Select>
        <Spacer mx={2} />
        <Input size="sm" placeholder="Keyword" variant="filled" />
        <Spacer mx={2} />
        <IconButton
          colorScheme="gray"
          aria-label="Search database"
          icon={<FaSearch />}
          size="sm"
        />
      </Flex>
      <Spacer />
      <Flex w={{ base: "100%", sm: "100%", md: "30%" }} mb={5}>
        <Select placeholder="Urut Berdasarkan" size="sm" variant="filled">
          <option value="option1">Nama a-z</option>
          <option value="option1">Nama z-a</option>
          <option value="option1">Jadwal a-z</option>
          <option value="option1">Jadwal z-a</option>
        </Select>
      </Flex>
    </Flex>
  );
};

export default FilterTabel;
