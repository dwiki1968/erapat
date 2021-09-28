import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import styles from "./TandaTangan.module.css";

export default function TandaTangan({ getTtdUrl }) {
  let canvasRef;
  //   let [cBase64, setBase64] = useState();
  return (
    <>
      <Box>
        <Box
          maxW="400px"
          h="150px"
          borderRadius="lg"
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
      {/* {getTanda(cBase64)} */}
      {/* <Button onClick={(e) => setBase64(canvasRef.toDataURL())}>
        Canvas to Base64
      </Button> */}
      {/* <div style={{ width: "500px", wordBreak: "break-all" }}>{cBase64}</div> */}
    </>
  );
}
