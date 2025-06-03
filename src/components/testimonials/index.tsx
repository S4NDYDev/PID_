import {
  Container,
  Text,
  HStack,
  Flex,
  Box,
  Avatar,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";

interface TestimonialType {
  name: string;
  job: string;
  content: string;
  image: string;
}

const testimonials: TestimonialType[] = [
  {
    name: "Paul James",
    job: "Designer",
    image:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80",
    content: `We are not satisfied with the average. Our goal is to serve you and treat you with judicious methods. Clinically, this has repercussions on the predictability and high durability of the work performed.`,
  },
  {
    name: "Yasmin",
    job: "Accountant",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80",
    content: `We are not satisfied with the average. Our goal is to serve you and treat you with judicious methods. Clinically, this has repercussions on the predictability and high durability of the work performed.`,
  },
  {
    name: "Olivia",
    job: "Developer",
    image:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1286&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: `We are not satisfied with the average. Our goal is to serve you and treat you with judicious methods. Clinically, this has repercussions on the predictability and high durability of the work performed.`,
  },
  {
    name: "Elizabette",
    job: "Video editor",
    image:
      "https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?q=80&w=1344&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: `We are not satisfied with the average. Our goal is to serve you and treat you with judicious methods. Clinically, this has repercussions on the predictability and high durability of the work performed.`,
  },
];

const Testimonials = () => {
  return (
    <Container maxW="4xl" p={{ base: 5, md: 10 }}>
      <Heading as={"h2"} textAlign={"center"} mb={7}>
        Testimonials
      </Heading>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        placeItems="center"
        spacing={10}
        my={2}
      >
        {testimonials.map((data, index) => (
          <Flex
            key={index}
            direction="column"
            p={2}
            borderWidth={2}
            borderColor={"#3B72FF"}
            rounded={"32px"}
          >
            <Box
              p={5}
              color="gray.500"
              borderTopLeftRadius="lg"
              borderTopRightRadius="lg"
            >
              {data.content}
            </Box>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              p={5}
              borderBottomLeftRadius="lg"
              borderBottomRightRadius="lg"
            >
              <HStack spacing={2}>
                <Avatar name="avatar" src={data.image} objectFit={"cover"} />
                <Flex direction="column">
                  <Text fontWeight="bold" fontSize="lg" color={"#3B72FF"}>
                    {data.name}
                  </Text>
                  <Text fontSize="md" color="gray.500">
                    {data.job}
                  </Text>
                </Flex>
              </HStack>
            </Flex>
          </Flex>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Testimonials;
