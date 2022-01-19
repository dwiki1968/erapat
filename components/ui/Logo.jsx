import React from "react";
import { Box, Text, Link } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";

export default function Logo(props) {
  const router = useRouter();
  return (
    <Box maxW="100px" {...props}>
      <Link onClick={() => router.push("/")} _hover={{ color: "red" }}>
        <Text fontWeight="bold" fontSize="lg">
          📝 e-rapat
        </Text>
      </Link>
    </Box>
  );
}
