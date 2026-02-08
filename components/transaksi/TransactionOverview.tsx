/**
 * TransactionOverview - Summary cards untuk transaksi
 * Menampilkan total pemasukan, pengeluaran, dan saldo bersih
 */

'use client';

import { useMemo } from 'react';
import { Box, SimpleGrid, Text, Flex, VStack } from '@chakra-ui/react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { useTransactionStore } from '@/stores/transactionStore';
import { formatCurrency } from '@/lib/utils/currency';

interface SummaryCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  colorScheme: string;
  subtitle: string;
  prefix?: string;
}

function SummaryCard({ label, value, icon, colorScheme, subtitle, prefix = '' }: SummaryCardProps) {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      p={5}
      border="1px solid"
      borderColor="gray.200"
      borderLeft="4px solid"
      borderLeftColor={`${colorScheme}.500`}
      _dark={{
        bg: 'gray.800',
        borderColor: 'gray.700',
        borderLeftColor: `${colorScheme}.500`,
      }}
    >
      <Flex justify="space-between" align="flex-start" mb={3}>
        <Flex alignItems="center" gap={2}>
          <Box
            p={2}
            borderRadius="lg"
            bg={`${colorScheme}.50`}
            color={`${colorScheme}.500`}
            _dark={{
              bg: `${colorScheme}.900`,
              color: `${colorScheme}.300`,
            }}
          >
            {icon}
          </Box>
          <Text fontSize="sm" color="gray.500" _dark={{ color: 'gray.400' }}>
            {label}
          </Text>
        </Flex>
      </Flex>
      <VStack align="flex-start" gap={1}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color={`${colorScheme}.600`}
          _dark={{ color: `${colorScheme}.400` }}
        >
          {prefix}{formatCurrency(Math.abs(value))}
        </Text>
        <Text fontSize="sm" color="gray.500" _dark={{ color: 'gray.500' }}>
          {subtitle}
        </Text>
      </VStack>
    </Box>
  );
}

export function TransactionOverview() {
  // Get raw state from store
  const transactions = useTransactionStore((state) => state.transactions);
  const filters = useTransactionStore((state) => state.filters);

  // Compute summary using useMemo to avoid infinite loop
  const summary = useMemo(() => {
    // Apply same filters as getFilteredTransactions
    let filtered = [...transactions];

    if (filters.type) {
      filtered = filtered.filter((t) => t.type === filters.type);
    }
    if (filters.startDate) {
      filtered = filtered.filter(
        (t) => new Date(t.transactionDate) >= new Date(filters.startDate!)
      );
    }
    if (filters.endDate) {
      filtered = filtered.filter(
        (t) => new Date(t.transactionDate) <= new Date(filters.endDate!)
      );
    }
    if (filters.categoryId) {
      filtered = filtered.filter((t) => t.budgetCategoryId === filters.categoryId);
    }
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(query) ||
          t.categoryName.toLowerCase().includes(query)
      );
    }

    const income = filtered.filter((t) => t.type === 'income');
    const expense = filtered.filter((t) => t.type === 'expense');
    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = expense.reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense,
      transactionCount: filtered.length,
      incomeCount: income.length,
      expenseCount: expense.length,
    };
  }, [transactions, filters]);

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
      {/* Total Pemasukan */}
      <SummaryCard
        label="Total Pemasukan"
        value={summary.totalIncome}
        icon={<TrendingUp size={20} />}
        colorScheme="green"
        subtitle={`${summary.incomeCount} transaksi pemasukan`}
        prefix="+"
      />

      {/* Total Pengeluaran */}
      <SummaryCard
        label="Total Pengeluaran"
        value={summary.totalExpense}
        icon={<TrendingDown size={20} />}
        colorScheme="red"
        subtitle={`${summary.expenseCount} transaksi pengeluaran`}
        prefix="-"
      />

      {/* Saldo Bersih */}
      <SummaryCard
        label="Saldo Bersih"
        value={summary.netBalance}
        icon={<Wallet size={20} />}
        colorScheme={summary.netBalance >= 0 ? 'teal' : 'orange'}
        subtitle="Pemasukan - Pengeluaran"
        prefix={summary.netBalance >= 0 ? '' : '-'}
      />
    </SimpleGrid>
  );
}
