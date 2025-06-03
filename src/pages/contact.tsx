import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Heading,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("No se pudo enviar el mensaje.");
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("No se pudo enviar el mensaje. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="full" py={16} bg={"#A5D6A7"}>
      <Heading as="h1" mb={8} color="#3B72FF" textAlign="center">
        Contáctanos
      </Heading>
      {success && (
        <Alert status="success" mb={6} borderRadius="md">
          <AlertIcon />
          <AlertTitle>¡Mensaje enviado!</AlertTitle>
          <AlertDescription>Gracias por contactarnos. Te responderemos pronto.</AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" onClick={() => setSuccess(false)} />
        </Alert>
      )}
      {error && (
        <Alert status="error" mb={6} borderRadius="md">
          <AlertIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" onClick={() => setError("")} />
        </Alert>
      )}
      <Box as="form" onSubmit={handleSubmit} bg="white" p={8} borderRadius="xl" boxShadow="lg" width={"40rem"} mx="auto">
        <Stack spacing={5}>
          <FormControl isRequired>
            <FormLabel>Nombre</FormLabel>
            <Input name="name" value={form.name} onChange={handleChange} placeholder="Tu nombre" maxW="20rem"/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="tu@email.com" maxW="20rem"/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Mensaje</FormLabel>
            <Textarea name="message" value={form.message} onChange={handleChange} placeholder="Escribe tu mensaje aquí..." rows={5} />
          </FormControl>
          <Button type="submit" colorScheme="blue" isLoading={loading}>
            Enviar mensaje
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
