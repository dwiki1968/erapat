import MetaPage from "../components/layout/MetaPage";
import Landing from "../components/Landing/Index";
import Footer from "../components/layout/Footer";
import PublicHeader from "../components/layout/PublicHeader";
import PublicContainer from "../components/container/PublicContainer";
import Jadwal from "../components/Jadwal";

export default function Home() {
  return (
    <>
      <MetaPage titlePage="Selamat Datang" />
      <PublicContainer>
        <PublicHeader />
        <Landing />
        <Jadwal />
        <Footer />
      </PublicContainer>
    </>
  );
}
