import { Button } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Flex, Heading, Spacer } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React from "react";
import ColorModeToggle from "../ui/ColorModeToggle";

const Navbar = () => {
  const router = useRouter();

  return (
    <>
      <Flex py={3} mb={5} alignItems="center" borderBottomWidth="thin">
        <Button
          borderRadius="xl"
          variant="link"
          fontWeight="bold"
          textColor={useColorModeValue("gray.700", "gray.200")}
          mr={2}
          onClick={() => router.push("/")}
        >
          📝 E-Rapat
        </Button>
        <Spacer />
        <Button
          borderRadius="xl"
          variant="ghost"
          mr={2}
          onClick={() => router.push("/user/login")}
        >
          Login
        </Button>
        <ColorModeToggle />
      </Flex>
    </>
  );
};

export default Navbar;
