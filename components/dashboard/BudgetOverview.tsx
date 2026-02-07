"use client";

import { Box, Text, VStack, HStack, Progress } from "@chakra-ui/react";

interface BudgetItem {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  color: string;
}

const budgetItems: BudgetItem[] = [
  { id: "1", name: "Kebutuhan Pokok", allocated: 3000000, spent: 2100000, color: "teal" },
  { id: "2", name: "Transportasi", allocated: 1000000, spent: 750000, color: "blue" },
  { id: "3", name: "Hiburan", allocated: 500000, spent: 480000, color: "purple" },
  { id: "4", name: "Tagihan", allocated: 1500000, spent: 1200000, color: "orange" },
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function BudgetOverview() {
  return (
    <Box
      bg="white"
      borderRadius="2xl"
      p={6}
      boxShadow="sm"
      border="1px solid"
      borderColor="gray.100"
      _dark={{
        bg: "gray.800",
        borderColor: "gray.700",
      }}
    >
      <HStack justify="space-between" mb={5}>
        <Text
          fontSize="lg"
          fontWeight="semibold"
          color="gray.800"
          _dark={{ color: "white" }}
        >
          Budget Bulan Ini
        </Text>
        <Text
          fontSize="sm"
          color="teal.500"
          fontWeight="medium"
          cursor="pointer"
          _hover={{ color: "teal.600" }}
        >
          Kelola Budget
        </Text>
      </HStack>

      <VStack gap={5} align="stretch">
        {budgetItems.map((item) => {
          const percentage = Math.round((item.spent / item.allocated) * 100);
          const isOverBudget = percentage > 100;
          const isNearLimit = percentage >= 80 && percentage <= 100;

          return (
            <VStack key={item.id} gap={2} align="stretch">
              <HStack justify="space-between">
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  color="gray.700"
                  _dark={{ color: "gray.300" }}
                >
                  {item.name}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {formatCurrency(item.spent)} / {formatCurrency(item.allocated)}
                </Text>
              </HStack>
              <Progress.Root
                value={Math.min(percentage, 100)}
                size="sm"
                borderRadius="full"
                colorPalette={isOverBudget ? "red" : isNearLimit ? "orange" : item.color}
              >
                <Progress.Track bg="gray.100" _dark={{ bg: "gray.700" }}>
                  <Progress.Range />
                </Progress.Track>
              </Progress.Root>
              <HStack justify="space-between">
                <Text
                  fontSize="xs"
                  color={isOverBudget ? "red.500" : isNearLimit ? "orange.500" : "gray.500"}
                >
                  {percentage}% terpakai
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Sisa: {formatCurrency(Math.max(item.allocated - item.spent, 0))}
                </Text>
              </HStack>
            </VStack>
          );
        })}
      </VStack>
    </Box>
  );
}
