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
      p={{ base: 6, md: 10 }}
      bg="white"
      borderRadius="2xl"
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      _dark={{
        bg: "gray.800",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
      }}
    >
      <VStack gap={6} align="stretch">
        {children}
      </VStack>
    </Box>
  );
}
