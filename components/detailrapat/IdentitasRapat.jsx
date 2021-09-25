import {
  Box,
  Button,
  Center,
  Flex,
  Spacer,
  useToast,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState } from "react";
import { FiEdit, FiSave } from "react-icons/fi";
import PuffLoader from "react-spinners/PuffLoader";
import slugify from "slugify";
import useSWR from "swr";
import * as Yup from "yup";
import { IsoToForm } from "../../utils/utils";
import FormikInput from "../ui/formik/FormikInput";
import FormikSelect from "../ui/formik/FormikSelect";
import FormikTextArea from "../ui/formik/FormikTextArea";

const IdentitasRapat = () => {
  const cookies = parseCookies(); //cookies.token

  const router = useRouter();
  const rapatId = router.query.rapat;
  // console.log("slugparams", rapatId);
  const toast = useToast();
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jenisState, setJenisState] = useState(null);

  const { data, error } = useSWR(
    rapatId && cookies.token
      ? [
          `${process.env.NEXT_PUBLIC_URL}/rapats?slug_rapat=${rapatId}`,
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
  const { id, nama, jadwal_rapat, pimpinan, tempat, agenda_rapat, jenis } =
    dataRapat;

  //merubah format iso datettime dari strapi agar bisa dicosume form
  const stringJadwal = IsoToForm(jadwal_rapat);

  const initialValues = {
    nama,
    jadwal_rapat: stringJadwal,
    pimpinan,
    tempat,
    agenda_rapat,
  };

  console.log("initialValues", initialValues);
  //yup validasi
  const validationSchema = Yup.object({
    nama: Yup.string().required("Required"),
    jadwal_rapat: Yup.string().required("Required"),
    pimpinan: Yup.string().required("Required"),
    tempat: Yup.string().required("Required"),
    agenda_rapat: Yup.string().required("Required"),
  });

  //handelsubmit form edit / put
  const onSubmit = async (values) => {
    setLoading(true);

    //membuat slug rapat
    const slug_rapat = slugify(values.nama, { lower: true });
    console.log("Form data values", values);
    //post data ke server
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/rapats/${id}`,
        {
          ...values,
          slug_rapat,
          jenis: jenisState,
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
      });
      router.push(`/dashboard/rapats/${slug_rapat}`);
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
                <FormikInput
                  isDisabled={!editable}
                  type="text"
                  label="Agenda Rapat"
                  name="agenda_rapat"
                  variant="filled"
                />

                <Box w={{ base: "100%", sm: "100%", md: "50%" }}>
                  <FormikInput
                    isDisabled={!editable}
                    type="datetime-local"
                    label="Jadwal Rapat"
                    name="jadwal_rapat"
                    variant="filled"
                  />
                </Box>
                <FormikInput
                  isDisabled={!editable}
                  type="text"
                  label="Pimpinan"
                  name="pimpinan"
                  variant="filled"
                />

                <RadioGroup
                  value={jenisState ? jenisState : jenis}
                  onChange={setJenisState}
                  my={2}
                  disabled={!editable}
                >
                  <Stack direction="row">
                    <Radio value="offline" isDisabled={!editable}>
                      Offline
                    </Radio>
                    <Radio value="online" isDisabled={!editable}>
                      Online
                    </Radio>
                  </Stack>
                </RadioGroup>

                <Box w={{ base: "100%", sm: "100%", md: "65%" }}>
                  <FormikTextArea
                    isDisabled={!editable}
                    type="text"
                    label="Lokasi/ Zoom"
                    name="tempat"
                    variant="filled"
                  />
                </Box>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default IdentitasRapat;
