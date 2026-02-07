"use client";

import { Box, Text, VStack, HStack, Flex, Progress, Icon, SimpleGrid } from "@chakra-ui/react";
import { LuPiggyBank, LuArrowRight, LuShield, LuPlane, LuSmartphone } from "react-icons/lu";
import Link from "next/link";
import { ReactNode } from "react";

interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  icon: ReactNode;
}

const savingsGoals: SavingsGoal[] = [
  { id: "1", name: "Dana Darurat", target: 30000000, current: 18500000, icon: <LuShield size={18} /> },
  { id: "2", name: "Liburan", target: 10000000, current: 4200000, icon: <LuPlane size={18} /> },
  { id: "3", name: "Gadget Baru", target: 5000000, current: 3750000, icon: <LuSmartphone size={18} /> },
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
        <SimpleGrid columns={{ base: 1, md: 4 }} gap={4}>
          {/* Total Savings Card */}
          <Box
            p={4}
            borderRadius="lg"
            bg="teal.600"
            color="white"
          >
            <Flex justify="space-between" align="center" mb={3}>
              <Text fontSize="xs" opacity={0.8} textTransform="uppercase" letterSpacing="wide">
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
              {savingsGoals.length} target aktif
            </Text>
          </Box>

          {/* Savings Goals */}
          {savingsGoals.map((goal) => {
            const percentage = Math.round((goal.current / goal.target) * 100);

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
                    >
                      {goal.icon}
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
                
                <Progress.Root value={percentage} size="xs" colorPalette="teal">
                  <Progress.Track bg="gray.100" borderRadius="full" _dark={{ bg: "gray.700" }}>
                    <Progress.Range borderRadius="full" />
                  </Progress.Track>
                </Progress.Root>

                <Flex justify="space-between" mt={2}>
                  <Text fontSize="xs" color="gray.500">
                    {formatCurrency(goal.current)}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {formatCurrency(goal.target)}
                  </Text>
                </Flex>
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
