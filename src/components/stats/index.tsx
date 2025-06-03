import {
  HStack,
  VStack,
  Text,
  useColorModeValue,
  Flex,
  Icon,
  SimpleGrid,
  Container,
  Stack
} from '@chakra-ui/react';
// Here we have used framer-motion package for animations
import { motion } from 'framer-motion';
// Here we have used react-icons package for the icons
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineLike, AiOutlineEye } from 'react-icons/ai';
import { IconType } from 'react-icons'
interface StatData {
  id: number;
  label: string;
  icon: IconType;
}

const statData: StatData[] = [
  {
    id: 1,
    label: 'Checkup',
    icon: AiOutlineLike,
  },
  {
    id: 2,
    label: 'Dental cleaning',
    icon: AiOutlineEye,
  },
  {
    id: 3,
    label: 'Pediatric dentistry',
    icon: HiOutlineMail,
  },
  {
    id: 4,
    label: 'General practitioner',
    icon: HiOutlineMail,
  },
  {
    id: 5,
    label: 'Aesthetics',
    icon: HiOutlineMail,
  },
  {
    id: 6,
    label: 'Dental documents',
    icon: HiOutlineMail,
  }
];

const StatsWithIcons = () => {
  return (
    <Container maxW="4xl" p={{ base: 5, md: 10 }}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5} mt={6} mb={4}>
        {statData.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

const Card = ({ data }: { data: StatData }) => {
  return (
    <motion.div whileHover={{ translateY: -5 }}>
      <Stack
        direction="column"
        rounded="md"
        boxShadow={useColorModeValue(
          '0 4px 6px rgba(160, 174, 192, 0.6)',
          '2px 4px 6px rgba(9, 17, 28, 0.9)'
        )}
        textAlign="left"
        align="start"
        spacing={0}
        role="group"
        overflow="hidden"
      >
        <HStack py={2} px={2} spacing={4} w="100%" cursor={"pointer"}>
          <Flex
            justifyContent="center"
            alignItems="center"
            rounded="full"
            p={2}
            bg="blue.400"
            position="relative"
            w={12}
            h={12}
            overflow="hidden"
            lineHeight={0}
            boxShadow="inset 0 0 1px 1px rgba(0, 0, 0, 0.015)"
          >
            <Icon as={data.icon} w={6} h={6} color="white" />
          </Flex>
          <VStack spacing={0} align="start" maxW="lg" h="100%">
            <Text as="h3" fontSize="md" noOfLines={2}>
              {data.label}
            </Text>
          </VStack>
        </HStack>
      </Stack>
    </motion.div>
  );
};

export default StatsWithIcons;