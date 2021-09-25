import { Button } from "@chakra-ui/button";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { FiChevronLeft } from "react-icons/fi";

const BackButton = () => {
  const router = useRouter();
  return (
    <>
      <Button
        mb={5}
        leftIcon={<FiChevronLeft />}
        onClick={() => router.back()}
        colorScheme="gray"
        variant="link"
      >
        Kembali
      </Button>
    </>
  );
};

export default BackButton;
