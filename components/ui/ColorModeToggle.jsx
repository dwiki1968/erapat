import { IconButton, useColorMode } from "@chakra-ui/react";
import { FiMoon, FiSun } from "react-icons/fi";

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      variant="solid"
      borderRadius="xl"
      aria-label="theme toggle"
      colorScheme="gray"
      size="sm"
      icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
      onClick={toggleColorMode}
    />
  );
};

export default ColorModeToggle;
