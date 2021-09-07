import {
  Box,
  Button,
  Center,
  Flex,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useDropzone } from "react-dropzone";

export default function UploadBahan({ RapatId }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <ListItem key={file.name}>
      <Text fontSize="sm">
        ✔ {file.name} - {Math.floor(file.size / 1000)} kb
      </Text>
    </ListItem>
  ));
  // console.log("file", acceptedFiles[0].name);

  const uploadFile = async () => {
    const formData = new FormData();
    // formData.append("files", acceptedFiles[0]);
    formData.append("ref", "Rapat");
    formData.append("field", "file_bahan");
    formData.append("refId", RapatId);
    acceptedFiles.forEach((file) => formData.append(`files`, file, file.name));
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/upload`,
        formData
      );
      console.log("res: ", response);
    } catch (error) {
      console.log("err: ", error);
    }
  };

  return (
    <>
      <Box
        bg="gray.50"
        borderRadius="lg"
        borderWidth="2px"
        borderColor="gray.200"
        minH="70px"
        borderStyle="dashed"
        {...getRootProps({ className: "dropzone" })}
      >
        <Center minH="70px">
          <input {...getInputProps()} />
          <Box>
            <Text fontSize="sm">Tarik berkas bahan rapat kesini 📂</Text>
            <List color="gray.400">{files}</List>
          </Box>
        </Center>
      </Box>

      <Button
        w="100%"
        mt={2}
        size="sm"
        isDisabled={!acceptedFiles.length}
        colorScheme="green"
        onClick={uploadFile}
      >
        Unggah Bahan Rapat
      </Button>
    </>
  );
}
