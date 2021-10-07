import React from "react";
import { Field } from "formik";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";

function FormikSelect(props) {
  const { label, name, children, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]} my={3}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Select id={name} placeholder="Pilih" {...rest} {...field}>
            {children}
          </Select>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}

export default FormikSelect;
