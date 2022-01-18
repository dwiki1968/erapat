import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import heroImg from "../../public/heroimg.png";
import Navbar from "../layout/Navbar";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <Stack
        mt="30px"
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 10, md: 18 }}
        direction={{ base: "column-reverse", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 3, md: 5 }}>
          <Heading
            lineHeight={1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text as={"span"} position={"relative"}>
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
              borderRadius="xl"
              size={"lg"}
              fontWeight={"semibold"}
              px={6}
              colorScheme={"red"}
              bg={"red.400"}
              _hover={{ bg: "red.400" }}
            >
              Buat Rapat
            </Button>
            <Button
              onClick={() => router.push("/jadwal")}
              borderRadius="xl"
              size={"lg"}
              fontWeight={"semibold"}
              px={6}
              colorScheme={"gray"}
              _hover={{ bg: "gray.400" }}
            >
              Jadwal
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
          <Box position={"relative"} width={"full"} overflow={"hidden"}>
            <Image
              alt={"Hero Image"}
              src={heroImg}
              placeholder="blur"
              width={460}
              height={292}
            />
          </Box>
        </Flex>
      </Stack>
    </>
  );
}
