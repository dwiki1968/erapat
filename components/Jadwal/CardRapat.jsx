import {
  Box,
  Flex,
  Heading,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { IsoToLocalDate, IsoToLocalTime } from "../../utils/utils";

const ColorModeContainer = ({ children }) => {
  return (
    <Box
      my={3}
      w="full"
      mx="auto"
      p={3}
      bg={useColorModeValue("gray.50", "gray.700")}
      borderRadius="xl"
      _hover={{
        shadow: "md",
      }}
    >
      {children}
    </Box>
  );
};

const CardRapat = ({ data }) => {
  const router = useRouter();
  return (
    <>
      {data.map((rapat) => {
        const { nama, jadwal_rapat, slug_rapat, unit } = rapat;
        const { id } = rapat;
        return (
          <ColorModeContainer key={id}>
            <Heading as="h4" size="sm">
              {nama}
            </Heading>

            <Box>
              <Flex
                mt={1}
                flexDir={{ base: "column", sm: "row", md: "row", lg: "row" }}
              >
                <Text fontSize="sm" mr={5}>
                  📆 {IsoToLocalDate(jadwal_rapat)}
                </Text>

                <Text fontSize="sm" mr={5}>
                  ⏲ {IsoToLocalTime(jadwal_rapat)} WIB
                </Text>
                <Text fontSize="sm" mr={5}>
                  📍 {unit}
                </Text>

                <Link
                  fontSize="sm"
                  mr={4}
                  onClick={() => {
                    router.push(`/presensi/${slug_rapat}`);
                  }}
                  color="blue.400"
                >
                  👨‍💼 Link Presensi
                </Link>
              </Flex>
            </Box>
          </ColorModeContainer>
        );
      })}
    </>
  );
};

export default CardRapat;
