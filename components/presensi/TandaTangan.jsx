import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function TandaTangan({ getTtdUrl }) {
  let canvasRef;
  //   let [cBase64, setBase64] = useState();
  return (
    <>
      <Box>
        <Box
          maxWidth="300px"
          borderRadius="lg"
          bg={useColorModeValue("gray.100", "gray.800")}
        >
          <SignatureCanvas
            penColor="blue"
            ref={(ref) => (canvasRef = ref)}
            onEnd={(e) => {
              getTtdUrl(canvasRef.toDataURL());
            }}
            canvasProps={{
              width: 300,
              height: 150,
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
