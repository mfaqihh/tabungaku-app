"use client";

import { Box, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <Box
      w="full"
      maxW="md"
      mx="auto"
      p={{ base: 6, md: 8 }}
      bg="white"
      borderRadius="2xl"
      border="1px solid"
      borderColor="gray.200"
      boxShadow="sm"
      _dark={{
        bg: "gray.800",
        borderColor: "gray.700",
      }}
    >
      <VStack gap={6} align="stretch">
        {children}
      </VStack>
    </Box>
  );
}
