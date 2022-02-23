import { extendTheme } from "@chakra-ui/react";
import { theme as chakraTheme } from "@chakra-ui/react";

const fonts = {
  ...chakraTheme.fonts,
  heading: "Open Sans",
  body: "Montserrat",
};

const theme = extendTheme(fonts);

export default theme;
