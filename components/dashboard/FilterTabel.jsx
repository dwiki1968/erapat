import { Flex, IconButton, Input, Select, Spacer } from "@chakra-ui/react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const FilterTabel = () => {
  const [searchParams, setSearchParams] = useState({});

  return (
    <Flex flexDir={{ base: "column", sm: "column", md: "row" }}>
      <Flex w={{ base: "100%", sm: "100%", md: "50%" }} mb={5}>
        <Input size="md" placeholder="Keyword" variant="filled" />
        <Spacer mx={2} />
        <IconButton
          colorScheme="gray"
          aria-label="Search database"
          icon={<FaSearch />}
          size="md"
        />
      </Flex>
    </Flex>
  );
};

export default FilterTabel;
