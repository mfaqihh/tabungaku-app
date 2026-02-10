"use client";

import { Box, SimpleGrid, Flex, Skeleton, VStack } from "@chakra-ui/react";
import { Header } from "@/components/layout";
import {
  StatCard,
  RecentTransactions,
  BudgetOverview,
  SavingsOverview,
} from "@/components/dashboard";
import {
  LuWallet,
  LuTrendingUp,
  LuTrendingDown,
  LuPiggyBank,
} from "react-icons/lu";
import { useTransactionStore } from "@/stores/transactionStore";
import { useSavingsStore } from "@/stores/savingsStore";
import { formatCurrency } from "@/lib/utils/currency";
import { useMemo, useState, useEffect } from "react";

// Skeleton for stat cards
function StatCardSkeleton() {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      p={5}
      border="1px solid"
      borderColor="gray.200"
      _dark={{ bg: "gray.800", borderColor: "gray.700" }}
    >
      <Flex justify="space-between" align="flex-start" mb={3}>
        <Skeleton h={4} w="80px" borderRadius="md" />
        <Skeleton h={9} w={9} borderRadius="lg" />
      </Flex>
      <Skeleton h={7} w="140px" borderRadius="md" mb={2} />
      <Skeleton h={3} w="100px" borderRadius="md" />
    </Box>
  );
}

// Skeleton placeholder for content sections
function SectionSkeleton({ height = "240px" }: { height?: string }) {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      p={5}
      border="1px solid"
      borderColor="gray.200"
      _dark={{ bg: "gray.800", borderColor: "gray.700" }}
    >
      <Skeleton h={5} w="140px" borderRadius="md" mb={4} />
      <VStack align="stretch" gap={3}>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} h={12} w="full" borderRadius="lg" />
        ))}
      </VStack>
    </Box>
  );
}

export default function DashboardPage() {
  // Hydration guard: Zustand persist loads from localStorage only on client.
  // Without this, server renders Rp 0 but client renders real values → hydration mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Select RAW state arrays (stable references that change when data changes).
  // NEVER call derived functions like getSummary() inside a selector —
  // they return new objects each render, causing infinite re-render loops.
  const transactions = useTransactionStore((state) => state.transactions);
  const savingsGoals = useSavingsStore((state) => state.savingsGoals);

  // Compute summary from raw transactions (memoized to avoid recalculation)
  const summary = useMemo(() => {
    const income = transactions.filter((t) => t.type === "income");
    const expense = transactions.filter((t) => t.type === "expense");
    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = expense.reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpense,
      transactionCount: transactions.length,
      incomeCount: income.length,
      expenseCount: expense.length,
    };
  }, [transactions]);

  // Calculate totals from raw savingsGoals
  const { totalSavings, activeSavingsCount } = useMemo(() => {
    const active = savingsGoals.filter((s) => s.isActive);
    return {
      totalSavings: active.reduce((sum, goal) => sum + goal.currentAmount, 0),
      activeSavingsCount: active.length,
    };
  }, [savingsGoals]);

  const netBalance = summary.totalIncome - summary.totalExpense;

  // Show skeleton until client hydration is complete
  if (!mounted) {
    return (
      <Box minH="100vh">
        <Header title="Dashboard" />
        <Box p={{ base: 4, md: 6 }} maxW="1600px" mx="auto">
          {/* Skeleton Stats Grid */}
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4} mb={6}>
            {[...Array(4)].map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </SimpleGrid>

          {/* Skeleton Savings Overview */}
          <Box mb={6}>
            <SectionSkeleton height="180px" />
          </Box>

          {/* Skeleton Transactions and Budget */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
            <SectionSkeleton />
            <SectionSkeleton />
          </SimpleGrid>
        </Box>
      </Box>
    );
  }

  return (
    <Box minH="100vh">
      <Header title="Dashboard" />

      <Box p={{ base: 4, md: 6 }} maxW="1600px" mx="auto">
        {/* Stats Grid */}
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4} mb={6}>
          <StatCard
            title="Total Saldo"
            value={formatCurrency(netBalance)}
            icon={<LuWallet size={20} />}
            change={
              summary.transactionCount > 0
                ? `${summary.transactionCount} transaksi`
                : undefined
            }
            changeType={netBalance >= 0 ? "positive" : "negative"}
            colorScheme="teal"
          />
          <StatCard
            title="Pemasukan"
            value={formatCurrency(summary.totalIncome)}
            icon={<LuTrendingUp size={20} />}
            change={
              summary.incomeCount > 0
                ? `${summary.incomeCount} pemasukan`
                : undefined
            }
            changeType="positive"
            colorScheme="green"
          />
          <StatCard
            title="Pengeluaran"
            value={formatCurrency(summary.totalExpense)}
            icon={<LuTrendingDown size={20} />}
            change={
              summary.expenseCount > 0
                ? `${summary.expenseCount} pengeluaran`
                : undefined
            }
            changeType="negative"
            colorScheme="red"
          />
          <StatCard
            title="Total Tabungan"
            value={formatCurrency(totalSavings)}
            icon={<LuPiggyBank size={20} />}
            change={
              activeSavingsCount > 0
                ? `${activeSavingsCount} target aktif`
                : undefined
            }
            changeType="neutral"
            colorScheme="purple"
          />
        </SimpleGrid>

        {/* Full Width Savings */}
        <Box mb={6}>
          <SavingsOverview />
        </Box>

        {/* Transactions and Budget Grid */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
          <RecentTransactions />
          <BudgetOverview />
        </SimpleGrid>
      </Box>
    </Box>
  );
}
