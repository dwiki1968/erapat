import {
  Box,
  Heading,
  IconButton,
  Link,
  List,
  ListIcon,
  ListItem,
  useToast,
  Text,
  Flex,
  Icon,
} from "@chakra-ui/react";
import axios from "axios";
import { parseCookies } from "nookies";
import React from "react";
import {
  AiOutlineDelete,
  AiOutlineFilePdf,
  AiOutlineFilePpt,
} from "react-icons/ai";
import { FiDownload } from "react-icons/fi";

const DeleteButton = ({ fileId }) => {
  const cookies = parseCookies();

  const toast = useToast();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_URL}/upload/files/${fileId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      console.log("res: ", response);
      toast({
        title: "Selamat!",
        description: "Data berhasil dihapus 🎉",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log("err put req: ", error);
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
    <IconButton
      variant="link"
      colorScheme="red"
      icon={<AiOutlineDelete />}
      onClick={handleDelete}
    />
  );
};

const FileRisalah = (props) => {
  //   console.log(props);
  const { fileRisalah } = props;

  const baseUrl = process.env.NEXT_PUBLIC_URL;

  return (
    <>
      <Box bg="gray.50" borderRadius="lg" p={3} minH="70px">
        <List>
          {fileRisalah && (
            <ListItem>
              <Icon as={AiOutlineFilePdf} w={8} h={8} color="red.500" />

              <Flex>
                <Link
                  color="blue.400"
                  href={`${baseUrl}${fileRisalah.url}`}
                  isExternal
                >
                  {fileRisalah.name}
                </Link>
                {/* <IconButton icon={FiDownload} /> */}
                <DeleteButton fileId={fileRisalah.id} />
              </Flex>
            </ListItem>
          )}
        </List>
      </Box>
    </>
  );
};

export default FileRisalah;
