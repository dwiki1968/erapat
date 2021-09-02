import { Flex, IconButton, Tooltip } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiEdit, FiFileText, FiTrash } from "react-icons/fi";
import DialogKonfirmasi from "../ui/DialogKonfirmasi";
import { useToast } from "@chakra-ui/react";
import { PropTypes } from "prop-types";

const AksiTabel = ({ slug, idRapat }) => {
  const router = useRouter();
  const toast = useToast(); //toast untuk notifikasi berhasil dan eror axios
  // hooks untuk konfirmasi / modal dialog konsfirmasi
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    //handle untuk mendelete data
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_URL}/rapats/${idRapat}`
      );
      //logic jika berhasil
      console.log("res: ", response);
      setIsOpen(false);
      toast({
        title: "Berhasil",
        description: "Data rapat berhasi terhapus.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      //logic jika gagal
      console.log("err: ", error);
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
          <IconButton
            variant="ghost"
            colorScheme="cyan"
            size="md"
            onClick={() => router.push(`/dashboard/rapats/${slug}`)}
            icon={<FiFileText />}
          />
        </Tooltip>

        <Tooltip hasArrow label="Edit data rapat" bg="gray.300" color="black">
          <IconButton
            variant="ghost"
            colorScheme="teal"
            size="md"
            onClick={() => router.push(`/dashboard/rapats/${slug}`)}
            icon={<FiEdit />}
          />
        </Tooltip>

        <Tooltip hasArrow label="Hapus rapat" bg="gray.300" color="black">
          <IconButton
            variant="ghost"
            colorScheme="red"
            size="md"
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
