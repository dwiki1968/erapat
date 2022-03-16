import {
  Box,
  chakra,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import useSWR from "swr";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  const { data: appConst, error: errAppConst } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/app-const`
  );

  if (errAppConst) {
    console.log("terjadi error :", errAppConst);
  }
  return (
    <>
      <Box m={10} />
      <Box
        mb={3}
        marginTop="auto"
        bg={useColorModeValue("gray.50", "gray.800")}
        color={useColorModeValue("gray.700", "gray.200")}
        borderRadius="xl"
      >
        <Box
          as={Stack}
          p={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Heading size="sm">
            📝 {appConst && appConst.data.attributes.app_name}
          </Heading>
          <Text align="center" fontSize="sm">
            © {new Date().getFullYear()} Pusat Pelaporan dan Analisis Transaksi
            Keuangan
          </Text>
          <Text as="i" fontWeight="semibold" fontSize="xs" color="red.300">
            Indonesia Tanpa Korupsi
          </Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton label={"Twitter"} href={"https://twitter.com/PPATK"}>
              <FaTwitter />
            </SocialButton>
            <SocialButton
              label={"YouTube"}
              href={"https://www.youtube.com/c/PPATKIndonesia"}
            >
              <FaYoutube />
            </SocialButton>
            <SocialButton
              label={"Instagram"}
              href={"https://www.instagram.com/ppatk_indonesia/"}
            >
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
