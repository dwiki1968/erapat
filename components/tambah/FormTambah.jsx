import {
  Box,
  Button,
  Flex,
  Spacer,
  Stack,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiSave } from "react-icons/fi";
import slugify from "slugify";
import * as Yup from "yup";
import FormikInput from "../ui/formik/FormikInput";
import FormikTextArea from "../ui/formik/FormikTextArea";
import jwt_decode from "jwt-decode";

const FormTambah = ({ token }) => {
  //mengambil id user dari jwt
  const decode = jwt_decode(token); //id --> id user
  // console.log("decode", decode);

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [jenis, setJenis] = useState("offline");

  const initialValues = {
    nama: "",
    jadwal_rapat: "",
    pimpinan: "-",
    tempat: "",
    agenda_rapat: "",
  };

  const validationSchema = Yup.object({
    nama: Yup.string().required("Required"),
    jadwal_rapat: Yup.string().required("Required"),
    pimpinan: Yup.string().required("Required"),
    tempat: Yup.string().required("Required"),
    agenda_rapat: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    const slug_rapat = slugify(values.nama, { lower: true });
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/rapats`,
        {
          ...values,
          slug_rapat,
          jenis: jenis,
          user: decode.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("res: ", response);
      setLoading(false);
      router.push(`/dashboard/rapats/${slug_rapat}`);
    } catch (error) {
      setLoading(false);
      alert("maaf terjadi kesalahan");

      console.log("err: ", error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <Flex flexDir="column">
                <FormikInput
                  placeholder="contoh: Rapat Perencanaan Anggaran Pusat TI"
                  type="text"
                  label="Nama Rapat"
                  name="nama"
                  variant="filled"
                />
                <FormikInput
                  placeholder="contoh: Membahas Penyusunan TOR dan RAB TA 2022"
                  type="text"
                  label="Agenda Rapat"
                  name="agenda_rapat"
                  variant="filled"
                />

                <Box w={{ base: "100%", sm: "100%", md: "30%" }}>
                  <FormikInput
                    type="datetime-local"
                    label="Jadwal Rapat "
                    name="jadwal_rapat"
                    variant="filled"
                  />
                </Box>
                <Box w={{ base: "100%", sm: "100%", md: "65%" }}>
                  <FormikInput
                    type="text"
                    label="Pimpinan"
                    keterangan={
                      <Text fontSize="sm" fontStyle="italic">
                        *Optional
                      </Text>
                    }
                    name="pimpinan"
                    variant="filled"
                  />
                </Box>

                <RadioGroup onChange={setJenis} value={jenis} my={2}>
                  <Stack direction="row">
                    <Radio value="offline">Offline</Radio>
                    <Radio value="online">Online</Radio>
                  </Stack>
                </RadioGroup>

                {jenis === "online" ? (
                  <Box w={{ base: "100%", sm: "100%", md: "65%" }}>
                    <FormikTextArea
                      type="text"
                      label="Lokasi/ Zoom"
                      name="tempat"
                      variant="filled"
                      placeholder="contoh: 
                      tautan: https://s.id/bimtek-ppk
                    Id meeting: 823 8451 3638; Passcode: 878080"
                    />
                  </Box>
                ) : (
                  <Box w={{ base: "100%", sm: "100%", md: "65%" }}>
                    <FormikInput
                      type="text"
                      label="Lokasi/ Zoom"
                      name="tempat"
                      variant="filled"
                      placeholder="contoh: Ruang rapat lantai 5 PTI"
                    />
                  </Box>
                )}

                <Flex mb={30} mt={5}>
                  <Button
                    leftIcon={<FiSave />}
                    type="submit"
                    disabled={!formik.isValid}
                    variant="solid"
                    size="md"
                    colorScheme="green"
                    isLoading={loading}
                  >
                    Submit
                  </Button>
                </Flex>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default FormTambah;
