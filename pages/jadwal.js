import { Center, Container, Heading } from "@chakra-ui/react";
import Head from "next/head";
import React, { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import AllRapat from "../components/landing/AllRapat";
import CustomRadio from "../components/landing/CustomRadio";
import Upcoming from "../components/landing/Upcoming";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

const Jadwal = () => {
  const [tabVal, setTabVal] = useState("new");

  return (
    <div>
      <Head>
        <title>Jadwal Rapat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW={"5xl"} minHeight="80vh">
        <Navbar />
        <Center p={5}>
          <Heading mr={3} size="lg">
            <FiCalendar />
          </Heading>
          <Heading size="lg">Jadwal Rapat</Heading>
        </Center>
        <Center m={5}>
          <CustomRadio setTabVal={setTabVal} />
        </Center>
        {tabVal === "new" ? <Upcoming /> : <AllRapat />}
      </Container>
      <Container maxW={"5xl"}>
        <Footer />
      </Container>
    </div>
  );
};

export default Jadwal;
