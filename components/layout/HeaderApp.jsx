import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiLogIn, FiMenu, FiX } from "react-icons/fi";
import { namaCase } from "../../utils/utils";
import ColorModeToggle from "../ui/ColorModeToggle";

const Links = ["jadwal", "cari"];

const NavLink = ({ children }) => {
  const router = useRouter();
  return (
    <Link
      onClick={() => router.push(`/${children}`)}
      style={{ textDecoration: "none" }}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      <Text fontWeight="semibold" fontSize="sm" color="gray.500">
        {namaCase(children)}
      </Text>
    </Link>
  );
};

export default function HeaderApp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <>
      <Box>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          borderBottomWidth="thin"
        >
          <IconButton
            icon={isOpen ? <FiX /> : <FiMenu />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            borderRadius="xl"
            variant="ghost"
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
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
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Button
              colorScheme="green"
              borderRadius="xl"
              variant="solid"
              size="xs"
              mr={2}
              onClick={() => router.push("/user/login")}
            >
              Masuk
            </Button>
            <ColorModeToggle />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box p={2} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
