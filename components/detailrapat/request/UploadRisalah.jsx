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

function UploadRisalah(props) {
  const cookies = parseCookies();
  const { RapatId } = props;
  const toast = useToast();
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
        {file.path} - {file.size} bytes{" "}
      </Text>
      {/* <Button size="xs" onClick={removeFile(file)}>
        Remove File
      </Button> */}
    </ListItem>
  ));

  const uploadFile = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("files", myFiles[0]);
    formData.append("ref", "Rapat");
    formData.append("field", "file_risalah");
    formData.append("refId", RapatId);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      console.log("res: ", response);
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
      <Flex>
        <Box
          cursor="pointer"
          bg="gray.50"
          borderRadius="lg"
          borderWidth="2px"
          borderColor="gray.200"
          minH="70px"
          borderStyle="dashed"
          padding={5}
          {...getRootProps({ className: "dropzone" })}
        >
          <input {...getInputProps()} />
          <Text color="gray.400" fontSize="sm">
            Drag n drop some files here, or click to select files
          </Text>

          <List>{files}</List>
        </Box>
        <Flex ml={2}>
          <Button
            mr={2}
            colorScheme="green"
            isDisabled={!myFiles.length}
            onClick={uploadFile}
            size="sm"
            isLoading={isLoading}
          >
            Unggah Risalah
          </Button>

          {files.length > 0 && (
            <Button size="sm" colorScheme="red" onClick={removeAll}>
              Remove{" "}
            </Button>
          )}
        </Flex>
      </Flex>
    </>
  );
}

export default UploadRisalah;
