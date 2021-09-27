import {
  Table,
  Button,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  IconButton,
  Input,
  Flex,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { FiDelete } from "react-icons/fi";
import useSWR from "swr";
import DialogKonfirmasi from "../ui/DialogKonfirmasi";

const HapusRow = ({ id, token }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const onDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_URL}/units/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("res: ", response);
      toast({
        title: "Selamat!",
        description: "Data berhasil dihapus 🎉",
        status: "success",
        duration: 9000,
        position: "top-right",
        isClosable: true,
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Sayang sekali!",
        description: "Maaf terjadi kesalahan 😱",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      setIsOpen(false);

      console.log("err: ", error);
    }
  };
  return (
    <>
      <DialogKonfirmasi
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleAksi={onDelete}
        title="Hapus Data Unit Kerja"
      />
      <IconButton
        variant="link"
        onClick={() => setIsOpen(true)}
        colorScheme="red"
        icon={<FiDelete />}
      />
    </>
  );
};

const UnitKerja = () => {
  const cookies = parseCookies();
  const [value, setValue] = useState("");
  const [isLoading, SetIsLoading] = useState(false);
  const toast = useToast();

  const { data: unitKerja, error: errUnit } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/units`
  );

  if (errUnit) {
    alert("terjadi eror data unit kerja");
  }

  const handleChangeTambah = (e) => {
    setValue(e.target.value);
  };

  const handleSubmitTambah = async () => {
    // console.log("value", value);
    SetIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/units`,
        {
          nama: value,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      //   console.log("res: ", response);
      SetIsLoading(false);
      toast({
        title: "Selamat!",
        description: "Data berhasil ditambahkan 🎉",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      setValue("");
    } catch (error) {
      SetIsLoading(false);
      toast({
        title: "Sayang sekali!",
        description: "Maaf terjadi kesalahan 😱",
        status: "error",
        duration: 9000,
        position: "top-right",
        isClosable: true,
      });

      console.log("err: ", error);
      setValue("");
    }
  };

  return (
    <>
      <Flex maxW="500px">
        <Input size="sm" value={value} mr={2} onChange={handleChangeTambah} />

        <Button
          size="sm"
          onClick={handleSubmitTambah}
          isDisabled={value === ""}
          isLoading={isLoading}
        >
          Tambah
        </Button>
      </Flex>
      <Box m={3} />
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>No. </Th>
            <Th>Nama Unit Kerja</Th>
            <Th> Aksi</Th>
          </Tr>
        </Thead>

        <Tbody>
          {unitKerja &&
            unitKerja.map((unit, index) => (
              <Tr key={unit.id}>
                <Td>{index + 1}</Td>
                <Td>{unit.nama}</Td>
                <Td>
                  <HapusRow id={unit.id} token={cookies.token} />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </>
  );
};

export default UnitKerja;
