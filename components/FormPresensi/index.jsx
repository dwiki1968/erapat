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
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import PuffLoader from "react-spinners/PuffLoader";
import useSWR from "swr";
import * as Yup from "yup";
import { IsoToLocalDate, IsoToLocalTime, namaCase } from "../../utils/utils";
import PublicContainer from "../container/PublicContainer";

import Footer from "../layout/Footer";
import HeaderApp from "../layout/PublicHeader";
import FormikInput from "../ui/formik/FormikInput";
import FormikSelect from "../ui/formik/FormikSelect";
import Success from "./Success";
import TandaTangan from "./TandaTangan";

const ColorModeContainer = ({ children, light, dark, ...rest }) => {
  return (
    <>
      <Box borderRadius="xl" {...rest} bg={useColorModeValue(light, dark)}>
        {children}
      </Box>
    </>
  );
};

const FormPresensi = () => {
  const router = useRouter();
  const slug = router.query.slug;

  //get data unit kerja untuk field unit kerja
  const { data: unitKerja, error: errUnit } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/units`
  );

  if (errUnit) {
    console.log("terjadi eror data unit kerja : ", errUnit);
  }

  const { data, error } = useSWR(
    slug ? `${process.env.NEXT_PUBLIC_URL}/api/rapats/public/${slug}` : null
  );

  const [jenis, setJenis] = useState("in");
  const [successSubmit, setSuccessSubmit] = useState(false);
  const [resData, setResData] = useState();

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [ttdUrl, setTtdUrl] = useState({ signature_url: "" });

  //handle jika return get req eror
  if (error) {
    return (
      <Center minH="100vh">
        <VStack>
          <Text color="red.500" fontStyle="italic">
            Opss data tidak ditemukan...
          </Text>
          <Button
            size="sm"
            colorScheme="green"
            onClick={() => {
              router.push("/");
            }}
          >
            {" "}
            Kembali ke beranda
          </Button>
        </VStack>
      </Center>
    );
  }

  //handel untuk loading
  if (!data) {
    return (
      <>
        <Center minHeight="100vh">
          <PuffLoader color="red.300" />
        </Center>
      </>
    );
  }

  //jika ada data maka dijalankann baris dibaawah

  const { id, nama, jadwal_rapat } = data;

  const initialValues = {
    nama_peserta: "",
    unit_kerja: "",
  };

  const validationSchema = Yup.object({
    nama_peserta: Yup.string().required("required"),
    unit_kerja: Yup.string().required("required"),
  });

  const getTtdUrl = (value) => {
    setTtdUrl({
      signature_url: value,
    });
  };

  //handel submit form presensi
  const onSubmit = async (values) => {
    setLoadingSubmit(true);
    let data = { slug_rapat: slug, ...values, ...ttdUrl };
    data["nama_peserta"] = namaCase(data.nama_peserta); //merubah input nama menjadi capitalize each word

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/presensis`,
        { data: { ...data } }
      );
      console.log("res", response);
      setResData(response.data.data.attributes);
      setLoadingSubmit(false);
      setSuccessSubmit(true);
    } catch (error) {
      setLoadingSubmit(false);
      setErrorSubmit(true);
      console.log(error.message);
    }
  };

  return (
    <>
      <ColorModeContainer>
        <PublicContainer>
          <HeaderApp />
          <Flex flexDir={{ base: "column", sm: "column", md: "column" }}>
            <ColorModeContainer
              w={{ xs: "100%", sm: "100%" }}
              p={{ base: 3, sm: 4, md: 5, lg: 10 }}
              borderRadius="xl"
              light="blue.50"
              dark="blue.700"
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
                  namaRapat={nama}
                  resData={resData}
                />
              ) : (
                <ColorModeContainer
                  light="white"
                  dark="gray.800"
                  borderRadius="xl"
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
                                  unitKerja.data.map((unit) => (
                                    <option
                                      key={unit.id}
                                      value={unit.attributes.nama}
                                    >
                                      {unit.attributes.nama}
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
                              colorScheme="blue"
                              variant="solid"
                              size="md"
                              isLoading={loadingSubmit}
                              borderRadius="xl"
                              rightIcon={<FiSend />}
                            >
                              Kirim
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
        </PublicContainer>
      </ColorModeContainer>
    </>
  );
};

export default FormPresensi;
