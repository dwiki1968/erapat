import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import useSWR from "swr";
import * as Yup from "yup";
import { IsoToLocalDate, IsoToLocalTime, namaCase } from "../../utils/utils";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import FormikInput from "../ui/formik/FormikInput";
import FormikSelect from "../ui/formik/FormikSelect";
import Success from "./Success";
import TandaTangan from "./TandaTangan";

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
  // const [isExternal, setIsExternal] = useState(false);
  //get data unit kerja untuk field unit kerja
  const { data: unitKerja, error: errUnit } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/units`
  );

  if (errUnit) {
    alert("terjadi eror data unit kerja");
  }

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/rapats?slug_rapat=${rapatId}`
  );

  const [jenis, setJenis] = useState("in");
  const [successSubmit, setSuccessSubmit] = useState(false);
  const [resData, setResData] = useState();

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
          <PuffLoader color="#95DAC1" />
        </Center>
      </>
    );
  }

  if (!data.length) {
    return (
      <>
        <Text>Maaf Data Kosong </Text>
      </>
    );
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
    let data = { rapat: id, ...values, ...ttdUrl };
    data["nama_peserta"] = namaCase(data.nama_peserta); //merubah input nama menjadi capitalize each word

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/rekap-presensis`,
        { ...data }
      );

      setResData(response.data);
      setLoadingSubmit(false);
      setSuccessSubmit(true);
    } catch (error) {
      setLoadingSubmit(false);
      setErrorSubmit(true);
      alert("err: ", error);
    }
  };

  return (
    <>
      <ColorModeContainer light="gray.50" dark="gray.800">
        <Container maxW={"5xl"} minHeight="100vh" p={5}>
          <Navbar />
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
                <Heading fontSize="2xl">Presensi {nama}</Heading>
                <Text fontSize="sm">
                  {IsoToLocalDate(jadwal_rapat)} | Pukul{" "}
                  {IsoToLocalTime(jadwal_rapat)} WIB - Selesai
                </Text>
              </Box>
            </ColorModeContainer>
            <Spacer />

            <Box>
              {successSubmit ? (
                <Success
                  setSuccessSubmit={setSuccessSubmit}
                  nama={nama}
                  resData={resData}
                />
              ) : (
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

                            <Box m={5} />
                            <RadioGroup
                              onChange={setJenis}
                              value={jenis}
                              my={2}
                            >
                              <Stack direction="row">
                                <Radio mr={3} value="in">
                                  <Text fontWeight="semibold">
                                    Internal PPATK
                                  </Text>
                                </Radio>
                                <Radio value="eks">
                                  <Text fontWeight="semibold">
                                    Eksternal PPATK
                                  </Text>
                                </Radio>
                              </Stack>
                            </RadioGroup>

                            {jenis === "in" ? (
                              <FormikSelect
                                placeholder="Pilih Unit Kerja"
                                type="text"
                                label="Unit Kerja"
                                name="unit_kerja"
                                variant="filled"
                                maxW="500px"
                              >
                                {unitKerja &&
                                  unitKerja.map((unit) => (
                                    <option key={unit.id} value={unit.nama}>
                                      {unit.nama}
                                    </option>
                                  ))}
                              </FormikSelect>
                            ) : (
                              <FormikInput
                                type="text"
                                label="Instansi"
                                name="unit_kerja"
                                variant="filled"
                                maxW="500px"
                                placeholder="contoh: Kementerian X / PT X"
                              />
                            )}

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
                </ColorModeContainer>
              )}
            </Box>
          </Flex>
          <Footer />
        </Container>
      </ColorModeContainer>
    </>
  );
};

export default FormPresensi;
