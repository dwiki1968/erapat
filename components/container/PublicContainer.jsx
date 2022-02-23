import { Container } from "@chakra-ui/react";
import React from "react";

const PublicContainer = ({ children }) => {
  return (
    <>
      <Container display="flex" flexDir="column" minH="100vh" maxW={"5xl"}>
        {children}
      </Container>
    </>
  );
};

export default PublicContainer;
