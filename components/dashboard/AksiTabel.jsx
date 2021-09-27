import { Flex, IconButton, Tooltip, Button } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiEdit, FiFileText, FiTrash } from "react-icons/fi";
import DialogKonfirmasi from "../ui/DialogKonfirmasi";
import { useToast } from "@chakra-ui/react";
import { PropTypes } from "prop-types";
import { parseCookies } from "nookies";

const AksiTabel = ({ slug, idRapat }) => {
  const cookies = parseCookies();
  const router = useRouter();
  const toast = useToast(); //toast untuk notifikasi berhasil dan eror axios
  // hooks untuk konfirmasi / modal dialog konsfirmasi
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    //handle untuk mendelete data
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_URL}/rapats/${idRapat}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      //logic jika berhasil
      console.log("res: ", response);
      setIsOpen(false);
      toast({
        title: "Berhasil",
        description: "Data rapat berhasi terhapus. 🎉",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      //logic jika gagal
      console.log("err: ", error);
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan. 😱",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <>
      {/* komponen diaolog konfirmasi utuk delete */}
      <DialogKonfirmasi
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleAksi={handleDelete}
        title="Hapus Data Rapat"
      />

      {/* komponen tombol aksi */}
      <Flex flexDir={{ base: "column", sm: "column", md: "row" }}>
        <Tooltip hasArrow label="Detail " bg="gray.300" color="black">
          <Button
            variant="ghost"
            colorScheme="green"
            size="sm"
            onClick={() => router.push(`/dashboard/rapats/${slug}`)}
            rightIcon={<FiFileText />}
          >
            Detail
          </Button>
        </Tooltip>

        <Tooltip hasArrow label="Edit data rapat" bg="gray.300" color="black">
          <IconButton
            variant="ghost"
            colorScheme="green"
            size="sm"
            onClick={() => router.push(`/dashboard/rapats/${slug}`)}
            icon={<FiEdit />}
          />
        </Tooltip>

        <Tooltip hasArrow label="Hapus rapat" bg="gray.300" color="black">
          <IconButton
            variant="ghost"
            colorScheme="red"
            size="sm"
            onClick={() => setIsOpen(true)}
            icon={<FiTrash />}
          />
        </Tooltip>
      </Flex>
    </>
  );
};

AksiTabel.propTypes = {
  slug: PropTypes.string,
  idRapat: PropTypes.number,
};
export default AksiTabel;
