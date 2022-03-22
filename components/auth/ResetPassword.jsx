import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
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
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { FiKey } from "react-icons/fi";
import * as Yup from "yup";

const CFaLock = chakra(FaLock);

const ResetPassword = () => {
  const router = useRouter();
  const resetToken = router.query.resetToken;
  const toast = useToast();

  // console.log("token", resetToken);

  const [isFail, setFail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const initialValues = {
    password: "",
    konfirmasi: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string().required("Password is required"),
    konfirmasi: Yup.string()
      .required("Konfirmasi is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  //auth req to backend and logic if success or not
  const onSubmit = async (values) => {
    setLoading(true);
    console.log("val", values);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/auth/reset-password`,
        {
          code: resetToken,
          password: values.password,
          passwordConfirmation: values.konfirmasi,
        }
      );
      console.log(response);
      setLoading(false);
      toast({
        title: "Selamat!",
        description: "Berhasil merubah password, silahkan login kembali",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      router.replace("/user/login");
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
            {/* <Avatar bg="gray.400" /> */}
            <FiKey size="2rem" />
            <Heading fontFamily="heading">Password Reset</Heading>
            <Box m={5} />
            {isFail && (
              <Box w={{ base: "90%", md: "468px" }} m={2} borderRadius="xl">
                <Alert status="error" borderRadius="lg">
                  <AlertIcon />
                  <AlertTitle mr={2}>Reset password gagal</AlertTitle>
                  <AlertDescription>
                    Mohon coba lagi beberapa saat kemudian
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
                                <InputRightElement width="4.5rem"></InputRightElement>
                              </InputGroup>
                              <FormErrorMessage>
                                {form.errors["password"]}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        {/* konfirmasi field  */}
                        <Field name="konfirmasi">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors["konfirmasi"] &&
                                form.touched["konfirmasi"]
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
                                  placeholder="Konfirmasi"
                                  id="konfirmasi"
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
                                {form.errors["konfirmasi"]}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Button
                          disabled={!formik.isValid}
                          borderRadius="xl"
                          type="submit"
                          variant="solid"
                          colorScheme="blue"
                          bg="blue.400"
                          width="full"
                          onClick={() => setFail(false)}
                          isLoading={loading}
                          _hover={{ bg: "blue.400" }}
                        >
                          Reset
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
                color="blue.400"
                variant="link"
                onClick={() => router.push("/")}
              >
                beranda
              </Button>
            </Text>
          </VStack>
        </Flex>
      </Flex>
    </>
  );
};

export default ResetPassword;
