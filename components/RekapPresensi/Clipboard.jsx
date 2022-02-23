import { Button } from "@chakra-ui/button";
import { useClipboard } from "@chakra-ui/hooks";
import { Flex, Spacer } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/react";
import React from "react";

const Clipboard = ({ kalimat }) => {
  const { hasCopied, onCopy } = useClipboard(kalimat);

  return (
    <>
      <Flex alignItems="start" maxW="600px">
        <Spacer />
        <Input
          borderRadius="xl"
          variant="filled"
          fontSize="sm"
          size="md"
          value={kalimat}
          isReadOnly
          overflow="hidden"
        />
        <Button
          size="md"
          onClick={onCopy}
          ml={5}
          colorScheme="green"
          borderRadius="xl"
        >
          {hasCopied ? "Copied" : "Copy"}
        </Button>
      </Flex>
    </>
  );
};

export default Clipboard;
