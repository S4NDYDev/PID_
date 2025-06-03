import React, { useState } from 'react';
import { useNavigate, Link as ReactLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Alert,
  AlertIcon,
  Link,
} from '@chakra-ui/react';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      if (!res.ok) {
        if (res.status === 400) setError('El usuario ya existe');
        else setError('Error al registrarse');
        return;
      }
      const data = await res.json();
      localStorage.setItem('jwt', data.token);
      localStorage.setItem('username', data.username);
      window.location.replace("/"); // quick fix: force reload
      navigate('/');
    } catch (err) {
      setError('Error de red');
    }
  };

  return (
    <Container maxW="full" py={12} bg={"#A5D6A7"}>
      <Box
        bg="white"
        boxShadow="lg"
        borderRadius="xl"
        p={8}
        mt={24}
        maxW={"30rem"}
        mx={"auto"}
      >
        <Heading as="h2" size="lg" textAlign="center" mb={6} color="#3B72FF">
          Registrarse
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Usuario</FormLabel>
              <Input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Tu usuario"
                autoFocus
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Correo electrónico</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Tu contraseña"
              />
            </FormControl>
            {error && (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                {error}
              </Alert>
            )}
            <Button type="submit" colorScheme="blue" size="lg" w="full">
              Registrarse
            </Button>
          </Stack>
        </form>
        <Text textAlign="center" mt={4}>
          ¿Ya tienes una cuenta?{' '}
          <Link as={ReactLink} to="/login" color="blue.500">
            Iniciar sesión
          </Link>
        </Text>
      </Box>
    </Container>
  );
};

export default Register;
