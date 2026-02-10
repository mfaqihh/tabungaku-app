"use client";

import {
  Box,
  Text,
  VStack,
  HStack,
  Flex,
  Progress,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  LuPiggyBank,
  LuArrowRight,
} from "react-icons/lu";
import Link from "next/link";
import { useSavingsStore } from "@/stores/savingsStore";
import { formatCurrency } from "@/lib/utils/currency";

export function SavingsOverview() {
  const savingsGoals = useSavingsStore((state) => state.savingsGoals);
  const activeSavings = savingsGoals.filter((s) => s.isActive);

  // Calculate total
  const totalSavings = activeSavings.reduce(
    (sum, s) => sum + s.currentAmount,
    0
  );

  // Get top 3 by progress percentage
  const top3Savings = [...activeSavings]
    .sort((a, b) => {
      const progressA = a.targetAmount > 0
        ? (a.currentAmount / a.targetAmount) * 100
        : 0;
      const progressB = b.targetAmount > 0
        ? (b.currentAmount / b.targetAmount) * 100
        : 0;
      return progressB - progressA;
    })
    .slice(0, 3);

  return (
    <Box
      bg="white"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.200"
      overflow="hidden"
      _dark={{
        bg: "gray.800",
        borderColor: "gray.700",
      }}
    >
      {/* Header */}
      <Flex
        justify="space-between"
        align="center"
        px={5}
        py={4}
        borderBottom="1px solid"
        borderColor="gray.100"
        _dark={{ borderColor: "gray.700" }}
      >
        <Text
          fontSize="sm"
          fontWeight="semibold"
          color="gray.900"
          _dark={{ color: "white" }}
        >
          Tabungan Saya
        </Text>
        <Link href="/tabungan">
          <HStack
            gap={1}
            color="teal.600"
            fontSize="xs"
            fontWeight="medium"
            cursor="pointer"
            _hover={{ color: "teal.700" }}
            _dark={{ color: "teal.400", _hover: { color: "teal.300" } }}
          >
            <Text>Lihat Semua</Text>
            <LuArrowRight size={14} />
          </HStack>
        </Link>
      </Flex>

      {/* Content Grid */}
      <Box p={5}>
        {activeSavings.length === 0 ? (
          <Flex
            direction="column"
            align="center"
            justify="center"
            py={8}
            gap={2}
          >
            <Box
              p={3}
              bg="gray.100"
              borderRadius="full"
              _dark={{ bg: "gray.700" }}
            >
              <LuPiggyBank size={24} color="gray" />
            </Box>
            <Text
              fontSize="sm"
              color="gray.500"
              textAlign="center"
              _dark={{ color: "gray.400" }}
            >
              Belum ada tabungan.
            </Text>
            <Text fontSize="xs" color="gray.400" textAlign="center">
              Buat target tabunganmu!
            </Text>
          </Flex>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 4 }} gap={4}>
            {/* Total Savings Card */}
            <Box p={4} borderRadius="lg" bg="teal.600" color="white">
              <Flex justify="space-between" align="center" mb={3}>
                <Text
                  fontSize="xs"
                  opacity={0.8}
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  Total Tabungan
                </Text>
                <Box p={2} bg="whiteAlpha.200" borderRadius="lg">
                  <LuPiggyBank size={18} />
                </Box>
              </Flex>
              <Text fontSize="xl" fontWeight="bold">
                {formatCurrency(totalSavings)}
              </Text>
              <Text fontSize="xs" opacity={0.8} mt={1}>
                {activeSavings.length} target aktif
              </Text>
            </Box>

            {/* Top 3 Savings Goals */}
            {top3Savings.map((goal) => {
              const percentage =
                goal.targetAmount > 0
                  ? Math.round(
                      (goal.currentAmount / goal.targetAmount) * 100
                    )
                  : 0;

              return (
                <Box
                  key={goal.id}
                  p={4}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="gray.200"
                  _dark={{ borderColor: "gray.700" }}
                >
                  <Flex justify="space-between" align="center" mb={3}>
                    <HStack gap={2}>
                      <Box
                        p={2}
                        bg="teal.50"
                        color="teal.600"
                        borderRadius="lg"
                        _dark={{ bg: "teal.900/50", color: "teal.300" }}
                        fontSize="lg"
                      >
                        {goal.icon || "💰"}
                      </Box>
                      <Text
                        fontSize="sm"
                        fontWeight="medium"
                        color="gray.900"
                        _dark={{ color: "white" }}
                      >
                        {goal.name}
                      </Text>
                    </HStack>
                    <Text
                      fontSize="xs"
                      fontWeight="semibold"
                      color="teal.600"
                      _dark={{ color: "teal.400" }}
                    >
                      {percentage}%
                    </Text>
                  </Flex>

                  <Progress.Root
                    value={percentage}
                    size="xs"
                    colorPalette="teal"
                  >
                    <Progress.Track
                      bg="gray.100"
                      borderRadius="full"
                      _dark={{ bg: "gray.700" }}
                    >
                      <Progress.Range borderRadius="full" />
                    </Progress.Track>
                  </Progress.Root>

                  <Flex justify="space-between" mt={2}>
                    <Text fontSize="xs" color="gray.500">
                      {formatCurrency(goal.currentAmount)}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {formatCurrency(goal.targetAmount)}
                    </Text>
                  </Flex>
                </Box>
              );
            })}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
}
