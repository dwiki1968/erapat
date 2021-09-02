import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

import { FiUsers, FiDownloadCloud } from "react-icons/fi";

const DokumenTabel = ({ idRapat, slug }) => {
  const router = useRouter();

  return (
    <>
      <Flex flexDir={{ base: "column", sm: "column", md: "row" }}>
        <Button
          m={1}
          colorScheme="cyan"
          variant="outline"
          size="sm"
          rightIcon={<FiUsers />}
          onClick={() => router.push(`/dashboard/rekap-presensi/${slug}`)}
        >
          Presensi
        </Button>
        <Button
          m={1}
          colorScheme="cyan"
          variant="outline"
          size="sm"
          rightIcon={<FiDownloadCloud />}
          onClick={() => router.push(`/dashboard/${idRapat}/rekap`)}
        >
          Risalah
        </Button>
      </Flex>
    </>
  );
};

export default DokumenTabel;
