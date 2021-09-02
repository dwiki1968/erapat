import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiSave } from "react-icons/fi";
import slugify from "slugify";
import * as Yup from "yup";
import FormikInput from "../ui/formik/FormikInput";
import FormikSelect from "../ui/formik/FormikSelect";
import FormikTextArea from "../ui/formik/FormikTextArea";

const FormTambah = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const initialValues = {
    nama: "",
    jadwal_rapat: "",
    pimpinan: "",
    jenis: "",
    tempat: "",
    agenda_rapat: "",
  };

  const validationSchema = Yup.object({
    nama: Yup.string().required("Required"),
    jadwal_rapat: Yup.string().required("Required"),
    pimpinan: Yup.string().required("Required"),
    jenis: Yup.string().required("Required"),
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
                  type="text"
                  label="Nama Rapat"
                  name="nama"
                  variant="filled"
                />
                <FormikInput
                  type="text"
                  label="Agenda Rapat"
                  name="agenda_rapat"
                  variant="filled"
                />
                <FormikInput
                  type="datetime-local"
                  label="Jadwal Rapat"
                  name="jadwal_rapat"
                  variant="filled"
                />
                <FormikInput
                  type="text"
                  label="Pimpinan"
                  name="pimpinan"
                  variant="filled"
                />

                <Flex flexDir={{ base: "column", sm: "column", md: "row" }}>
                  <Box w={{ base: "100%", sm: "100%", md: "30%" }}>
                    <FormikSelect
                      type="text"
                      label="Jenis"
                      name="jenis"
                      variant="filled"
                    >
                      <option value="offline">Offline</option>
                      <option value="online">Online</option>
                    </FormikSelect>
                  </Box>
                  <Spacer />

                  <Box w={{ base: "100%", sm: "100%", md: "65%" }}>
                    <FormikInput
                      type="text"
                      label="Lokasi/ Zoom"
                      name="tempat"
                      variant="filled"
                    />
                  </Box>
                </Flex>

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
