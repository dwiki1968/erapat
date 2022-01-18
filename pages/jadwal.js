import { Box, Center, Container, Heading } from "@chakra-ui/react";
import Head from "next/head";
import React, { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import AllRapat from "../components/landing/AllRapat";
import CustomRadio from "../components/landing/CustomRadio";
import Upcoming from "../components/landing/Upcoming";
import Footer from "../components/layout/Footer";
import HeaderApp from "../components/layout/HeaderApp";
import PageTittle from "../components/ui/PageTittle";

const Jadwal = () => {
  const [tabVal, setTabVal] = useState("new");

  return (
    <div>
      <Head>
        <title>Jadwal Rapat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW={"5xl"} minHeight="80vh">
        {/* <Navbar /> */}
        <HeaderApp />
        <Box m={10} />

        <PageTittle
          fontSize="2xl"
          title="Jadwal Rapat PPATK"
          icon={<FiCalendar />}
        />
        <Box m={5} />

        <CustomRadio setTabVal={setTabVal} />
        <Box m={5} />
        {tabVal === "new" ? <Upcoming /> : <AllRapat />}
      </Container>
      <Container maxW={"5xl"}>
        <Footer />
      </Container>
    </div>
  );
};

export default Jadwal;
