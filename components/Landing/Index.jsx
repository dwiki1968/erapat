import {
  Box,
  Button,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import heroImg from "../../public/heroimg.png";

export default function Landing() {
  const router = useRouter();
  const { data: appConst, error: errAppConst } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/app-const`
  );

  if (errAppConst) {
    console.log("terjadi error :", errAppConst);
  }
  return (
    <>
      <Stack
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
              {appConst && appConst.data.attributes.app_name}
            </Text>
            {/* <Text as={"span"} color={"red.400"}>
            {appConst && appConst.data.attributes.app_name}
            </Text> */}
          </Heading>
          <Text fontSize="md" color={"gray.500"}>
            {appConst && appConst.data.attributes.app_desc}
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              onClick={() => router.push("/user/login")}
              borderRadius="xl"
              size={"md"}
              fontWeight={"semibold"}
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
