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
  Box,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { IsoToLocalDate, IsoToLocalTime } from "../../utils/utils";
import DialogKonfirmasi from "../ui/ConfirmDialog";

const DeleteButton = ({ presensiId }) => {
  const cookies = parseCookies(); //token
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const onDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_URL}/presensis/${presensiId}`,
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
        handleAksi={onDelete}
        title="Hapus Data Kehadiran"
      />

      <IconButton
        onClick={() => setIsOpen(true)}
        aria-label="Search database"
        colorScheme="red"
        icon={<FiTrash2 />}
        size="md"
        variant="link"
      />
    </>
  );
};

const EditRekap = ({ data }) => {
  return (
    <>
      <Box overflow="auto">
        <Table variant="unstyled" borderRadius="lg">
          <Thead>
            <Tr>
              <Th>No.</Th>

              <Th>Nama</Th>
              <Th>Unit Kerja</Th>
              <Th>Tanda Tangan</Th>
              <Th>Timestamp</Th>

              <Th>Aksi</Th>
            </Tr>
          </Thead>
          {data && (
            <Tbody>
              {data.map((rekap, index) => (
                <Tr key={rekap.id}>
                  <Td>{(index += 1)}</Td>
                  <Td>{rekap.nama_peserta}</Td>
                  <Td>{rekap.unit_kerja}</Td>
                  <Td>
                    <Img w="50px" src={rekap.signature_url} />
                  </Td>
                  <Td>
                    <Text fontSize="sm">
                      ⏲ {IsoToLocalTime(rekap.createdAt)} WIB
                    </Text>
                    <Text fontSize="sm">
                      📆 {IsoToLocalDate(rekap.createdAt)}
                    </Text>
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
      </Box>
    </>
  );
};

export default EditRekap;
