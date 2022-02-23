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
import { FiArchive, FiCalendar, FiSmile, FiUser } from "react-icons/fi";
import useSWR from "swr";

function StatsCard(props) {
  const { title, stat, icon } = props;
  return (
    <Stat px={{ base: 2, md: 4 }} py={"5"} bg="red.400" rounded={"xl"}>
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel
            fontWeight={"semibold"}
            isTruncated
            color={useColorModeValue("gray.200", "gray.700")}
          >
            {title ? title : ". . ."}
          </StatLabel>
          <StatNumber
            fontSize={"xl"}
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

function ProfileCard(props) {
  const { title, stat, icon } = props;
  return (
    <Stat px={{ base: 2, md: 4 }} py={"5"} bg="blue.400" rounded={"xl"}>
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
            fontSize={"xl"}
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

export default function Statistic({}) {
  const cookies = parseCookies();

  const { data, error } = useSWR(
    cookies.token
      ? [`${process.env.NEXT_PUBLIC_URL}/users/me`, cookies.token]
      : null
  );

  const { data: upcoming, errorUpcoming } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/rapats/upcomingv2`
  );
  const { data: total, errorTotal } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/rapats/count`
  );

  console.log("upcoming", upcoming);
  console.log("total", total);

  //belum dilakukan handel eror -> kedepannya kita pakai toast saja
  if (error) {
    console.log(error);
  }

  if (errorTotal) {
    console.log(error);
  }

  if (errorUpcoming) {
    console.log(error);
  }

  return (
    <>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={{ base: 5, lg: 8 }}
      >
        <ProfileCard
          title={"Halo, selamat datang!"}
          stat={data ? data.nama : "loading.."}
          icon={<FiUser size={"3em"} />}
        />
        <StatsCard
          title={"Total"}
          stat={total && total}
          icon={<FiArchive size={"3em"} />}
        />
        <StatsCard
          title={"Akan datang"}
          stat={upcoming ? upcoming.count : null}
          icon={<FiCalendar size={"3em"} />}
        />
      </SimpleGrid>
    </>
  );
}
