import {
  Box,
  chakra,
  Container,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

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
  return (
    <Box
      mt="50px"
      bg={useColorModeValue("gray.50", "gray.600")}
      color={useColorModeValue("gray.700", "gray.200")}
      borderRadius="lg"
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Heading size="sm">📝 E-Rapat</Heading>
        <Text fontSize="sm">
          © 2021 Aktualisasi Latsar Dwiki Krisna | PPATK
        </Text>
        <Text as="i" fontWeight="semibold" fontSize="sm" color="red.300">
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
      </Container>
    </Box>
  );
}
