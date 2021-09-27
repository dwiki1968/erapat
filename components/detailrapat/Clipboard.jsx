import { Button } from "@chakra-ui/button";
import { useClipboard } from "@chakra-ui/hooks";
import { Flex, Spacer } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import React from "react";

const Clipboard = ({ kalimat }) => {
  const { hasCopied, onCopy } = useClipboard(kalimat);

  return (
    <>
      <Flex alignItems="start">
        <Spacer />
        <Textarea
          variant="filled"
          fontSize="sm"
          size="md"
          value={kalimat}
          isReadOnly
          overflow="hidden"
        />
        <Button size="sm" onClick={onCopy} ml={2} colorScheme="green">
          {hasCopied ? "Copied" : "Copy"}
        </Button>
      </Flex>
    </>
  );
};

export default Clipboard;
