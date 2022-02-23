import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const PaperContainer = ({ children, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.700")}
      p={5}
      borderRadius="xl"
      {...rest}
    >
      {children}
    </Box>
  );
};

export default PaperContainer;
