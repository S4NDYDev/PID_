import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Heading,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Spinner,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";
import { useAuth } from "../components/AuthContext";

export default function Appointments() {
  const { token } = useAuth();
  const [services, setServices] = useState<{ id: number; name: string }[]>([]);
  const [selectedService, setSelectedService] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [fetchingAppointments, setFetchingAppointments] = useState(false);

  useEffect(() => {
    fetch("/api/services")
      .then(res => res.json())
      .then(data => setServices(data))
      .finally(() => setLoading(false));
  }, []);

  const fetchAppointments = () => {
    if (!token) return;
    setFetchingAppointments(true);
    fetch("/api/appointments", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setAppointments(data))
      .finally(() => setFetchingAppointments(false));
  };

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBooking(true);
    setError("");
    setSuccess(false);
    try {
      let utcDateTime = "";
      if (dateTime) {
        const local = new Date(dateTime);
        utcDateTime = local.toISOString(); // always UTC
      }
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceId: Number(selectedService),
          dateTime: utcDateTime,
        }),
      });
      if (!res.ok) throw new Error("No se pudo reservar la cita.");
      setSuccess(true);
      setSelectedService("");
      setDateTime("");
      fetchAppointments();
    } catch {
      setError("No se pudo reservar la cita. Intenta nuevamente.");
    } finally {
      setBooking(false);
    }
  };

  if (!token) {
    return (
      <Container maxW="lg" py={16}>
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <AlertTitle>Acceso restringido</AlertTitle>
          <AlertDescription>Debes iniciar sesión para acceder al sistema de citas.</AlertDescription>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW="full" py={16} bg={"#A5D6A7"}>
      <Heading as="h1" mb={8} color="#3B72FF" textAlign="center">
        Reservar una cita
      </Heading>
      {success && (
        <Alert status="success" mb={6} borderRadius="md">
          <AlertIcon />
          <AlertTitle>¡Cita reservada!</AlertTitle>
          <AlertDescription>Tu cita ha sido registrada correctamente.</AlertDescription>
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
      <Box as="form" onSubmit={handleSubmit} bg="white" p={8} borderRadius="xl" boxShadow="lg" mb={10} width={"40rem"} mx="auto">
        <Stack spacing={5}>
          <FormControl isRequired>
            <FormLabel>Servicio</FormLabel>
            <Select
              name="service"
              placeholder="Selecciona un servicio"
              value={selectedService}
              onChange={e => setSelectedService(e.target.value)}
            >
              {services.map((service) => (
                <option key={service.id} value={service.id}>{service.name}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Fecha y hora</FormLabel>
            <Input
              type="datetime-local"
              name="dateTime"
              value={dateTime}
              onChange={e => setDateTime(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
            />
          </FormControl>
          <Button type="submit" colorScheme="green" isLoading={booking}>
            Reservar cita
          </Button>
        </Stack>
      </Box>
      <Divider my={8} />
      <Heading as="h2" size="md" mb={4} color="#3B72FF">Mis citas</Heading>
      {fetchingAppointments ? (
        <Spinner />
      ) : appointments.length === 0 ? (
        <Text>No tienes citas registradas.</Text>
      ) : (
        <SimpleGrid columns={1} spacing={4}>
          {appointments.map((appt: any) => (
            <Box key={appt.id} p={4} borderRadius="md" boxShadow="md" bg="gray.50">
              <Text><b>Servicio:</b> {appt.serviceName || appt.service?.name || appt.serviceId}</Text>
              <Text><b>Fecha y hora:</b> {new Date(appt.dateTime).toLocaleString()}</Text>
              <Text><b>Estado:</b> {appt.status || "Confirmada"}</Text>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
