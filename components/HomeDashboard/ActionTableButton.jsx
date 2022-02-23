import { Flex, IconButton, Tooltip, Button } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiEdit, FiFileText, FiTrash } from "react-icons/fi";
import DialogKonfirmasi from "../ui/ConfirmDialog";
import { useToast } from "@chakra-ui/react";
import { PropTypes } from "prop-types";
import { parseCookies } from "nookies";

const ActionTableButton = ({ slug, idRapat }) => {
  const cookies = parseCookies(); //getcookies
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
      {/* komponen dialog konfirmasi utuk delete */}
      <DialogKonfirmasi
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleAksi={handleDelete}
        title="Hapus Data Rapat"
      />

      {/* komponen tombol aksi */}
      <Flex flexDir={{ base: "column", sm: "column", md: "row" }}>
        <Tooltip hasArrow label="Edit data rapat" bg="#95DAC1" color="black">
          <IconButton
            variant="link"
            colorScheme="blue"
            size="sm"
            onClick={() => router.push(`/dashboard/rapats/${slug}`)}
            icon={<FiEdit />}
          />
        </Tooltip>

        <Tooltip hasArrow label="Hapus rapat" bg="#95DAC1" color="black">
          <IconButton
            variant="link"
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

ActionTableButton.propTypes = {
  slug: PropTypes.string,
  idRapat: PropTypes.number,
};

export default ActionTableButton;
