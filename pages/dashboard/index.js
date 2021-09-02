import React from "react";
import { FiHome } from "react-icons/fi";
import Statistik from "../../components/dashboard/Statistik";
import TabelRapat from "../../components/dashboard/TabelRapat";
import MetaPage from "../../components/layout/MetaPage";
import SideMenu from "../../components/layout/SideMenu";
import DashboardContainer from "../../components/ui/DashboardContainer";
import PageTittle from "../../components/ui/PageTittle";
import PaperContainer from "../../components/ui/PaperContainer";

const Dashboard = () => {
  return (
    <>
      <MetaPage titlePage="Dashboard" />
      <SideMenu>
        <DashboardContainer>
          <PageTittle title="Beranda" icon={<FiHome />} />
          <PaperContainer mt={5}>
            <Statistik />
          </PaperContainer>
          <PaperContainer mt={5}>
            <TabelRapat />
          </PaperContainer>
        </DashboardContainer>
      </SideMenu>
    </>
  );
};

export default Dashboard;
