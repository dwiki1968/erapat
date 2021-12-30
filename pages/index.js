import { Container } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import Hero from "../components/landing/Hero";
import Footer from "../components/layout/Footer";

export default function Home() {
  const [tabVal, setTabVal] = useState("new");

  return (
    <>
      <Head>
        <title>Selamat Datang</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW={"5xl"} minHeight="80vh">
        <Hero />
      </Container>
      <Container maxW={"5xl"}>
        <Footer />
      </Container>
    </>
  );
}
