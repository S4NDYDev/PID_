import React, { useEffect, useState } from "react";
import { Box, Center, Container, Image, Stack, Text, chakra, SimpleGrid, Spinner ,  UnorderedList,
  ListItem } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";

export default function Services() {
  const [services, setServices] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [banner, setBanner] = useState<{ title: string; subtitle: string } | null>(null);
  const [bannerLoading, setBannerLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar servicios");
        return res.json();
      })
      .then((data) => setServices(data))
      .catch(() => setError("No se pudieron cargar los servicios."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch("/api/services/banner")
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar banner");
        return res.json();
      })
      .then(data => setBanner({ title: data.title, subtitle: data.subtitle }))
      .catch(() => setBanner({ title: "Servicios", subtitle: "Descubre nuestros servicios disponibles para tu bienestar integral." }))
      .finally(() => setBannerLoading(false));
  }, []);

  return (
    <>
      <Helmet title={banner?.title || "Servicios"} />
      {/*<Box bg={"#3B72FF"}> */}
      <Box bg={"#A5D6A7"}>
        <Container color="black" maxW="5xl" px={{ base: 6, md: 3 }} pt={24}>
          <Stack direction={{ base: "column", md: "row" }} justifyContent="center">
            <Stack direction="column" spacing={6} justifyContent="center" maxW="480px">
              <chakra.h1 fontSize="5xl" lineHeight={1} fontWeight="bold" textAlign="left">
                {bannerLoading ? <Spinner size="sm" /> : (banner?.title || "Servicios")}
              </chakra.h1>
              <Text fontSize="1.2rem" textAlign="left" lineHeight="1.375" fontWeight="400">
                {bannerLoading ? <Spinner size="sm" /> : (banner?.subtitle || "Descubre nuestros servicios disponibles para tu bienestar integral.")}
              </Text>
            </Stack>
            <Center ml={{ base: 0, md: 5 }}>
              <Image w="200px" minW={{ base: "auto", md: "20rem" }} minH={{ base: "auto", md: "20rem" }} objectFit="cover" src={`/svg/Services.jpg`} borderRadius="full" />
            </Center>
          </Stack>
        </Container>
      </Box>
      <Container maxW="full" py={10} bg={"#A5D6A7"}>
        {loading ? (
          <Center><Spinner size="xl" /></Center>
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

        <Box pt={10} bg={"#A5D6A7"}>
          <Container maxW="full" py={6}>
            {loading ? (
              <Center>
                <Text fontSize="lg">Cargando...</Text>
              </Center>
            ) : error ? (
              <Text color="red.500" textAlign="center" fontSize="lg">
                {error}
              </Text>
            ) : (
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
                {/* Terapias Físicas */}
                <Box p={6} bg="white" borderRadius="xl" boxShadow="lg" textAlign="center">
                  <Text fontWeight="bold" fontSize="2xl" color="#3B72FF">
                    Terapias Físicas
                  </Text>
                  <Text mt={4} fontSize="lg">
                    Alivio del dolor, mejora de la movilidad y recuperación acelerada.
                  </Text>
                  <Text fontWeight="bold" mt={2} fontSize="lg">Servicios:</Text>
                  <UnorderedList fontSize="lg">
                    <ListItem>Fisioterapia personalizada</ListItem>
                    <ListItem>Rehabilitación deportiva</ListItem>
                    <ListItem>Terapia manual</ListItem>
                  </UnorderedList>
                  <Text mt={4} fontSize="lg">¡Agenda tu evaluación!</Text>
                </Box>
        
                {/* Nutrición Integral */}
                <Box p={6} bg="white" borderRadius="xl" boxShadow="lg" textAlign="center">
                  <Text fontWeight="bold" fontSize="2xl" color="#3B72FF">
                    Nutrición Integral
                  </Text>
                  <Text mt={4} fontSize="lg">
                    Planes personalizados para tus metas de salud.
                  </Text>
                  <Text fontWeight="bold" mt={2} fontSize="lg">Enfoques:</Text>
                  <UnorderedList fontSize="lg">
                    <ListItem>Asesoría nutricional</ListItem>
                    <ListItem>Planes veganos/vegetarianos</ListItem>
                    <ListItem>Nutrición deportiva</ListItem>
                  </UnorderedList>
                  <Text mt={4} fontSize="lg">Transforma tu salud.</Text>
                </Box>
        
                {/* Mindfulness y Bienestar Emocional */}
                <Box p={6} bg="white" borderRadius="xl" boxShadow="lg" textAlign="center">
                  <Text fontWeight="bold" fontSize="2xl" color="#3B72FF">
                    Mindfulness y Bienestar
                  </Text>
                  <Text mt={4} fontSize="lg">
                    Gestión del estrés, ansiedad y mejora del bienestar.
                  </Text>
                  <Text fontWeight="bold" mt={2} fontSize="lg">Opciones:</Text>
                  <UnorderedList fontSize="lg">
                    <ListItem>Mindfulness y meditación</ListItem>
                    <ListItem>Reducción de estrés (MBSR)</ListItem>
                    <ListItem>Yoga terapéutico</ListItem>
                  </UnorderedList>
                  <Text mt={4} fontSize="lg">Vive en el presente.</Text>
                </Box>
              </SimpleGrid>
            )}
          </Container>
        </Box>



      </Container>
    </>
  );
}
