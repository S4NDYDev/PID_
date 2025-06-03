import React from "react";
import {
  chakra,
  Flex,
  HStack,
  VisuallyHidden,
  useColorModeValue,
  ButtonGroup,
  Button,
  Image,
  Box,
  Link,
  CloseButton,
  IconButton,
  VStack,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { useAuth } from "../AuthContext";

type HeaderProps = {
  children: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => (
  <chakra.header
    shadow="md"
    transition="all 0.5s ease-in-out"
    pos="fixed"
    top="0"
    zIndex="modal"
    w="full"
    px={{ base: 2, sm: 4 }}
    py={4}
    mb={10}
    css={{
      backdropFilter: "saturate(180%) blur(5px)",
      backgroundColor: useColorModeValue(
        "rgba(255, 255, 255, 0.8)",
        "rgba(26, 32, 44, 0.8)"
      ),
    }}
  >
    {children}
  </chakra.header>
);

export default function NavHero() {
  const mobileNav = useDisclosure();
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <>
      <Header>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          mx="auto"
          as="nav"
        >
          <Flex>
            <VisuallyHidden>Logo</VisuallyHidden>
            <Box as={ReactLink} to="/">
              <Image src="/svg/Logo.png" alt="Logo Odonto Clinic" maxW={"10rem"} />
            </Box>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={5}
              mr={5}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            >
              <Link as={ReactLink} to={"/"}>
                Inicio
              </Link>
              <Link as={ReactLink} to="/specialists">
                Blog
              </Link>
              <Link as={ReactLink} to="/services">
                Servicios
              </Link>
            </HStack>
            <ButtonGroup>
              {username && (
                <>
                  <Button bg="blue.300" as={ReactLink} to="/contact">Contacto</Button>
                  <Button bg="green.400" as={ReactLink} to="/appointments">Citas</Button>
                </>
              )}
              {!username && (
                <>
                  <Button as={ReactLink} to="/login" variant="outline" colorScheme="blue">Iniciar sesión</Button>
                  <Button as={ReactLink} to="/register" colorScheme="blue">Registrarse</Button>
                </>
              )}
              {username && (
                <Menu>
                  <MenuButton as={Button} colorScheme="blue" variant="outline">
                    {username}
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                  </MenuList>
                </Menu>
              )}
            </ButtonGroup>
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Abrir menú"
                fontSize="20px"
                boxShadow={"none"}
                bg={useColorModeValue("gray.50", "#464460")}
                _hover={{ bg: useColorModeValue("gray.50", "#464460") }}
                color={useColorModeValue("gray.800", "white")}
                onClick={mobileNav.onOpen}
                icon={<AiOutlineMenu />}
              />
              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={useColorModeValue("white", "#1a202cd1")}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Cerrar menú"
                  onClick={mobileNav.onClose}
                />
                <Link as={ReactLink} to={"/"}>
                  Inicio
                </Link>
                <Link as={ReactLink} to="/specialists">
                  Blog
                </Link>
                <Link as={ReactLink} to="/services">
                  Servicios
                </Link>
                {!username && (
                  <>
                    <Button as={ReactLink} to="/login" variant="outline" colorScheme="blue" w="100%">Iniciar sesión</Button>
                    <Button as={ReactLink} to="/register" colorScheme="blue" w="100%">Registrarse</Button>
                  </>
                )}
                {username && (
                  <Button colorScheme="blue" variant="outline" w="100%" onClick={handleLogout}>
                    Cerrar sesión
                  </Button>
                )}
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </Header>
    </>
  );
}
