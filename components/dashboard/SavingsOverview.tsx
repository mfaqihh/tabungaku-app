"use client";

import { Box, Text, VStack, HStack, Icon, Progress } from "@chakra-ui/react";
import { LuPiggyBank, LuTarget } from "react-icons/lu";

interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  icon: string;
}

const savingsGoals: SavingsGoal[] = [
  { id: "1", name: "Dana Darurat", target: 30000000, current: 18500000, icon: "🛡️" },
  { id: "2", name: "Liburan", target: 10000000, current: 4200000, icon: "✈️" },
  { id: "3", name: "Gadget Baru", target: 5000000, current: 3750000, icon: "📱" },
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function SavingsOverview() {
  const totalSavings = savingsGoals.reduce((acc, goal) => acc + goal.current, 0);

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
          Tabungan Saya
        </Text>
        <Text
          fontSize="sm"
          color="teal.500"
          fontWeight="medium"
          cursor="pointer"
          _hover={{ color: "teal.600" }}
        >
          Lihat Semua
        </Text>
      </HStack>

      {/* Total Savings Card */}
      <Box
        bg="linear-gradient(135deg, #319795 0%, #2C7A7B 100%)"
        borderRadius="xl"
        p={5}
        mb={5}
        color="white"
      >
        <HStack justify="space-between" align="flex-start">
          <VStack align="flex-start" gap={1}>
            <Text fontSize="sm" opacity={0.9}>
              Total Tabungan
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              {formatCurrency(totalSavings)}
            </Text>
          </VStack>
          <Box
            p={3}
            bg="whiteAlpha.200"
            borderRadius="xl"
          >
            <LuPiggyBank size={24} />
          </Box>
        </HStack>
      </Box>

      {/* Savings Goals */}
      <VStack gap={4} align="stretch">
        {savingsGoals.map((goal) => {
          const percentage = Math.round((goal.current / goal.target) * 100);

          return (
            <Box
              key={goal.id}
              p={4}
              borderRadius="xl"
              bg="gray.50"
              _dark={{ bg: "gray.700" }}
            >
              <HStack justify="space-between" mb={3}>
                <HStack gap={2}>
                  <Text fontSize="lg">{goal.icon}</Text>
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    color="gray.700"
                    _dark={{ color: "gray.200" }}
                  >
                    {goal.name}
                  </Text>
                </HStack>
                <Text fontSize="xs" color="gray.500">
                  {percentage}%
                </Text>
              </HStack>
              <Progress.Root
                value={percentage}
                size="sm"
                borderRadius="full"
                colorPalette="teal"
              >
                <Progress.Track bg="gray.200" _dark={{ bg: "gray.600" }}>
                  <Progress.Range />
                </Progress.Track>
              </Progress.Root>
              <HStack justify="space-between" mt={2}>
                <Text fontSize="xs" color="gray.500">
                  {formatCurrency(goal.current)}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {formatCurrency(goal.target)}
                </Text>
              </HStack>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
}
