import {
  Box,
  Heading,
  IconButton,
  Link,
  List,
  ListIcon,
  ListItem,
  useToast,
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

const FileBahan = (props) => {
  console.log("bahan", props);
  const { fileBahan } = props;
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  return (
    <div>
      <Box bg="gray.50" borderRadius="lg" p={3}>
        <List>
          <Icon as={AiOutlineFilePpt} w={8} h={8} color="orange.400" />

          {fileBahan.map((data) => (
            <ListItem key={data.id}>
              <Flex>
                <Link color="blue.400" href={`${baseUrl}${data.url}`}>
                  {data.name}
                </Link>
                <DeleteButton fileId={data.id} />
              </Flex>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default FileBahan;
