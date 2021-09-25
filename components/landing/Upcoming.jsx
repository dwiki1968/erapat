import { Box, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import useSWR from "swr";
import CardRapat from "./CardRapat";

const Upcoming = () => {
  //data rapat yang akan datang
  const [today, setToday] = useState(new Date().toISOString());
  const { data: rapats, error } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/rapats?jadwal_rapat_gte=${today}&_sort=jadwal_rapat:ASC`
  );

  //error rapat akan datang
  if (error) {
    console.log(error);
    return (
      <Box>
        <Text>Maaf Terjadi kesalahan</Text>
      </Box>
    );
  }
  return (
    <>
      <CardRapat data={rapats} />
    </>
  );
};

export default Upcoming;
