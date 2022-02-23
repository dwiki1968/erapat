import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { FiEdit, FiKey, FiSave, FiX } from "react-icons/fi";
import useSWR from "swr";
import * as Yup from "yup";
import ConfirmDialog from "../ui/ConfirmDialog";
import FormikInput from "../ui/formik/FormikInput";

export default function User() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const cookies = parseCookies(); // cookies.token
  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { data, error } = useSWR(
    cookies.token
      ? [`${process.env.NEXT_PUBLIC_URL}/users/me`, cookies.token]
      : null
  );

  if (error) {
    console.log(error);
  }

  if (!data) {
    return (
      <>
        <Center py={20}>
          <Spinner
            thickness="5px"
            speed="0.45s"
            emptyColor="gray.200"
            color="red.500"
            size="xl"
          />
        </Center>
      </>
    );
  }

  const initialValues = {
    nama: data.nama,
    username: data.username,
    email: data.email,
  };

  const validationSchema = Yup.object({
    nama: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
  });

  // handle untuk post request untuk reset password
  const handleResetPwd = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/auth/forgot-password`,
        {
          email: data.email,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      console.log("res: ", response);
      setIsLoading(false);
      setIsOpen(false);

      toast({
        title: "Berhasil.",
        description: `berhasil ! mohon cek email anda  ${data.email}`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log("err: ", error);
      setIsLoading(false);
      setIsOpen(false);

      toast({
        title: "Error.",
        description: "Opss, sepertinya terjadi kesalahan",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  //untuk update data user email, nama, dan username
  const onSubmit = async (values) => {
    setIsLoading(true);

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/users/${data.id}`,
        {
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      setIsEdit(false);
      setIsLoading(false);
      toast({
        title: "Selamat!",
        description: "Data berhasil diubah 🎉",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      router.push(`/dashboard/pengaturan`);
    } catch (error) {
      console.log("err put req: ", error);
      setIsEdit(false);
      setIsLoading(false);
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
      <ConfirmDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleAksi={handleResetPwd}
        title="Reset Password"
      />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <Flex>
                {isEdit ? (
                  <Button
                    borderRadius="xl"
                    leftIcon={<FiX />}
                    variant="solid"
                    size="md"
                    colorScheme="red"
                    onClick={() => setIsEdit(false)}
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
                    onClick={() => setIsEdit(true)}
                  >
                    Ubah
                  </Button>
                )}

                <Box mx={3} />
                <Button
                  borderRadius="xl"
                  leftIcon={<FiSave />}
                  type="submit"
                  disabled={!formik.isValid || !isEdit}
                  variant="solid"
                  size="md"
                  colorScheme="green"
                  isLoading={isLoading}
                >
                  Simpan
                </Button>
              </Flex>
              <FormikInput
                isDisabled={!isEdit}
                type="text"
                label="Nama"
                name="nama"
                variant="filled"
              />
              <FormikInput
                isDisabled={!isEdit}
                type="text"
                label="Username"
                name="username"
                variant="filled"
              />
              <FormikInput
                isDisabled={!isEdit}
                type="email"
                label="Email"
                name="email"
                variant="filled"
              />
            </Form>
          );
        }}
      </Formik>
      <Divider my={5} />
      <Flex>
        <Button
          mr={5}
          leftIcon={<FiKey />}
          isLoading={isLoading}
          onClick={() => setIsOpen(true)}
          variant="solid"
          size="md"
          colorScheme="green"
          borderRadius="xl"
        >
          Reset Password
        </Button>
        {isLoading && (
          <Text fontSize="xs" fontStyle="italic">
            Mohon ditunggu sesaat ....
          </Text>
        )}
      </Flex>
    </>
  );
}
