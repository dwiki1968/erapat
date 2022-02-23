import React from "react";
import { PropTypes } from "prop-types";
import { Heading, HStack } from "@chakra-ui/react";

const PageTittle = ({ title, icon, ...rest }) => {
  return (
    <>
      <HStack>
        <Heading {...rest}>{icon} </Heading>
        <Heading {...rest}>{title}</Heading>
      </HStack>
    </>
  );
};

PageTittle.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,
};

export default PageTittle;
