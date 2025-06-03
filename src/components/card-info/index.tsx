import React from 'react';
import { Card, CardHeader, Heading, CardBody, Text, Flex, Image } from '@chakra-ui/react';

interface CardProps {
  title: string;
  content: string;
  icon: string;
  boxShadow: string;
}

const CardComponent: React.FC<CardProps> = ({ title, content, icon, boxShadow }) => {
  return (
    <Card textAlign={'center'} boxShadow={boxShadow}>
      <CardHeader>
        <Flex justify={"center"} align={"center"} mb={5}>
          <Image src={icon} alt={`${title} icon`} boxSize="90px" />
        </Flex>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardBody>
        <Text>{content}</Text>
      </CardBody>
    </Card>
  );
};

export default CardComponent;