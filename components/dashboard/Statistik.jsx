import {
  Box,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { useState } from "react";
import { FiArchive, FiCalendar, FiSmile } from "react-icons/fi";
import useSWR from "swr";

function StatsCard(props) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      // bg="red.400"
      bgGradient="red.400"
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel
            fontWeight={"bold"}
            isTruncated
            color={useColorModeValue("gray.200", "gray.700")}
          >
            {title ? title : ". . ."}
          </StatLabel>
          <StatNumber
            fontSize={"3xl"}
            fontWeight={"medium"}
            color={useColorModeValue("gray.200", "gray.700")}
          >
            {stat}
          </StatNumber>
        </Box>
        <Box
          color={useColorModeValue("gray.200", "gray.700")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function Statistik() {
  const [today, setToday] = useState(new Date().toISOString());

  const cookies = parseCookies();

  const { data, error } = useSWR(
    cookies.token
      ? [`${process.env.NEXT_PUBLIC_URL}/users/me`, cookies.token]
      : null
  );
  const { data: semua, errorSemua } = useSWR(
    cookies.token
      ? [`${process.env.NEXT_PUBLIC_URL}/rapats/count`, cookies.token]
      : null
  );

  const { data: upcoming, errorUpcoming } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/rapats/count?jadwal_rapat_gte=${today}`
  );

  //belum dilakukan handel eror -> kedepannya kita pakai toast saja
  if (error) {
    console.log(error);
  }

  if (errorSemua) {
    console.log(error);
  }

  if (errorUpcoming) {
    console.log(error);
  }

  // console.log("stat", data);
  return (
    <>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={{ base: 5, lg: 8 }}
      >
        <StatsCard
          title={"Halo, selamat datang! ✨"}
          stat={data ? data.nama : "loading.."}
          icon={<FiSmile size={"3em"} />}
        />
        <StatsCard
          title={"Total"}
          stat={semua}
          icon={<FiArchive size={"3em"} />}
        />
        <StatsCard
          title={"Akan datang"}
          stat={upcoming}
          icon={<FiCalendar size={"3em"} />}
        />
      </SimpleGrid>
    </>
  );
}
