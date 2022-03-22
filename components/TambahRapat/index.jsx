import {
  Button,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiSave } from "react-icons/fi";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import FormikInput from "../ui/formik/FormikInput";
import FormikSelect from "../ui/formik/FormikSelect";
import FormikTextArea from "../ui/formik/FormikTextArea";

const TambahRapat = ({ jwtToken }) => {
  //mengambil id user dari jwt
  const decode = jwt_decode(jwtToken); //id --> id user
  const toast = useToast();

  //get data unit kerja untuk field unit kerja
  const { data: unitKerja, error: errUnit } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/units`
  );

  if (errUnit) {
    console.log("terjadi eror data unit kerja");
  }

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [jenis, setJenis] = useState("offline");

  const initialValues = {
    nama: "",
    jadwal_rapat: "",
    pimpinan: "-",
    tempat: "",
    agenda_rapat: "",
    unit: "",
  };

  const validationSchema = Yup.object({
    nama: Yup.string().required("Required"),
    jadwal_rapat: Yup.string().required("Required"),
    pimpinan: Yup.string().required("Required"),
    tempat: Yup.string().required("Required"),
    agenda_rapat: Yup.string().required("Required"),
    unit: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    const slug_rapat = uuidv4();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/rapats`,
        {
          data: {
            ...values,
            slug_rapat,
            jenis: jenis,
            pembuat: `${decode.id}`,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setLoading(false);
      toast({
        title: "Selamat!",
        description: "Data berhasil ditambahkan 🎉",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      router.push(
        `/dashboard/rapats/${response.data.data.attributes.slug_rapat}`
      );
    } catch (error) {
      setLoading(false);
      toast({
        title: "Sayang sekali!",
        description: "Maaf terjadi kesalahan 😱",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });

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

                <FormikSelect
                  placeholder="Pilih Unit Kerja"
                  type="text"
                  label="Unit Kerja"
                  name="unit"
                  variant="filled"
                  maxW="500px"
                >
                  {unitKerja &&
                    unitKerja.data.map((unit) => (
                      <option key={unit.id} value={unit.attributes.nama}>
                        {unit.attributes.nama}
                      </option>
                    ))}
                </FormikSelect>

                <FormikInput
                  placeholder="contoh: Membahas Penyusunan TOR dan RAB TA 2022"
                  type="text"
                  label="Agenda Rapat"
                  name="agenda_rapat"
                  variant="filled"
                />

                <FormikInput
                  type="datetime-local"
                  label="Jadwal Rapat "
                  name="jadwal_rapat"
                  variant="filled"
                  maxW="340px"
                />

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
                  maxW="500px"
                />

                {/* perlu di tingkatkan dengan menggunakan formik pada radio buttton */}
                <RadioGroup onChange={setJenis} value={jenis} my={2}>
                  <Stack direction="row">
                    <Radio value="offline">Offline</Radio>
                    <Radio value="online">Online</Radio>
                  </Stack>
                </RadioGroup>

                {jenis === "online" ? (
                  <FormikTextArea
                    type="text"
                    label="Lokasi/ Zoom"
                    name="tempat"
                    variant="filled"
                    placeholder={`contoh: \nTautan: https://s.id/bimtek-ppk \nId meeting: 823 8451 3638; Passcode: 878080`}
                    maxW="500px"
                  />
                ) : (
                  <FormikInput
                    type="text"
                    label="Lokasi/ Zoom"
                    name="tempat"
                    variant="filled"
                    placeholder="contoh: Ruang rapat lantai 5 PTI"
                    maxW="500px"
                  />
                )}

                <Flex mb={30} mt={5}>
                  <Button
                    leftIcon={<FiSave />}
                    type="submit"
                    disabled={!formik.isValid}
                    variant="solid"
                    size="md"
                    colorScheme="green"
                    borderRadius="xl"
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

export default TambahRapat;
