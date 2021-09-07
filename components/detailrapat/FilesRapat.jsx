import {
  Box,
  Heading,
  IconButton,
  Link,
  List,
  ListIcon,
  ListItem,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import {
  AiOutlineDelete,
  AiOutlineFilePdf,
  AiOutlineFilePpt,
} from "react-icons/ai";

const DeleteButton = ({ fileId }) => {
  const toast = useToast();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_URL}/upload/files/${fileId}`
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

const FilesRapat = (props) => {
  console.log(props);
  const { fileRisalah, fileBahan } = props;
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  return (
    <div>
      <Box bg="gray.50" borderRadius="lg" p={3}>
        <Heading mb={2} size="sm">
          Files
        </Heading>
        <List>
          {fileRisalah && (
            <ListItem>
              <ListIcon as={AiOutlineFilePdf} color="red.500" />
              <Link href={`${baseUrl}${fileRisalah.url}`}>
                {fileRisalah.name}
              </Link>
              <DeleteButton fileId={fileRisalah.id} />
            </ListItem>
          )}

          {fileBahan.map((data) => (
            <ListItem key={data.id}>
              <ListIcon as={AiOutlineFilePpt} color="orange.400" />
              <Link href={`${baseUrl}${data.url}`}>{data.name}</Link>
              <DeleteButton fileId={data.id} />
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default FilesRapat;
