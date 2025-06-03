import { Footer } from "../components/footer";
import NavHero from "../components/header";
import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

export function Layout() {
  return (
    <Flex direction="column" minH="100vh">
      <NavHero />
      <Box flex="1" pt="80px">
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
}
