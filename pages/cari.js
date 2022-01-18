import { Box, Container, Divider, Heading } from "@chakra-ui/react";
import Head from "next/head";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Field from "../components/cari/Field";
import Footer from "../components/layout/Footer";
import HeaderApp from "../components/layout/HeaderApp";
import PageTittle from "../components/ui/PageTittle";

const Cari = () => {
  return (
    <div>
      <Head>
        <title>Cari </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW={"5xl"} minHeight="80vh">
        <HeaderApp />
        <Box m={10} />

        <PageTittle
          title="Cari Rapat yang Pernah Anda Ikuti"
          icon={<FiSearch />}
          fontSize="2xl"
        />
        <Box m={5} />

        <Field />
        <Divider />
      </Container>
      <Container maxW={"5xl"}>
        <Footer />
      </Container>
    </div>
  );
};

export default Cari;
