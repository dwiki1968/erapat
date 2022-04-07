import "@fontsource/montserrat/400.css";
import "@fontsource/open-sans/700.css";
import "../styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";

import { SWRConfig } from "swr";
import axios from "axios";

///fectcher with token and without token
const fetcher = (url, token) => {
  if (token) {
    return axios
      .get(url, { headers: { Authorization: "Bearer " + token } })
      .then((res) => res.data);
  } else {
    return axios.get(url).then((res) => res.data);
  }
};

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 5000,
        fetcher,
      }}
    >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SWRConfig>
  );
}

export default MyApp;
