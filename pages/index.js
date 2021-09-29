import {
  Center,
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import AllRapat from "../components/landing/AllRapat";
import CustomRadio from "../components/landing/CustomRadio";
import Hero from "../components/landing/Hero";
import Upcoming from "../components/landing/Upcoming";
import Footer from "../components/layout/Footer";

export default function Home() {
  const [tabVal, setTabVal] = useState("new");

  return (
    <>
      {/* {today} */}

      <Head>
        <title>Jadwal Rapat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW={"5xl"} minHeight="85vh">
        <Hero />
        <Center p={5}>
          <Heading size="lg">List Jadwal Rapat</Heading>
        </Center>
        <Center>
          <CustomRadio setTabVal={setTabVal} />
        </Center>
        {tabVal === "new" ? <Upcoming /> : <AllRapat />}
      </Container>
      <Container maxW={"5xl"}>
        <Footer />
      </Container>
    </>
  );
}
