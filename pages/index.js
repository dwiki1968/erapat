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
} from "@chakra-ui/react";
import Head from "next/head";
import AllRapat from "../components/landing/AllRapat";
import Hero from "../components/landing/Hero";
import Upcoming from "../components/landing/Upcoming";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <>
      {/* {today} */}
      <Head>
        <title>Jadwal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container
        maxW={"5xl"}
        minHeight="90vh"
        // bg={useColorModeValue("gray.100", "gray.800")}
      >
        <Hero />
        <Center p={5}>
          <Heading size="lg">List Jadwal Rapat</Heading>
        </Center>
        <Tabs colorScheme="red" borderRadius="lg" variant="line">
          <TabList>
            <Tab>
              <Text fontSize="lg">Yang akan datang 📋</Text>
            </Tab>
            <Tab ml={5}>
              {" "}
              <Text fontSize="lg">Semua rapat ✔</Text>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Upcoming />
            </TabPanel>

            <TabPanel>
              <AllRapat />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <Container maxW={"5xl"}>
        <Footer />
      </Container>
    </>
  );
}
