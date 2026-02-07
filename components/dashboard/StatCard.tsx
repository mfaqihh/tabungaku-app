"use client";

import { Box, Text, VStack, HStack, Flex } from "@chakra-ui/react";
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
  const changeConfig = {
    positive: { color: "green.500", darkColor: "green.400", prefix: "↑" },
    negative: { color: "red.500", darkColor: "red.400", prefix: "↓" },
    neutral: { color: "gray.500", darkColor: "gray.400", prefix: "" },
  };

  const config = changeConfig[changeType];

  return (
    <Box
      bg="white"
      borderRadius="xl"
      p={5}
      border="1px solid"
      borderColor="gray.200"
      transition="all 0.2s ease"
      _hover={{
        borderColor: "gray.300",
        shadow: "sm",
      }}
      _dark={{
        bg: "gray.800",
        borderColor: "gray.700",
        _hover: { borderColor: "gray.600" },
      }}
    >
      <Flex justify="space-between" align="flex-start" gap={4}>
        <VStack align="flex-start" gap={1} flex={1} minW={0}>
          <Text
            fontSize="xs"
            fontWeight="medium"
            color="gray.500"
            textTransform="uppercase"
            letterSpacing="wide"
            _dark={{ color: "gray.400" }}
          >
            {title}
          </Text>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="gray.900"
            lineHeight="tight"
            _dark={{ color: "white" }}
          >
            {value}
          </Text>
          {change && (
            <Text
              fontSize="xs"
              color={config.color}
              fontWeight="medium"
              _dark={{ color: config.darkColor }}
            >
              {config.prefix} {change}
            </Text>
          )}
        </VStack>
        <Box
          p={2.5}
          borderRadius="lg"
          bg={`${colorScheme}.50`}
          color={`${colorScheme}.600`}
          flexShrink={0}
          _dark={{
            bg: `${colorScheme}.900/50`,
            color: `${colorScheme}.300`,
          }}
        >
          {icon}
        </Box>
      </Flex>
    </Box>
  );
}

