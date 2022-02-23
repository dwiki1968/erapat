import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import React from "react";
import { Box, Text } from "@chakra-ui/layout";
import { Img } from "@chakra-ui/image";
import { FiEdit } from "react-icons/fi";

const Success = (props) => {
  const { namaRapat, setSuccessSubmit, resData } = props;

  return (
    <div>
      <Alert
        mt={5}
        boxShadow="md"
        p={5}
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        borderRadius="xl"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Presensi berhasil!
        </AlertTitle>
        <AlertDescription maxWidth="md" fontStyle="italic">
          Terimakasih telah mengisi presensi kehadiran {namaRapat}
        </AlertDescription>
        <Box mt={5} p={4} bg="green.200">
          <Text fontSize="sm" fontWeight="semibold">
            {resData.nama_peserta}
          </Text>
          <Text fontSize="sm" fontWeight="semibold">
            {resData.unit_kerja}
          </Text>

          <Img w="200px" src={resData.signature_url} />
        </Box>
        <Button
          mt={10}
          colorScheme="green"
          borderRadius="xl"
          size="md"
          onClick={() => setSuccessSubmit(false)}
          rightIcon={<FiEdit />}
        >
          Isi Kembali
        </Button>
      </Alert>
    </div>
  );
};

export default Success;
