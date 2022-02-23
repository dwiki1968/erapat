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
import { maksKarakter } from "../../../utils/utils";
import DialogKonfirmasi from "../../ui/ConfirmDialog";

const DeleteButton = ({ fileId }) => {
  const cookies = parseCookies();
  const [isOpen, setIsOpen] = useState(false);

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
      // console.log("res: ", response);
      toast({
        title: "Selamat!",
        description: "File berhasil dihapus 🎉",
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
        title="Hapus File Risalah"
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

const FileRisalah = (props) => {
  //   console.log(props);
  const { fileRisalah } = props;

  const baseUrl = process.env.NEXT_PUBLIC_URL;

  return (
    <>
      <List>
        {fileRisalah && (
          <ListItem>
            <Flex>
              <Link color="blue.400" href={fileRisalah.url} isExternal>
                {maksKarakter(fileRisalah.name, 20)}
              </Link>
              <DeleteButton fileId={fileRisalah.id} />
            </Flex>
          </ListItem>
        )}
      </List>
      {/* </Box> */}
    </>
  );
};

export default FileRisalah;
