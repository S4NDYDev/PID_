import { ChakraProvider } from "@chakra-ui/react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { router } from "./router/router";
import { RouterProvider } from "react-router-dom";
import customTheme from "./theme";
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="Clínica Armonía Vital - %s" />
      <ChakraProvider theme={customTheme}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ChakraProvider>
    </HelmetProvider>
  );
}

export default App;
