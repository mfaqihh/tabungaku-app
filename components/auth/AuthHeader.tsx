"use client";

import { Heading, Text, VStack, Icon, Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface AuthHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthHeader({ icon, title, subtitle }: AuthHeaderProps) {
  return (
    <VStack gap={3} textAlign="center">
      <Box
        p={3}
        bg="teal.50"
        borderRadius="xl"
        color="teal.600"
        _dark={{
          bg: "teal.900",
          color: "teal.200",
        }}
      >
        {icon}
      </Box>
      <VStack gap={1}>
        <Heading
          as="h1"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          color="gray.900"
          _dark={{ color: "white" }}
        >
          {title}
        </Heading>
        <Text
          fontSize="sm"
          color="gray.600"
          _dark={{ color: "gray.400" }}
        >
          {subtitle}
        </Text>
      </VStack>
    </VStack>
  );
}
