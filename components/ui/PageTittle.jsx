import React from "react";
import { PropTypes } from "prop-types";
import { Heading, Flex } from "@chakra-ui/react";

const PageTittle = ({ title, icon }) => {
  return (
    <>
      <Flex alignItems="center">
        <Heading mr={3}> {icon}</Heading>
        <Heading>{title}</Heading>
      </Flex>
    </>
  );
};

PageTittle.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,
};

export default PageTittle;
