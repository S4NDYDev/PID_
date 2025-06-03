import React, { useState } from "react";
import {
  Container,
  Stack,
  chakra,
  Text,
  Image,
  SimpleGrid,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Heading
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";

const BlogPage = () => {
  // Estados simplificados
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPost, setSelectedPost] = useState(null);

  const staticPosts = [
    {
      id: "estatico-1",
      title: "Terapia de Relajación Avanzada",
      image: "/public/svg/terapia-relajacion.jpg",
      details: "Nuestra terapia combina:\n\n• Técnicas de respiración guiada\n• Musicoterapia con frecuencias binaurales\n• Aromaterapia con aceites esenciales",
      category: "Bienestar Emocional"
    },
    {
      id: "estatico-2",
      title: "Nutrición Holística",
      image: "/public/svg/nutricion-holistica.jpg",
      details: "Programa personalizado que incluye:\n\n1. Análisis de metabolismo basal\n2. Plan alimenticio antiinflamatorio\n3. Suplementación natural",
      category: "Salud Integral"
    }
  ];

  const bannerData = {
    title: "Blog de Bienestar Integral",
    subtitle: "Descubre técnicas para una vida equilibrada"
  };

  const handleOpen = (post) => {
    setSelectedPost(post);
    onOpen();
  };

  return (
    <>
      <Helmet title={bannerData.title} />
      
      <Container color="#3B72FF" bg="#A5D6A7" maxW="full" px={{ base: 6, md: 3 }} pt={24}>
        <Stack direction={{ base: "column", md: "row" }} justifyContent="center">
          <Stack direction="column" spacing={6} justifyContent="center" maxW="480px">
            <chakra.h1 fontSize="5xl" lineHeight={1} fontWeight="bold" textAlign="left">
              {bannerData.title}
            </chakra.h1>
            <Text fontSize="1.2rem" textAlign="left" lineHeight="1.375" fontWeight="400">
              {bannerData.subtitle}
            </Text>
          </Stack>
          <Image 
            w="200px" 
            minW={{ base: "auto", md: "20rem" }} 
            minH={{ base: "auto", md: "20rem" }} 
            objectFit="cover" 
            src="/svg/Blog.jpg" 
            borderRadius="full" 
            alt="Blog de bienestar"
          />
        </Stack>
      </Container>

      <Container maxW="5xl" py={10}>
        <Heading as="h2" size="lg" mb={8} color="#3B72FF" textAlign="center">
          Nuestros Artículos
        </Heading>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {staticPosts.map((post) => (
            <Box 
              key={post.id}
              p={6}
              bg="white"
              borderRadius="xl"
              boxShadow="lg"
              textAlign="center"
            >
              <Image 
                src={post.image} 
                alt={post.title} 
                borderRadius="md" 
                mb={4} 
                maxH="180px" 
                mx="auto" 
                objectFit="cover" 
              />
              <Text fontSize="sm" color="gray.500" mb={1}>
                {post.category}
              </Text>
              <Text fontWeight="bold" fontSize="xl" color="#3B72FF" mb={2}>
                {post.title}
              </Text>
              <Button 
                colorScheme="blue" 
                variant="outline" 
                onClick={() => handleOpen(post)}
              >
                Ver detalles
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </Container>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedPost?.title}
            <Text fontSize="sm" color="gray.500">
              {selectedPost?.category}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image 
              src={selectedPost?.image} 
              alt={selectedPost?.title} 
              borderRadius="md" 
              mb={4} 
              maxH="240px" 
              w="full"
              objectFit="cover" 
            />
            <Text whiteSpace="pre-line">{selectedPost?.details}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BlogPage;