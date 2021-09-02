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
  useColorModeValue,
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

const FormPresensi = () => {
  const router = useRouter();
  const rapatId = router.query.rapat;
  const { data, error } = useSWR(
    rapatId
      ? `${process.env.NEXT_PUBLIC_URL}/rapats?slug_rapat=${rapatId}`
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
    nama_peserta: Yup.string().required("Mohon diisi 😅"),
    unit_kerja: Yup.string().required("Mohon diisi 😅"),
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
      <Box>
        <Container maxW={"5xl"} minHeight="100vh" p={10}>
          <Flex>
            <Heading size="lg">📝 E-Rapat PTI</Heading>
            <Spacer />
            <ColorModeToggle />
          </Flex>

          <Flex flexDir={{ base: "column", sm: "column", md: "column" }}>
            <Box mt={10} w={{ xs: "100%", sm: "100%" }}>
              <Heading>{nama}</Heading>
              <Text>
                {IsoToLocalDate(jadwal_rapat)} | Pukul{" "}
                {IsoToLocalTime(jadwal_rapat)} WIB - Selesai
              </Text>
            </Box>
            <Spacer />
            {successSubmit ? (
              <Alert
                mt={5}
                boxShadow="md"
                p={10}
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
              <Box
                w={{ xs: "100%", sm: "100%" }}
                mt={5}
                boxShadow="md"
                borderRadius="lg"
                p={10}
              >
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
                        />
                        <Box m={2} />

                        <FormikInput
                          type="text"
                          label="Unit Kerja"
                          name="unit_kerja"
                          variant="filled"
                        />
                        <Box m={2} />

                        <Text fontWeight="semibold" mb={2}>
                          Tanda Tangan
                        </Text>
                        <TandaTangan getTtdUrl={getTtdUrl} />
                        <Box m={2} />

                        <Button
                          type="submit"
                          disabled={
                            !formik.isValid || ttdUrl.signature_url == ""
                          }
                          colorScheme="green"
                          variant="solid"
                          size="md"
                          isLoading={loadingSubmit}
                          borderColor="gray.800"
                        >
                          Submit
                        </Button>
                      </Form>
                    );
                  }}
                </Formik>
              </Box>
            )}
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default FormPresensi;
