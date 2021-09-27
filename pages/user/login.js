import {
  Avatar,
  Box,
  Button,
  chakra,
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
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";

import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import * as Yup from "yup";
import ColorModeToggle from "../../components/ui/ColorModeToggle";
import nookies, { parseCookies, setCookie, destroyCookie } from "nookies";
import { FiLogIn } from "react-icons/fi";
import MetaPage from "../../components/layout/MetaPage";

export async function getServerSideProps(ctx) {
  // Parse
  const cookies = nookies.get(ctx);
  // console.log("kuki", cookies);

  if (cookies.token) {
    return {
      redirect: {
        destination: "/dashboard/",
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const router = useRouter();

  const [fail, setFail] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  // formhandle

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    // console.log("Form data", values);
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/auth/local`,
        {
          identifier: values.username,
          password: values.password,
        }
      );
      // console.log("res: ", response);
      setCookie(null, "token", response.data.jwt, {
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });

      setLoading(false);
      router.replace("/dashboard");
    } catch (error) {
      setLoading(false);
      setFail(true);
      console.log("err: ", error);
    }
  };

  return (
    <>
      <MetaPage titlePage="Login ke Aplikasi" />
      <Flex flexDir="column" backgroundColor="gray.50" height="100vh">
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
            <Heading color="gray.900">Aplikasi Rapat PTI</Heading>
            {fail && (
              <Box w={{ base: "90%", md: "468px" }} m={2} borderRadius="lg">
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
              {/* Formik */}
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {/* form */}

                {(formik) => {
                  return (
                    <Form>
                      <Stack
                        spacing={4}
                        p="2rem"
                        borderRadius="xl"
                        backgroundColor="whiteAlpha.900"
                        boxShadow="md"
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
                          width="full"
                          onClick={() => setFail(false)}
                          isLoading={loading}
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
          <Box>
            Kembali ke{" "}
            <Button
              color="red.300"
              variant="link"
              onClick={() => router.push("/")}
            >
              Beranda
            </Button>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Login;
