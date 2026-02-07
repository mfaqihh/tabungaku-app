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
} from "@chakra-ui/react";
import { Header } from "@/components/layout";
import {
  LuPlus,
  LuWallet,
  LuPencil,
  LuTrash2,
} from "react-icons/lu";

interface Budget {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  category: string;
  color: string;
  icon: string;
}

const budgets: Budget[] = [
  {
    id: "1",
    name: "Kebutuhan Pokok",
    allocated: 3000000,
    spent: 2100000,
    category: "Bulanan",
    color: "teal",
    icon: "🛒",
  },
  {
    id: "2",
    name: "Transportasi",
    allocated: 1000000,
    spent: 750000,
    category: "Bulanan",
    color: "blue",
    icon: "🚗",
  },
  {
    id: "3",
    name: "Hiburan",
    allocated: 500000,
    spent: 480000,
    category: "Bulanan",
    color: "purple",
    icon: "🎮",
  },
  {
    id: "4",
    name: "Tagihan & Utilitas",
    allocated: 1500000,
    spent: 1200000,
    category: "Bulanan",
    color: "orange",
    icon: "📄",
  },
  {
    id: "5",
    name: "Makanan & Minuman",
    allocated: 1500000,
    spent: 890000,
    category: "Bulanan",
    color: "red",
    icon: "🍽️",
  },
  {
    id: "6",
    name: "Kesehatan",
    allocated: 500000,
    spent: 150000,
    category: "Bulanan",
    color: "green",
    icon: "💊",
  },
  {
    id: "7",
    name: "Pendidikan",
    allocated: 800000,
    spent: 400000,
    category: "Bulanan",
    color: "cyan",
    icon: "📚",
  },
  {
    id: "8",
    name: "Lainnya",
    allocated: 500000,
    spent: 200000,
    category: "Bulanan",
    color: "gray",
    icon: "📦",
  },
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
    <Box>
      <Header title="Budget" />

      <Box p={{ base: 4, md: 6 }}>
        {/* Summary Section */}
        <Box
          bg="white"
          borderRadius="2xl"
          p={6}
          mb={6}
          boxShadow="sm"
          border="1px solid"
          borderColor="gray.100"
          _dark={{ bg: "gray.800", borderColor: "gray.700" }}
        >
          <HStack justify="space-between" mb={6} flexWrap="wrap" gap={4}>
            <VStack align="flex-start" gap={1}>
              <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
                Ringkasan Budget Bulan Ini
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="gray.800" _dark={{ color: "white" }}>
                Februari 2024
              </Text>
            </VStack>
            <Button colorPalette="teal" size="sm" borderRadius="lg">
              <LuPlus size={16} />
              Buat Budget Baru
            </Button>
          </HStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={6}>
            <VStack
              align="flex-start"
              p={4}
              bg="gray.50"
              borderRadius="xl"
              _dark={{ bg: "gray.700" }}
            >
              <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
                Total Dialokasikan
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="gray.800" _dark={{ color: "white" }}>
                {formatCurrency(totalAllocated)}
              </Text>
            </VStack>
            <VStack
              align="flex-start"
              p={4}
              bg="red.50"
              borderRadius="xl"
              _dark={{ bg: "red.900" }}
            >
              <Text fontSize="sm" color="red.600" _dark={{ color: "red.200" }}>
                Total Terpakai
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="red.600" _dark={{ color: "red.200" }}>
                {formatCurrency(totalSpent)}
              </Text>
            </VStack>
            <VStack
              align="flex-start"
              p={4}
              bg="green.50"
              borderRadius="xl"
              _dark={{ bg: "green.900" }}
            >
              <Text fontSize="sm" color="green.600" _dark={{ color: "green.200" }}>
                Sisa Budget
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="green.600" _dark={{ color: "green.200" }}>
                {formatCurrency(totalRemaining)}
              </Text>
            </VStack>
          </SimpleGrid>

          {/* Overall Progress */}
          <VStack align="stretch" gap={2}>
            <HStack justify="space-between">
              <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
                Progress Keseluruhan
              </Text>
              <Text fontSize="sm" fontWeight="medium" color="gray.800" _dark={{ color: "white" }}>
                {overallProgress}%
              </Text>
            </HStack>
            <Progress.Root
              value={overallProgress}
              size="md"
              colorPalette={overallProgress > 80 ? "red" : overallProgress > 60 ? "orange" : "teal"}
            >
              <Progress.Track borderRadius="full" bg="gray.200" _dark={{ bg: "gray.600" }}>
                <Progress.Range borderRadius="full" />
              </Progress.Track>
            </Progress.Root>
          </VStack>
        </Box>

        {/* Budget Cards Grid */}
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} gap={4}>
          {budgets.map((budget) => {
            const progress = Math.round((budget.spent / budget.allocated) * 100);
            const isOverBudget = progress > 100;
            const isNearLimit = progress >= 80 && progress <= 100;
            const remaining = budget.allocated - budget.spent;

            return (
              <Box
                key={budget.id}
                bg="white"
                borderRadius="2xl"
                p={5}
                boxShadow="sm"
                border="1px solid"
                borderColor="gray.100"
                transition="all 0.2s ease"
                _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
                _dark={{ bg: "gray.800", borderColor: "gray.700" }}
              >
                <HStack justify="space-between" mb={4}>
                  <HStack gap={3}>
                    <Text fontSize="2xl">{budget.icon}</Text>
                    <VStack align="flex-start" gap={0}>
                      <Text fontWeight="semibold" fontSize="sm" color="gray.800" _dark={{ color: "white" }}>
                        {budget.name}
                      </Text>
                      <Badge size="sm" variant="subtle" colorPalette="gray">
                        {budget.category}
                      </Badge>
                    </VStack>
                  </HStack>
                  <HStack gap={1}>
                    <IconButton
                      aria-label="Edit"
                      variant="ghost"
                      size="xs"
                    >
                      <LuPencil size={14} />
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      variant="ghost"
                      size="xs"
                      colorPalette="red"
                    >
                      <LuTrash2 size={14} />
                    </IconButton>
                  </HStack>
                </HStack>

                <VStack align="stretch" gap={3}>
                  <VStack align="stretch" gap={1}>
                    <HStack justify="space-between">
                      <Text fontSize="xs" color="gray.500">
                        Terpakai
                      </Text>
                      <Text
                        fontSize="xs"
                        fontWeight="medium"
                        color={isOverBudget ? "red.500" : isNearLimit ? "orange.500" : "gray.600"}
                      >
                        {progress}%
                      </Text>
                    </HStack>
                    <Progress.Root
                      value={Math.min(progress, 100)}
                      size="sm"
                      colorPalette={isOverBudget ? "red" : isNearLimit ? "orange" : budget.color}
                    >
                      <Progress.Track borderRadius="full" bg="gray.100" _dark={{ bg: "gray.700" }}>
                        <Progress.Range borderRadius="full" />
                      </Progress.Track>
                    </Progress.Root>
                  </VStack>

                  <HStack justify="space-between">
                    <VStack align="flex-start" gap={0}>
                      <Text fontSize="xs" color="gray.500">
                        Terpakai
                      </Text>
                      <Text fontSize="sm" fontWeight="semibold" color="gray.800" _dark={{ color: "white" }}>
                        {formatCurrency(budget.spent)}
                      </Text>
                    </VStack>
                    <VStack align="flex-end" gap={0}>
                      <Text fontSize="xs" color="gray.500">
                        Sisa
                      </Text>
                      <Text
                        fontSize="sm"
                        fontWeight="semibold"
                        color={remaining < 0 ? "red.500" : "green.500"}
                      >
                        {formatCurrency(remaining)}
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
