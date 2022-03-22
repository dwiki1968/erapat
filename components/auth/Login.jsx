import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Button,
  chakra,
  CloseButton,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { useState } from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import useSWR from "swr";
import * as Yup from "yup";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const router = useRouter();
  const toast = useToast();

  const { data: appConst, error: errAppConst } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/app-const`
  );

  if (errAppConst) {
    console.log("terjadi error :", errAppConst);
  }

  const [fail, setFail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  //auth req to backend and logic if success or not
  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/auth/local`,
        {
          identifier: values.username,
          password: values.password,
        }
      );
      setCookie(null, "erapat_token", response.data.jwt, {
        maxAge: 2 * 60 * 60, //2 hours token expired
        path: "/",
      });
      setLoading(false);
      toast({
        title: "Selamat!",
        description: "Berhasil masuk ke aplikasi",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      router.replace("/dashboard");
    } catch (error) {
      setLoading(false);
      setFail(true);
      console.log("err : ", error);
    }
  };

  return (
    <>
      <Flex flexDir="column" height="100vh">
        <Flex
          flex="1"
          flexDirection="column"
          width="100wh"
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            w="100%"
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar bg="gray.400" />
            <Heading> {appConst && appConst.data.attributes.app_name}</Heading>
            <Box m={5} />
            {fail && (
              <Box w={{ base: "90%", md: "468px" }} m={2} borderRadius="xl">
                <Alert status="error" borderRadius="lg">
                  <AlertIcon />
                  <AlertTitle mr={2}>Login Gagal!</AlertTitle>
                  <AlertDescription>
                    Mohon periksa kembali username dan password anda.
                  </AlertDescription>
                  <CloseButton
                    position="absolute"
                    right="8px"
                    top="8px"
                    onClick={() => setFail(false)}
                  />
                </Alert>
              </Box>
            )}
            <Box w={{ base: "90%", md: "468px" }}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formik) => {
                  return (
                    <Form>
                      <Stack
                        spacing={4}
                        p="2rem"
                        borderRadius="xl"
                        borderWidth={2}
                      >
                        {/* username field  */}
                        <Field name="username">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors["username"] &&
                                form.touched["username"]
                              }
                            >
                              <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                  <CFaUserAlt color="gray.300" />
                                </InputLeftElement>
                                <Input
                                  {...field}
                                  type="text"
                                  placeholder="Username"
                                  id="username"
                                />
                              </InputGroup>
                              <FormErrorMessage>
                                {form.errors["username"]}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        {/* password field  */}
                        <Field name="password">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors["password"] &&
                                form.touched["password"]
                              }
                            >
                              <InputGroup>
                                <InputLeftElement
                                  pointerEvents="none"
                                  color="gray.300"
                                >
                                  <CFaLock color="gray.300" />
                                </InputLeftElement>
                                <Input
                                  {...field}
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Password"
                                  id="password"
                                />
                                <InputRightElement width="4.5rem">
                                  <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={handleShowClick}
                                  >
                                    {showPassword ? "Hide" : "Show"}
                                  </Button>
                                </InputRightElement>
                              </InputGroup>
                              <FormErrorMessage>
                                {form.errors["password"]}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        <Button
                          disabled={!formik.isValid}
                          type="submit"
                          variant="solid"
                          colorScheme="red"
                          bg="red.400"
                          width="full"
                          onClick={() => setFail(false)}
                          isLoading={loading}
                          _hover={{ bg: "red.400" }}
                          borderRadius="xl"
                        >
                          Masuk
                        </Button>
                      </Stack>
                    </Form>
                  );
                }}
              </Formik>
            </Box>
          </Stack>

          <VStack m={3} spacing={2}>
            <Text>
              Kembali ke{" "}
              <Button
                color="red.400"
                variant="link"
                onClick={() => router.push("/")}
              >
                beranda
              </Button>
            </Text>
            <Text>
              Belum mempunyai akun?{" "}
              <Button color="red.400" variant="link">
                {/* {appConst && console.log(appConst)} */}
                <Link
                  href={
                    appConst
                      ? `https://wa.me/${appConst.data.attributes.contact_person_number}?text=request+akun+aplikasi+e-rapat%2C+atas+nama....+email....+username....`
                      : "https://wa.me/6289606757971?text=request+akun+aplikasi+e-rapat%2C+atas+nama....+email....+username...."
                  }
                  isExternal
                >
                  klik disini
                </Link>
              </Button>
            </Text>
          </VStack>
        </Flex>
      </Flex>
    </>
  );
};

export default Login;
