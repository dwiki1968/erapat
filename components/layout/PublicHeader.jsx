import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import ColorModeToggle from "../ui/ColorModeToggle";

import Logo from "../ui/AppLogo";

const linkItems = [
  // { nama: "Jadwal", link: "/jadwal" },
  { nama: "Login", link: "/user/login" },
];

const NavLink = ({ children, link }) => {
  const router = useRouter();
  return (
    <Link
      onClick={() => router.push(link)}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      <Text fontSize="sm" fontWeight="semibold">
        {children}
      </Text>
    </Link>
  );
};

export default function PublicHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box borderBottomWidth="thin" mb={10}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"sm"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            mr={10}
          />
          <Box>
            <Logo />
          </Box>

          <HStack spacing={8}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
              alignItems="center"
            >
              {linkItems.map((linkItem, index) => (
                <NavLink link={linkItem.link} key={index}>
                  {linkItem.nama}
                </NavLink>
              ))}
            </HStack>
            <ColorModeToggle />
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {linkItems.map((linkItem, index) => (
                <NavLink link={linkItem.link} key={index}>
                  {linkItem.nama}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
