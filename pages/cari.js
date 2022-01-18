import { Center, Container, Heading } from "@chakra-ui/react";
import Head from "next/head";
import React, { useState } from "react";
import { FaHeading } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import AllRapat from "../components/landing/AllRapat";
import CustomRadio from "../components/landing/CustomRadio";
import Upcoming from "../components/landing/Upcoming";
import Footer from "../components/layout/Footer";
import HeaderApp from "../components/layout/HeaderApp";
import Navbar from "../components/layout/Navbar";

const Cari = () => {
  const [tabVal, setTabVal] = useState("new");

  return (
    <div>
      <Head>
        <title>Cari </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW={"5xl"} minHeight="80vh">
        {/* <Navbar /> */}
        <HeaderApp />
        <Heading>Masih dalam tahap pengerjaan...</Heading>
      </Container>
      <Container maxW={"5xl"}>
        <Footer />
      </Container>
    </div>
  );
};

export default Cari;
