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

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        if (res.status === 401) setError('Credenciales inválidas');
        else setError('Error al iniciar sesión');
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
          Iniciar Sesión
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
              Entrar
            </Button>
          </Stack>
        </form>
        <Text textAlign="center" mt={4}>
          ¿No tienes una cuenta?{' '}
          <Link as={ReactLink} to="/register" color="blue.500">
            Regístrate
          </Link>
        </Text>
      </Box>
    </Container>
  );
};

export default Login;
