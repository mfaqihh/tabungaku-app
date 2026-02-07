"use client";

import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  colorScheme?: string;
}

export function StatCard({
  title,
  value,
  icon,
  change,
  changeType = "neutral",
  colorScheme = "teal",
}: StatCardProps) {
  const changeColors = {
    positive: "green.500",
    negative: "red.500",
    neutral: "gray.500",
  };

  return (
    <Box
      bg="white"
      borderRadius="2xl"
      p={6}
      boxShadow="sm"
      border="1px solid"
      borderColor="gray.100"
      transition="all 0.2s ease"
      _hover={{
        boxShadow: "md",
        transform: "translateY(-2px)",
      }}
      _dark={{
        bg: "gray.800",
        borderColor: "gray.700",
      }}
    >
      <HStack justify="space-between" align="flex-start">
        <VStack align="flex-start" gap={1}>
          <Text
            fontSize="sm"
            fontWeight="medium"
            color="gray.500"
            _dark={{ color: "gray.400" }}
          >
            {title}
          </Text>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="gray.800"
            _dark={{ color: "white" }}
          >
            {value}
          </Text>
          {change && (
            <Text fontSize="xs" color={changeColors[changeType]}>
              {change}
            </Text>
          )}
        </VStack>
        <Box
          p={3}
          borderRadius="xl"
          bg={`${colorScheme}.50`}
          color={`${colorScheme}.500`}
          _dark={{
            bg: `${colorScheme}.900`,
            color: `${colorScheme}.200`,
          }}
        >
          {icon}
        </Box>
      </HStack>
    </Box>
  );
}

