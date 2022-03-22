import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Button,
  Center,
  Flex,
  List,
  ListItem,
  Text,
  Heading,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { parseCookies } from "nookies";
import { FiDelete, FiUploadCloud } from "react-icons/fi";
import { maksKarakter } from "../../../utils/utils";

function UploadBahan(props) {
  const toast = useToast();
  const cookies = parseCookies();
  const { RapatId } = props;
  const [myFiles, setMyFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setMyFiles([...myFiles, ...acceptedFiles]);
    },
    [myFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 5242880,
  });

  const removeFile = (file) => () => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
  };

  const removeAll = () => {
    setMyFiles([]);
  };

  const files = myFiles.map((file) => (
    <ListItem key={file.path}>
      <Text fontSize="sm">
        {maksKarakter(file.path)} - {(file.size / 1000000).toFixed(2)} Mb
      </Text>
      {/* <Button size="xs" onClick={removeFile(file)}>
        Remove File
      </Button> */}
    </ListItem>
  ));

  const uploadFile = async () => {
    setIsLoading(true);
    const formData = new FormData();
    // formData.append("files", acceptedFiles[0]);
    formData.append("ref", "api::rapat.rapat");
    formData.append("field", "file_bahan");
    formData.append("refId", RapatId);
    myFiles.forEach((file) => formData.append(`files`, file, file.name));
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookies.erapat_token}`,
          },
        }
      );
      // console.log("res: ", response);
      setIsLoading(false);
      removeAll();
      toast({
        title: "Selamat!",
        description: "Berhasil teruplod 🎉",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.log("err: ", error);
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
      <Box>
        <Box
          cursor="pointer"
          bg="gray.50"
          borderWidth="2px"
          borderColor="gray.200"
          minH="90px"
          borderStyle="dashed"
          padding={5}
          borderRadius="xl"
          {...getRootProps({ className: "dropzone" })}
        >
          <input {...getInputProps()} />
          <Text color="gray.400" fontSize="sm">
            Seret file ke sini, atau klik untuk memilih file (maks 5 mb)
          </Text>

          <List>{files}</List>
        </Box>

        <Flex mt={3}>
          <Button
            mr={5}
            borderRadius="xl"
            colorScheme="green"
            isDisabled={!myFiles.length}
            onClick={uploadFile}
            size="sm"
            isLoading={isLoading}
            rightIcon={<FiUploadCloud />}
          >
            Unggah
          </Button>

          {files.length > 0 && (
            <Button
              size="sm"
              rightIcon={<FiDelete />}
              colorScheme="red"
              onClick={removeAll}
              borderRadius="xl"
            >
              Batal
            </Button>
          )}
        </Flex>
      </Box>
    </>
  );
}

export default UploadBahan;
