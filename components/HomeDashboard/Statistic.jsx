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
import { FiArchive, FiCalendar, FiUser } from "react-icons/fi";
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

export default function Statistic({total}) {
  const cookies = parseCookies();

  const { data, error } = useSWR(
    cookies.erapat_token
      ? [`${process.env.NEXT_PUBLIC_URL}/api/users/me`, cookies.erapat_token]
      : null
  );

  // const { data: upcoming, errorUpcoming } = useSWR(
  //   `${process.env.NEXT_PUBLIC_URL}/api/rapats/upcomingv2`
  // );
  // const { data: total, errorTotal } = useSWR(
  //   `${process.env.NEXT_PUBLIC_URL}/api/rapats/count`
  // );

  if (error) {
    console.log(error);
  }

  // if (errorTotal) {
  //   console.log(errorTotal);
  // }

  // if (errorUpcoming) {
  //   console.log(errorUpcoming);
  // }

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
          title={"Jumlah Rapat"}
          stat={total}
          icon={<FiArchive size={"3em"} />}
        />
        {/* <StatsCard
          title={"Akan datang"}
          stat={upcoming ? upcoming.count : null}
          icon={<FiCalendar size={"3em"} />}
        /> */}
      </SimpleGrid>
    </>
  );
}
