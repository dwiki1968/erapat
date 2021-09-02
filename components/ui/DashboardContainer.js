import { Box, useColorModeValue } from "@chakra-ui/react";
import { PropTypes } from "prop-types";
import React from "react";

const DashboardContainer = ({ children }) => {
  return (
    <div>
      <Box
        minH="100vh"
        borderRadius="lg"
        bg={useColorModeValue("gray.100", "gray.800")}
        py={2}
        px={{ base: 2, sm: 2, md: 5, lg: 7, xl: 9 }}
      >
        {children}
      </Box>
    </div>
  );
};

DashboardContainer.propTypes = {
  children: PropTypes.node,
};

export default DashboardContainer;
