import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
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
  //   console.log("data card", data);
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
      <Alert
        borderRadius="xl"
        status="info"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Data Tidak Ditemukan
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Sayang sekali, data rapat yang anda ikuti tidak ditemukan.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      {data.map((rapat) => {
        if (rapat.rapat != null) {
          return (
            <ColorModeContainer key={rapat.id}>
              <Heading as="h4" size="md">
                {rapat.rapat.nama}
              </Heading>

              <Box>
                <Flex
                  mt={1}
                  flexDir={{ base: "column", sm: "row", md: "row", lg: "row" }}
                >
                  <Text fontSize="sm" mr={3}>
                    Agenda: {rapat.nama_peserta}
                  </Text>
                  <Text fontSize="sm" mr={3}>
                    Agenda: {rapat.rapat.agenda_rapat}
                  </Text>
                  <Text fontSize="sm" mr={3}>
                    📆 {IsoToLocalDate(rapat.rapat.jadwal_rapat)}
                  </Text>

                  <Text fontSize="sm" mr={3}>
                    ⏲ {IsoToLocalTime(rapat.rapat.jadwal_rapat)} WIB
                  </Text>

                  <Link
                    fontSize="sm"
                    mr={2}
                    onClick={() => {
                      router.push(`dashboard/rapats/${rapat.rapat.slug_rapat}`);
                    }}
                    isExternal
                    color="blue.400"
                  >
                    📝 File Risalah
                  </Link>
                </Flex>
              </Box>
            </ColorModeContainer>
          );
        }
      })}
    </>
  );
};

export default CardRapat;
