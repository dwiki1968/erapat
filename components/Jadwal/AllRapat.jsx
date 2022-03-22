const qs = require("qs");
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";
import CardRapat from "./CardRapat";

const AllRapat = () => {
  const [page, setPage] = useState(1);

  //query api endpoint
  const query = qs.stringify(
    {
      fields: ["nama", "jadwal_rapat", "slug_rapat"],
      pagination: {
        page: page,
        pageSize: 10,
      },
      sort: ["jadwal_rapat:desc"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const { data: rapats, error } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/rapats?${query}`
  );

  if (!rapats) {
    return (
      <>
        <Center minH="200px">
          <BeatLoader size={10} color="#FF6B7E" />
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

  const { pageCount, pageSize, total } = rapats.meta.pagination;
  const { data } = rapats;

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
          Belum Ada Rapat Lagi
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Pada saat ini semua rapat sudah dilaksanakan.
        </AlertDescription>
      </Alert>
    );
  }
  // console.log(rapats.data);
  // console.log(rapats.meta.pagination);

  return (
    <>
      <CardRapat data={data} />

      <Flex my={5}>
        <ButtonGroup size="md" variant="outline" isAttached>
          <IconButton
            icon={<FiArrowLeft />}
            isDisabled={page == 1}
            onClick={() => setPage(page - 1)}
          />

          <Button>Page : {page}</Button>

          <IconButton
            onClick={() => setPage(page + 1)}
            icon={<FiArrowRight />}
            isDisabled={page == pageCount}
          />
        </ButtonGroup>
      </Flex>
    </>
  );
};

export default AllRapat;
