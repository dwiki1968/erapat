import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import SignatureCanvas from "react-signature-canvas";
import styles from "./TandaTangan.module.css";

export default function TandaTangan({ getTtdUrl }) {
  let canvasRef;
  return (
    <>
      <Box>
        <Box
          maxW="400px"
          h="150px"
          borderRadius="xl"
          bg={useColorModeValue("gray.100", "gray.700")}
        >
          <SignatureCanvas
            penColor="blue"
            ref={(ref) => (canvasRef = ref)}
            onEnd={(e) => {
              getTtdUrl(canvasRef.toDataURL());
            }}
            canvasProps={{
              className: styles.container,
            }}
          />
        </Box>
        <Button mt={2} size="xs" onClick={() => canvasRef.clear()}>
          reset
        </Button>
      </Box>
    </>
  );
}
