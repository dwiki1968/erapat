import PuffLoader from "react-spinners/PuffLoader";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Spacer,
  Spinner,
  Text,
  Link,
  useColorModeValue,
  Stack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import * as Yup from "yup";
import ColorModeToggle from "../ui/ColorModeToggle";
import FormikInput from "../ui/formik/FormikInput";
import TandaTangan from "./TandaTangan";
import { IsoToLocalDate, IsoToLocalTime } from "../../utils/utils";
import { parseCookies } from "nookies";
import Footer from "../layout/Footer";

const ColorModeContainer = ({ children, light, dark, ...rest }) => {
  return (
    <>
      <Box {...rest} bg={useColorModeValue(light, dark)}>
        {children}
      </Box>
    </>
  );
};

const FormPresensi = () => {
  const router = useRouter();
  const rapatId = router.query.rapat;
  const cookies = parseCookies(); // cookies.token
  const [isExternal, setIsExternal] = useState(false);

  const { data, error } = useSWR(
    rapatId && cookies.token
      ? [
          `${process.env.NEXT_PUBLIC_URL}/rapats?slug_rapat=${rapatId}`,
          cookies.token,
        ]
      : null
  );
  const [successSubmit, setSuccessSubmit] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [ttdUrl, setTtdUrl] = useState({ signature_url: "" });

  //handle jika return get req eror
  if (error) {
    console.log("err", error);
  }
  //handel untuk loading
  if (!data) {
    return (
      <>
        <Center minHeight="100vh">
          <PuffLoader color="#FF6B7E" />
        </Center>
      </>
    );
  }

  if (!data.length) {
    return <>kosong</>;
  }

  //jika ada data maka dijalankann baris dibaawah
  const dataRapat = data[0];
  // console.log('identitas', dataRapat);
  const { id, nama, jadwal_rapat } = dataRapat;

  const initialValues = {
    nama_peserta: "",
    unit_kerja: "",
  };

  const validationSchema = Yup.object({
    nama_peserta: Yup.string().required("Mohon diisi terlebih dahulu 🙏"),
    unit_kerja: Yup.string().required("Mohon diisi terlebih dahulu 🙏"),
  });

  const getTtdUrl = (value) => {
    setTtdUrl({
      signature_url: value,
    });
  };

  //handel submit form presensi
  const onSubmit = async (values) => {
    setLoadingSubmit(true);
    let data = { rapat: [id], ...values, ...ttdUrl };
    console.log(data);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/rekap-presensis`,
        { ...data }
      );
      console.log("res: ", response);
      setLoadingSubmit(false);
      setSuccessSubmit(true);
    } catch (error) {
      setLoadingSubmit(false);
      setErrorSubmit(true);
      console.log("err: ", error);
    }
  };

  return (
    <>
      <ColorModeContainer light="gray.50" dark="gray.800">
        <Container maxW={"5xl"} minHeight="100vh" p={5}>
          <Flex mb={10}>
            <Link>
              <Heading onClick={() => router.push("/")} size="lg">
                📝 E-Rapat PTI
              </Heading>
            </Link>
            <Spacer />
            <ColorModeToggle />
          </Flex>
          <Flex flexDir={{ base: "column", sm: "column", md: "column" }}>
            <ColorModeContainer
              mt={10}
              w={{ xs: "100%", sm: "100%" }}
              p={{ base: 3, sm: 4, md: 5, lg: 10 }}
              borderRadius="lg"
              light="gray.100"
              dark="gray.700"
            >
              <Box>
                <Heading>{nama}</Heading>
                <Text>
                  {IsoToLocalDate(jadwal_rapat)} | Pukul{" "}
                  {IsoToLocalTime(jadwal_rapat)} WIB - Selesai
                </Text>
              </Box>
            </ColorModeContainer>
            <Spacer />
            <ColorModeContainer
              light="white"
              dark="gray.800"
              borderRadius="lg"
              mt={3}
              w={{ xs: "100%", sm: "100%" }}
              borderWidth="1px"
              // p={5}
              p={{ base: 3, sm: 4, md: 5, lg: 10 }}
            >
              <Box>
                {successSubmit ? (
                  <Alert
                    mt={5}
                    boxShadow="md"
                    p={5}
                    status="success"
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    borderRadius="lg"
                  >
                    <AlertIcon boxSize="40px" mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize="lg">
                      Presensi berhasil!
                    </AlertTitle>
                    <AlertDescription maxWidth="sm">
                      Terimakasih telah mengisi presensi kehadiran rapat {nama}
                    </AlertDescription>
                    <Button
                      mt={10}
                      colorScheme="green"
                      size="md"
                      onClick={() => setSuccessSubmit(false)}
                    >
                      Isi lagi
                    </Button>
                  </Alert>
                ) : (
                  <Box>
                    {/* formik */}
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={onSubmit}
                    >
                      {(formik) => {
                        return (
                          <Form>
                            <FormikInput
                              type="text"
                              label="Nama Lengkap"
                              name="nama_peserta"
                              variant="filled"
                              placeholder="contoh: John Doe"
                              maxWidth="500px"
                            />
                            {/* <Box m={5} />
                            <Text fontWeight="semibold" mb={1}>
                              Jenis Peserta
                            </Text>
                            <RadioGroup
                              value={isExternal}
                              onChange={setIsExternal}
                            >
                              <Flex>
                                <Radio mr={5} value={false}>
                                  Internal PPATK
                                </Radio>
                                <Radio value={true}>Eksternal</Radio>
                              </Flex>
                            </RadioGroup> */}

                            <Box m={5} />
                            <FormikInput
                              type="text"
                              label="Unit Kerja / Instansi"
                              name="unit_kerja"
                              variant="filled"
                              placeholder="contoh: Pusat Teknologi Informasi"
                            />
                            <Box m={5} />

                            <Text fontWeight="semibold" mb={2}>
                              Tanda Tangan
                            </Text>
                            <TandaTangan getTtdUrl={getTtdUrl} />
                            <Box m={5} />

                            <Button
                              type="submit"
                              disabled={
                                !formik.isValid || ttdUrl.signature_url == ""
                              }
                              colorScheme="green"
                              variant="solid"
                              size="md"
                              isLoading={loadingSubmit}
                            >
                              Submit
                            </Button>
                          </Form>
                        );
                      }}
                    </Formik>
                  </Box>
                )}
              </Box>
            </ColorModeContainer>
          </Flex>
          <Footer />
        </Container>
      </ColorModeContainer>
    </>
  );
};

export default FormPresensi;
