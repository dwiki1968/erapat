import {
  IconButton,
  Img,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { FiTrash2 } from "react-icons/fi";

const EditRekap = ({ data }) => {
  return (
    <>
      <Table variant="simple">
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
                  <IconButton
                    aria-label="Search database"
                    colorScheme="red"
                    icon={<FiTrash2 />}
                    size="md"
                    variant="ghost"
                  />
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
