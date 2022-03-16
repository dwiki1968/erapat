import React from "react";
import { Box, Text, Link } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import useSWR from "swr";

export default function AppLogo(props) {
  const router = useRouter();

  const { data: appConst, error: errAppConst } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/app-const`
  );

  if (errAppConst) {
    console.log("terjadi error :", errAppConst);
  }

  return (
    <Box {...props}>
      <Link onClick={() => router.push("/")} _hover={{ color: "red" }}>
        <Text fontWeight="bold" fontSize="lg">
          📝 {appConst && appConst.data.attributes.app_name}
        </Text>
      </Link>
    </Box>
  );
}
