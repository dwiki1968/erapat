import { Divider } from "@chakra-ui/react";
import React, { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import PageTittle from "../ui/PageTitle";
import Upcoming from "./Upcoming";

const Jadwal = () => {
  const [tabVal, setTabVal] = useState("new");

  return (
    <>
      <PageTittle
        fontSize="2xl"
        title="Jadwal Rapat PPATK"
        icon={<FiCalendar />}
      />
      <Divider my={3} />

      <Upcoming />
    </>
  );
};

export default Jadwal;
