import {
  Flex,
  IconButton,
  Link,
  List,
  ListItem,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import DialogKonfirmasi from "../../ui/DialogKonfirmasi";

const DeleteButton = ({ fileId }) => {
  const cookies = parseCookies();
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);

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
      // console.log("res: ", response);
      toast({
        title: "Selamat!",
        description: "Data berhasil dihapus 🎉",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      setIsOpen(false);
    } catch (error) {
      console.log("err put req: ", error);
      toast({
        title: "Sayang sekali!",
        description: "Maaf terjadi kesalahan 😱",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      <DialogKonfirmasi
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleAksi={handleDelete}
        title="Hapus File Bahan"
      />
      <IconButton
        variant="link"
        colorScheme="red"
        icon={<AiOutlineDelete />}
        onClick={() => setIsOpen(true)}
      />
    </>
  );
};

const FileBahan = (props) => {
  const { fileBahan } = props;
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  return (
    <div>
      <List>
        {fileBahan.map((data) => (
          <ListItem key={data.id}>
            <Flex>
              <Link color="blue.400" href={data.url}>
                {data.name}
              </Link>
              <DeleteButton fileId={data.id} />
            </Flex>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default FileBahan;
