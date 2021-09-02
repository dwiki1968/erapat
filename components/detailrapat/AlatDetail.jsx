import { useClipboard } from "@chakra-ui/hooks";
import { Button, Flex, Input, Spacer, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

function AlatDetail() {
  const router = useRouter();
  const slugRapat = router.query.rapat;
  const { hasCopied, onCopy } = useClipboard(
    slugRapat ? `http://localhost:3000//presensi/${slugRapat}` : "loading..."
  );

  return (
    <>
      <Flex mb={5}>
        <Button
          colorScheme="green"
          mr={10}
          onClick={() => router.push(`/dashboard/rekap-presensi/${slugRapat}`)}
        >
          👨‍💼 Rekap Presensi
        </Button>
        <Button
          colorScheme="green"
          onClick={() => router.push(`/dashboard/rekap-presensi/${slugRapat}`)}
        >
          📝 Risalah Rapat
        </Button>
      </Flex>
      {/* copy presensi rapat  */}
      <Flex alignItems="center">
        <Text fontWeight="semibold">Link Presensi</Text>
        <Spacer />
        <Input
          w="80%"
          value={
            slugRapat
              ? `http://localhost:3000/presensi/${slugRapat}`
              : "loading..."
          }
          isReadOnly
          placeholder="Welcome"
        />
        <Button onClick={onCopy} ml={2} colorScheme="teal">
          {hasCopied ? "Copied" : "Copy"}
        </Button>
      </Flex>
    </>
  );
}

export default AlatDetail;
