import {
  IconButton,
  Img,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { parseCookies } from "nookies";
import React from "react";
import { FiTrash2 } from "react-icons/fi";

const DeleteButton = ({ presensiId }) => {
  const cookies = parseCookies(); //token
  const toast = useToast();

  const onDelete = async () => {
    console.log("delete", presensiId);
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_URL}/rekap-presensis/${presensiId}`,
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
        position: "top-right",
      });
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
    }
  };

  return (
    <IconButton
      onClick={onDelete}
      aria-label="Search database"
      colorScheme="red"
      icon={<FiTrash2 />}
      size="md"
      variant="link"
    />
  );
};

const EditRekap = ({ data }) => {
  return (
    <>
      <Table variant="unstyled" borderRadius="lg">
        <Thead>
          <Tr>
            <Th>Nama</Th>
            <Th>Unit Kerja</Th>
            <Th>Tanda Tangan</Th>
            <Th>Aksi</Th>
          </Tr>
        </Thead>
        {data && (
          <Tbody>
            {data.presenses.map((rekap, index) => (
              <Tr key={rekap.id}>
                <Td>{rekap.nama_peserta}</Td>
                <Td>{rekap.unit_kerja}</Td>
                <Td>
                  <Img w="50px" src={rekap.signature_url} />
                </Td>
                <Td>
                  {/* tombol delete dat  */}
                  <DeleteButton presensiId={rekap.id} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        )}
      </Table>
    </>
  );
};

export default EditRekap;
