import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
  Text
} from "@chakra-ui/react";
import HeroSection from "../../components/hero";
import cardsData from "../../data/cards.json";
import CardComponent from "../../components/card-info";
import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";

export function Home() {
  const [services, setServices] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    fetch("/api/services")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar servicios");
        return res.json();
      })
      .then((data) => setServices(data.slice(0, 3)))
      .catch(() => setError("No se pudieron cargar los servicios."))
      .finally(() => setLoading(false));
  }, []);
{/*
  useEffect(() => {
    fetch("/api/map/embed")
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar el mapa");
        return res.json();
      })
      .then((data) => {
        // Extract src from the iframe string
        const match = data.embed.match(/src=\"([^\"]+)\"/);
        if (match && match[1]) {
          setMapUrl(match[1]);
        }
      })
      .finally(() => setMapLoading(false));
  }, []);
*/}
  return (
    <>
      <Helmet title="Home" />
      {/*<Box bg={"#3B72FF"} w={"full"}>*/}
      <Box bg={"#A5D6A7"} w={"full"}>
        <HeroSection />
      </Box>
      <SimpleGrid
        mt={"-7rem"}
        as={Container}
        maxW="full"
        spacing={9}
        columns={[1, null, 3]}
        bg={"#A5D6A7"}

      >
        {cardsData.map((card, index) => (
          <CardComponent
            key={index}
            title={card.title}
            content={card.content}
            icon={card.icon}
            boxShadow={card.boxShadow}
          />
        ))}
      </SimpleGrid>
      <Box pt={10} bg={"#A5D6A7"}>
        <Heading textAlign={"center"}>Servicios</Heading>
        <Container maxW="4xl" py={6}>
          {loading ? (
            <Center><Text>Cargando...</Text></Center>
          ) : error ? (
            <Text color="red.500" textAlign="center">{error}</Text>
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
              {services.map((service: { id: number; name: string }) => (
                <Box key={service.id} p={6} bg="white" borderRadius="xl" boxShadow="lg" textAlign="center">
                  <Text fontWeight="bold" fontSize="xl" color="#3B72FF">{service.name}</Text>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Container>
      </Box>
      <Container maxW="full" bg={"#A5D6A7"} py={16}>
        <Stack direction={{ base: "column", md: "row" }} justifyContent="center" alignItems="center" spacing={8}>
          <Image
            w="100%"
            h="100%"
            minW={{ base: "auto", md: "30rem" }}
            objectFit="cover"
            src={`/svg/Blog.jpeg`}
            rounded="md"
            maxW={300}
            fallback={<Skeleton />}
          />
          <Stack direction="column" spacing={6} justifyContent="center" maxW="480px">
            <Heading as="h2" fontSize="3xl" color="#3B72FF">Blog</Heading>
            <Text fontSize="1.2rem" lineHeight="1.375" fontWeight="400">
              No nos conformamos con lo promedio. Nuestro objetivo es servirte y tratarte con métodos juiciosos. Clínicamente, esto repercute en la predictibilidad y alta durabilidad del trabajo realizado. Descubre más sobre salud, bienestar y novedades en nuestro blog.
            </Text>
            <Button as={RouterLink} to="/specialists" colorScheme="blue" size="lg" alignSelf="flex-start">
              Ver el blog
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
