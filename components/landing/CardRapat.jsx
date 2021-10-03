import {
  Alert,
  AlertIcon,
  Box,
  Center,
  Flex,
  Heading,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BeatLoader } from "react-spinners";
import { IsoToLocalDate, IsoToLocalTime } from "../../utils/utils";

const ColorModeContainer = ({ children }) => {
  return (
    <Box
      my={5}
      w="full"
      mx="auto"
      p={5}
      bg={useColorModeValue("gray.100", "gray.700")}
      rounded="md"
      _hover={{ boxShadow: "lg" }}
    >
      {children}
    </Box>
  );
};

const CardRapat = ({ data }) => {
  const router = useRouter();
  // console.log("data card", data);
  // const { nama, agenda, jadwal_rapat, slug_rapat, tempat } = data;
  if (!data) {
    return (
      <>
        <Center minH="200px">
          <BeatLoader size={10} color="#FF6B7E" />
        </Center>
      </>
    );
  }

  if (data.length === 0) {
    return (
      <Alert status="info" borderRadius="lg" mt={5} p={5}>
        <AlertIcon />
        <Text>Semua rapat telah selesai / belum ada rapat baru</Text>
      </Alert>
    );
  }

  return (
    <>
      {data.map((rapat) => (
        <ColorModeContainer key={rapat.id}>
          <Heading as="h4" size="md">
            {rapat.nama}
          </Heading>

          <Box>
            <Flex
              mt={1}
              flexDir={{ base: "column", sm: "row", md: "row", lg: "row" }}
            >
              <Text fontSize="sm" mr={3}>
                Agenda: {rapat.agenda_rapat}
              </Text>
              <Text fontSize="sm" mr={3}>
                📆 {IsoToLocalDate(rapat.jadwal_rapat)}
              </Text>

              <Text fontSize="sm" mr={3}>
                ⏲ {IsoToLocalTime(rapat.jadwal_rapat)} WIB
              </Text>

              <Link
                fontSize="sm"
                mr={2}
                onClick={() => {
                  router.push(`/presensi/${rapat.slug_rapat}`);
                }}
                color="blue.400"
              >
                👨‍💼 Link Presensi
              </Link>
              <Link
                fontSize="sm"
                mr={2}
                onClick={() => {
                  router.push(`dashboard/rapats/${rapat.slug_rapat}`);
                }}
                isExternal
                color="blue.400"
              >
                📝 File Risalah
              </Link>
            </Flex>
          </Box>
        </ColorModeContainer>
      ))}
    </>
  );
};

export default CardRapat;
