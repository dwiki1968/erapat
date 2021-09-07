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

export default function UploadRisalah({ RapatId }) {
  const { acceptedFiles, getRootProps, open, getInputProps } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
  });

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
    formData.append("files", acceptedFiles[0]);
    formData.append("ref", "Rapat");
    formData.append("field", "file_risalah");
    formData.append("refId", RapatId);
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
        minH="50px"
        borderStyle="dashed"
        {...getRootProps({ className: "dropzone" })}
      >
        <Center minH="50px">
          <input {...getInputProps()} />
          <Box>
            <Text fontSize="sm">
              Tarik /{" "}
              <Button
                onClick={open}
                variant="link"
                size="sm"
                colorScheme="green"
                fontWeight="bold"
              >
                pilih
              </Button>{" "}
              berkas risalah disini 📂
            </Text>
            <List color="gray.400">{files}</List>
          </Box>
        </Center>
      </Box>
      <Button
        mt={2}
        w="100%"
        colorScheme="green"
        isDisabled={!acceptedFiles.length}
        onClick={uploadFile}
        size="sm"
      >
        Unggah Risalah
      </Button>
    </>
  );
}
