import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";
import CardRapat from "./CardRapat";

const Upcoming = () => {
  const { data: rapats, error } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/rapats/upcoming`
  );

  if (!rapats) {
    return (
      <>
        <Center minH="200px">
          <BeatLoader size={10} color="red.500" />
        </Center>
      </>
    );
  }

  if (error) {
    return (
      <Box>
        <Text color="red" fontStyle="italic">
          Maaf Terjadi kesalahan
        </Text>
      </Box>
    );
  }

  if (rapats.length === 0) {
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
          Belum Ada Rapat Lagi
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Pada saat ini semua rapat sudah dilaksanakan.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <CardRapat data={rapats} />
      <Box mb={10} />
    </>
  );
};

export default Upcoming;
