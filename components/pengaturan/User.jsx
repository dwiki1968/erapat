import { Button, Divider } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { parseCookies } from "nookies";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import useSWR from "swr";
import * as Yup from "yup";
import FormikInput from "../ui/formik/FormikInput";

export default function User() {
  const cookies = parseCookies(); // cookies.token

  const { data, error } = useSWR(
    cookies.token
      ? [`${process.env.NEXT_PUBLIC_URL}/users/me`, cookies.token]
      : null
  );

  if (error) {
    console.log(error);
  }

  if (!data) {
    return <> loading...</>;
  }

  console.log(data);

  const initialValues = {
    nama: data.nama,
    username: data.username,
    password: "kerdil1234",
  };

  const validationSchema = Yup.object({
    nama: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });
  const onSubmit = async (values) => {
    console.log("Form data", values);
    // try {
    //   const response = await axios.post(
    //     `${process.env.NEXT_PUBLIC_URL}/rapats`,
    //     {
    //       ...values,
    //       slug_rapat: slugify(values.nama, { lower: true }),
    //     }
    //   );
    //   console.log("res: ", response);
    // } catch (error) {
    //   console.log("err: ", error);
    // }
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
              <FormikInput
                type="text"
                label="Nama"
                name="nama"
                variant="filled"
              />
              <Divider my={5} />
              <FormikInput
                type="text"
                label="Username"
                name="username"
                variant="filled"
              />

              <FormikInput
                type="password"
                label="Password"
                name="password"
                variant="filled"
              />

              <Button
                mt={5}
                leftIcon={<FaRegEdit />}
                type="submit"
                disabled={!formik.isValid}
                variant="solid"
                size="md"
                colorScheme="cyan"
              >
                Ubah
              </Button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
