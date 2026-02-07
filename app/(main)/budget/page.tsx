"use client";

import {
  Box,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Button,
  Progress,
  IconButton,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { Header } from "@/components/layout";
import {
  LuPlus,
  LuWallet,
  LuPencil,
  LuTrash2,
  LuTrendingDown,
  LuTrendingUp,
  LuShoppingCart,
  LuCar,
  LuGamepad2,
  LuFileText,
  LuUtensils,
  LuHeart,
  LuBookOpen,
  LuPackage,
} from "react-icons/lu";
import { ReactNode } from "react";

interface Budget {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  category: string;
  color: string;
  icon: ReactNode;
}

const budgets: Budget[] = [
  { id: "1", name: "Kebutuhan Pokok", allocated: 3000000, spent: 2100000, category: "Bulanan", color: "teal", icon: <LuShoppingCart size={18} /> },
  { id: "2", name: "Transportasi", allocated: 1000000, spent: 750000, category: "Bulanan", color: "blue", icon: <LuCar size={18} /> },
  { id: "3", name: "Hiburan", allocated: 500000, spent: 480000, category: "Bulanan", color: "purple", icon: <LuGamepad2 size={18} /> },
  { id: "4", name: "Tagihan & Utilitas", allocated: 1500000, spent: 1200000, category: "Bulanan", color: "orange", icon: <LuFileText size={18} /> },
  { id: "5", name: "Makanan & Minuman", allocated: 1500000, spent: 890000, category: "Bulanan", color: "red", icon: <LuUtensils size={18} /> },
  { id: "6", name: "Kesehatan", allocated: 500000, spent: 150000, category: "Bulanan", color: "green", icon: <LuHeart size={18} /> },
  { id: "7", name: "Pendidikan", allocated: 800000, spent: 400000, category: "Bulanan", color: "cyan", icon: <LuBookOpen size={18} /> },
  { id: "8", name: "Lainnya", allocated: 500000, spent: 200000, category: "Bulanan", color: "gray", icon: <LuPackage size={18} /> },
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function BudgetPage() {
  const totalAllocated = budgets.reduce((acc, b) => acc + b.allocated, 0);
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
  const totalRemaining = totalAllocated - totalSpent;
  const overallProgress = Math.round((totalSpent / totalAllocated) * 100);

  return (
    <Box minH="100vh">
      <Header title="Budget" />
      <Box p={{ base: 4, md: 6 }} maxW="1600px" mx="auto">
        {/* Summary Section */}
        <Box bg="white" borderRadius="xl" p={5} mb={6} border="1px solid" borderColor="gray.200" _dark={{ bg: "gray.800", borderColor: "gray.700" }}>
          <Flex justify="space-between" align="center" mb={5} flexWrap="wrap" gap={4}>
            <VStack align="flex-start" gap={0.5}>
              <Text fontSize="xs" fontWeight="medium" color="gray.500" textTransform="uppercase" letterSpacing="wide" _dark={{ color: "gray.400" }}>Ringkasan Budget</Text>
              <Text fontSize="lg" fontWeight="bold" color="gray.900" _dark={{ color: "white" }}>Februari 2024</Text>
            </VStack>
            <Button colorPalette="teal" size="sm" borderRadius="lg"><LuPlus size={16} />Tambah Budget</Button>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={5}>
            <Box p={4} borderRadius="lg" bg="teal.50" _dark={{ bg: "teal.900" }}>
              <Flex justify="space-between" align="center" mb={2}>
                <Text fontSize="xs" fontWeight="medium" color="teal.700" _dark={{ color: "teal.200" }}>Total Dialokasikan</Text>
                <LuWallet size={16} color="currentColor" />
              </Flex>
              <Text fontSize="xl" fontWeight="bold" color="teal.700" _dark={{ color: "teal.100" }}>{formatCurrency(totalAllocated)}</Text>
            </Box>
            <Box p={4} borderRadius="lg" bg="red.50" _dark={{ bg: "red.900" }}>
              <Flex justify="space-between" align="center" mb={2}>
                <Text fontSize="xs" fontWeight="medium" color="red.700" _dark={{ color: "red.200" }}>Total Terpakai</Text>
                <LuTrendingDown size={16} color="currentColor" />
              </Flex>
              <Text fontSize="xl" fontWeight="bold" color="red.700" _dark={{ color: "red.100" }}>{formatCurrency(totalSpent)}</Text>
            </Box>
            <Box p={4} borderRadius="lg" bg="green.50" _dark={{ bg: "green.900" }}>
              <Flex justify="space-between" align="center" mb={2}>
                <Text fontSize="xs" fontWeight="medium" color="green.700" _dark={{ color: "green.200" }}>Sisa Budget</Text>
                <LuTrendingUp size={16} color="currentColor" />
              </Flex>
              <Text fontSize="xl" fontWeight="bold" color="green.700" _dark={{ color: "green.100" }}>{formatCurrency(totalRemaining)}</Text>
            </Box>
          </SimpleGrid>

          <Box>
            <Flex justify="space-between" mb={2}>
              <Text fontSize="sm" fontWeight="medium" color="gray.700" _dark={{ color: "gray.200" }}>Progress Keseluruhan</Text>
              <Text fontSize="sm" fontWeight="semibold" color={overallProgress > 80 ? "red.500" : "teal.600"} _dark={{ color: overallProgress > 80 ? "red.400" : "teal.400" }}>{overallProgress}%</Text>
            </Flex>
            <Progress.Root value={overallProgress} size="sm" colorPalette={overallProgress > 80 ? "red" : "teal"}>
              <Progress.Track bg="gray.100" borderRadius="full" _dark={{ bg: "gray.700" }}>
                <Progress.Range borderRadius="full" />
              </Progress.Track>
            </Progress.Root>
          </Box>
        </Box>

        {/* Budget Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
          {budgets.map((budget) => {
            const percentage = Math.round((budget.spent / budget.allocated) * 100);
            const remaining = budget.allocated - budget.spent;
            const isOverBudget = percentage > 100;
            const isNearLimit = percentage >= 80 && percentage <= 100;

            return (
              <Box key={budget.id} bg="white" borderRadius="xl" p={5} border="1px solid" borderColor="gray.200" _dark={{ bg: "gray.800", borderColor: "gray.700" }}>
                <Flex justify="space-between" align="flex-start" mb={4}>
                  <HStack gap={3}>
                    <Box p={2.5} bg={budget.color + ".50"} color={budget.color + ".600"} borderRadius="lg" _dark={{ bg: budget.color + ".900", color: budget.color + ".300" }}>{budget.icon}</Box>
                    <VStack align="flex-start" gap={0}>
                      <Text fontSize="sm" fontWeight="semibold" color="gray.900" _dark={{ color: "white" }}>{budget.name}</Text>
                      <Badge size="sm" colorPalette={budget.color} variant="subtle" borderRadius="md">{budget.category}</Badge>
                    </VStack>
                  </HStack>
                  <HStack gap={0}>
                    <IconButton aria-label="Edit" variant="ghost" size="xs" color="gray.400" _hover={{ color: "blue.600", bg: "blue.50" }} _dark={{ _hover: { color: "blue.400", bg: "blue.900" } }}><LuPencil size={14} /></IconButton>
                    <IconButton aria-label="Delete" variant="ghost" size="xs" color="gray.400" _hover={{ color: "red.600", bg: "red.50" }} _dark={{ _hover: { color: "red.400", bg: "red.900" } }}><LuTrash2 size={14} /></IconButton>
                  </HStack>
                </Flex>

                <Box mb={3}>
                  <Flex justify="space-between" mb={1.5}>
                    <Text fontSize="xs" color="gray.500">Terpakai</Text>
                    <Text fontSize="xs" fontWeight="semibold" color={isOverBudget ? "red.500" : isNearLimit ? "orange.500" : "gray.700"} _dark={{ color: isOverBudget ? "red.400" : isNearLimit ? "orange.400" : "gray.200" }}>{percentage}%</Text>
                  </Flex>
                  <Progress.Root value={Math.min(percentage, 100)} size="xs" colorPalette={isOverBudget ? "red" : isNearLimit ? "orange" : budget.color}>
                    <Progress.Track bg="gray.100" borderRadius="full" _dark={{ bg: "gray.700" }}>
                      <Progress.Range borderRadius="full" />
                    </Progress.Track>
                  </Progress.Root>
                </Box>

                <Flex justify="space-between" pt={2} borderTop="1px solid" borderColor="gray.100" _dark={{ borderColor: "gray.700" }}>
                  <VStack align="flex-start" gap={0}>
                    <Text fontSize="xs" color="gray.500">Terpakai</Text>
                    <Text fontSize="sm" fontWeight="semibold" color="gray.900" _dark={{ color: "white" }}>{formatCurrency(budget.spent)}</Text>
                  </VStack>
                  <VStack align="flex-end" gap={0}>
                    <Text fontSize="xs" color="gray.500">Sisa</Text>
                    <Text fontSize="sm" fontWeight="semibold" color={remaining < 0 ? "red.500" : "green.600"} _dark={{ color: remaining < 0 ? "red.400" : "green.400" }}>{formatCurrency(Math.abs(remaining))}</Text>
                  </VStack>
                </Flex>
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
