import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Link,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";

import ColorModeToggle from "../ui/ColorModeToggle";
import heroImg from "../../public/heroimg.png";
import { FiLogIn } from "react-icons/fi";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Flex pt={5} mb={5} alignItems="center">
        <Heading size="md">📝 E-Rapat</Heading>
        <Spacer />
        <Button
          variant="ghost"
          mr={2}
          onClick={() => router.push("/user/login")}
        >
          Login
        </Button>
        <ColorModeToggle />
      </Flex>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 10, md: 18 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 3, md: 5 }}>
          <Heading
            lineHeight={1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "red.400",
                zIndex: -1,
              }}
            >
              Aplikasi Rapat
            </Text>
            <br />
            <Text as={"span"} color={"red.400"}>
              Pusat TI
            </Text>
          </Heading>
          <Text fontSize="md" color={"gray.500"}>
            Selamat datang! aplikasi ini dibuat untuk mengintegrasikan data
            rapat pada unit kerja Pusat Teknologi Informasi PPATK.
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              onClick={() => router.push("/user/login")}
              // rounded={"full"}
              borderRadius="lg"
              size={"md"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"red"}
              bg={"red.400"}
              _hover={{ bg: "red.400" }}
            >
              Buat Rapat
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Box
            position={"relative"}
            // height={"260px"}
            width={"full"}
            overflow={"hidden"}
          >
            <Image
              alt={"Hero Image"}
              // fit={"cover"}
              // align={"center"}
              // w={"100%"}
              // h={"100%"}
              src={heroImg}
            />
          </Box>
        </Flex>
      </Stack>
    </>
  );
}

// "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
