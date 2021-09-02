import {
  Box,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiArchive, FiCalendar, FiSmile } from "react-icons/fi";

function StatsCard(props) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      bgGradient="linear(to-l, red.400, purple.400)"
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel
            fontWeight={"bold"}
            isTruncated
            color={useColorModeValue("gray.200", "gray.700")}
          >
            {title}
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
  return (
    <>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={{ base: 5, lg: 8 }}
      >
        <StatsCard
          title={"Halo, selamat datang! ✨"}
          stat={"Dwiki Krisna Saputra"}
          icon={<FiSmile size={"3em"} />}
        />
        <StatsCard
          title={"Total"}
          stat={"40"}
          icon={<FiArchive size={"3em"} />}
        />
        <StatsCard
          title={"Akan datang"}
          stat={"10"}
          icon={<FiCalendar size={"3em"} />}
        />
      </SimpleGrid>
    </>
  );
}
