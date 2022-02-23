import { Box, Button, Center, Flex, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import qs from "qs";
import { useState } from "react";
import { FiEdit, FiSave } from "react-icons/fi";
import PuffLoader from "react-spinners/PuffLoader";
import useSWR from "swr";
import * as Yup from "yup";
import { IsoToForm } from "../../utils/utils";
import FormikInput from "../ui/formik/FormikInput";
import FormikSelect from "../ui/formik/FormikSelect";
import FormikTextArea from "../ui/formik/FormikTextArea";

const IdentitasRapat = () => {
  const cookies = parseCookies(); //cookies.token

  const router = useRouter();
  const slug = router.query.slug;

  const toast = useToast();
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: unitKerja, error: errUnit } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/units`
  );

  if (errUnit) {
    alert("terjadi eror data unit kerja");
  }

  const { data, error } = useSWR(
    slug && cookies.token
      ? [
          `${process.env.NEXT_PUBLIC_URL}/rapats?${qs.stringify(
            {
              filters: {
                slug_rapat: {
                  $eq: slug,
                },
              },
            },
            {
              encodeValuesOnly: true,
            }
          )}`,
          cookies.token,
        ]
      : null
  );

  if (error) {
    console.log("err", error);
  }

  //handel untuk loading
  if (!data) {
    return (
      <>
        <Center p={10}>
          <PuffLoader color="red.300" />
        </Center>
      </>
    );
  }

  if (!data.data.length) {
    return (
      <>
        <Center minH="100vh">
          <Text color="red.500" fontStyle="italic">
            Opps, data tidak ditemukan
          </Text>
        </Center>
      </>
    );
  }

  //jika ada data maka dijalankann baris dibaawah

  const dataRapat = data.data[0];
  const { nama, jadwal_rapat, pimpinan, tempat, agenda_rapat, jenis, unit } =
    dataRapat.attributes;

  const id = dataRapat.id;
  //merubah format iso datettime dari strapi agar bisa dicosume form
  const stringJadwal = IsoToForm(jadwal_rapat);

  const initialValues = {
    nama,
    jadwal_rapat: stringJadwal,
    pimpinan,
    tempat,
    agenda_rapat,
    unit,
    jenis,
  };

  //yup validasi
  const validationSchema = Yup.object({
    nama: Yup.string().required("Required"),
    jadwal_rapat: Yup.string().required("Required"),
    pimpinan: Yup.string().required("Required"),
    tempat: Yup.string().required("Required"),
    agenda_rapat: Yup.string().required("Required"),
    unit: Yup.string().required("Required"),
    jenis: Yup.string().required("Required"),
  });

  //handelsubmit form edit / put
  const onSubmit = async (values) => {
    setLoading(true);

    //membuat slug rapat
    //post data ke server
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/rapats/${id}`,
        {
          data: {
            ...values,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      console.log("res: ", response);
      setEditable(false);
      setLoading(false);
      toast({
        title: "Selamat!",
        description: "Data berhasil diubah 🎉",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      router.push(`/dashboard/rapats/${slug}`);
    } catch (error) {
      console.log("err put req: ", error);
      setEditable(false);
      setLoading(false);
      toast({
        title: "Sayang sekali!",
        description: "Maaf terjadi kesalahan 😱",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
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
                <Flex>
                  {editable ? (
                    <Button
                      borderRadius="xl"
                      leftIcon={<FiEdit />}
                      variant="solid"
                      size="md"
                      colorScheme="red"
                      onClick={() => setEditable(false)}
                    >
                      Batal
                    </Button>
                  ) : (
                    <Button
                      borderRadius="xl"
                      leftIcon={<FiEdit />}
                      variant="solid"
                      size="md"
                      colorScheme="blue"
                      onClick={() => setEditable(true)}
                    >
                      Ubah
                    </Button>
                  )}

                  <Box mx={3} />
                  <Button
                    borderRadius="xl"
                    leftIcon={<FiSave />}
                    type="submit"
                    disabled={!formik.isValid || !editable}
                    variant="solid"
                    size="md"
                    colorScheme="green"
                    isLoading={loading}
                  >
                    Simpan
                  </Button>
                </Flex>

                {/* form input data  */}
                <FormikInput
                  isDisabled={!editable}
                  type="text"
                  label="Nama Rapat"
                  name="nama"
                  variant="filled"
                />

                <FormikSelect
                  isDisabled={!editable}
                  // placeholder="Pilih Unit Kerja"
                  type="text"
                  label="Unit Kerja"
                  name="unit"
                  variant="filled"
                  maxW="350px"
                >
                  <option value={unit}>{unit}</option>

                  {unitKerja &&
                    unitKerja.data.map((unit) => (
                      <option key={unit.id} value={unit.attributes.nama}>
                        {unit.attributes.nama}
                      </option>
                    ))}
                </FormikSelect>

                <FormikInput
                  isDisabled={!editable}
                  type="text"
                  label="Agenda Rapat"
                  name="agenda_rapat"
                  variant="filled"
                />

                <FormikInput
                  maxW="250px"
                  isDisabled={!editable}
                  type="datetime-local"
                  label="Jadwal Rapat"
                  name="jadwal_rapat"
                  variant="filled"
                />

                <FormikInput
                  maxW="350px"
                  isDisabled={!editable}
                  type="text"
                  label="Pimpinan"
                  name="pimpinan"
                  variant="filled"
                />

                <FormikSelect
                  isDisabled={!editable}
                  // placeholder="Pilih Unit Kerja"
                  type="text"
                  label="Jenis Rapat"
                  name="jenis"
                  variant="filled"
                  maxW="150px"
                >
                  <option value="offline">offline</option>
                  <option value="online">online</option>
                </FormikSelect>

                <FormikTextArea
                  maxW="500px"
                  isDisabled={!editable}
                  type="text"
                  label="Lokasi/ Zoom"
                  name="tempat"
                  variant="filled"
                />
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default IdentitasRapat;
