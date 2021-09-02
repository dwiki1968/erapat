import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { BsPeopleFill } from "react-icons/bs";
import { FaCalendarCheck, FaMapMarkerAlt, FaVideo } from "react-icons/fa";

const CardRapat = ({ data }) => {
  return (
    <Box
      my={3}
      w="full"
      mx="auto"
      p={3}
      bg={useColorModeValue("gray.100", "gray.700")}
      //   shadow="md"
      rounded="md"
    >
      <Heading as="h4" size="md" color={useColorModeValue("gray.800", "white")}>
        {/* {data.namaRapat} */}
        Rapat Pelaksanaan Anggaran
      </Heading>

      <Box>
        <Flex
          mt={1}
          flexDir={{ base: "column", sm: "row", md: "row", lg: "row" }}
        >
          <Text fontSize="sm" mr={3}>
            {/* {data.jadwal} */}
            📆 20-09-2021
          </Text>

          <Text fontSize="sm" mr={3}>
            {/* {data.jadwal} */}⏲ 08.00 WIB
          </Text>
          {false ? (
            <Text fontSize="sm" mr={3}>
              {/* {data.lokasi}  */} 📍 Ruang rapat
            </Text>
          ) : (
            <Link
              mr={3}
              fontSize="sm"
              href="https://chakra-ui.com"
              isExternal
              color="teal.400"
            >
              🔗 Link Zoom
            </Link>
          )}
          <Text fontSize="sm" mr={3}>
            {/* {data.peserta} */}
            👨‍💼 Semua pegawai pti
          </Text>
          <Link
            fontSize="sm"
            mr={2}
            href="https://chakra-ui.com"
            isExternal
            color="blue.400"
          >
            🔎 Detail...
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};

export default CardRapat;
