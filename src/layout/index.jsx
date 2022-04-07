import { Box, Center, Container, Heading, Link, Text } from "@chakra-ui/react";
import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <Center
        boxShadow="2xl"
        as="header"
        bg="brand.100"
        p="4"
        color="white"
        textAlign="center"
      >
        <Heading as="h1" size="lg">💸 Omedia Salary Countdown 💸</Heading>
      </Center>

      <Box p="4" justifyContent="center" alignItems="center">
        <Container>
          {children}
        </Container>
      </Box>

      <Box as="footer" py="10">
        <Text pt="6" fontSize="sm" textAlign="center">
          Create with ♥ By<Link href="https://abgeo.dev" isExternal>ABGEO</Link>
        </Text>
      </Box>
    </>
  );
};

export default Layout;
