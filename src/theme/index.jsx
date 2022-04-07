import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Open Sans, sans-serif",
    body: "Raleway, sans-serif",
    poppins: "Poppins, sans-serif",
  },
  colors: {
    brand: {
      100: "#f5322d"
    }
  }
});

export default theme;
