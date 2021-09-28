import React from "react";
import MetaPage from "../../../components/layout/MetaPage";
import FormPresensi from "../../../components/presensi/FormPresensi";

const Presensi = () => {
  return (
    <>
      <MetaPage titlePage="Presensi Peserta" />
      <FormPresensi />
    </>
  );
};

export default Presensi;
