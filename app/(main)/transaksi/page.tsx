/**
 * Transaksi Page
 * Main page untuk mengelola semua transaksi (income & expense)
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { useTransactionStore } from '@/stores/transactionStore';
import {
  TransactionOverview,
  TransactionFilters,
  TransactionList,
  AddTransactionModal,
} from '@/components/transaksi';

export default function TransaksiPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Get raw state from store
  const allTransactions = useTransactionStore((state) => state.transactions);
  const filters = useTransactionStore((state) => state.filters);

  // Compute filtered transactions using useMemo to avoid infinite loop
  const transactions = useMemo(() => {
    let filtered = [...allTransactions];

    // Filter by type
    if (filters.type) {
      filtered = filtered.filter((t) => t.type === filters.type);
    }

    // Filter by date range
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

    // Filter by category
    if (filters.categoryId) {
      filtered = filtered.filter((t) => t.budgetCategoryId === filters.categoryId);
    }

    // Search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(query) ||
          t.categoryName.toLowerCase().includes(query)
      );
    }

    // Sort by date (newest first)
    return filtered.sort(
      (a, b) =>
        new Date(b.transactionDate).getTime() -
        new Date(a.transactionDate).getTime()
    );
  }, [allTransactions, filters]);

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Prevent hydration mismatch
  if (!isHydrated) {
    return (
      <Box p={6}>
        <Flex justify="space-between" align="center" mb={6}>
          <Box>
            <Text fontSize="2xl" fontWeight="bold">
              Transaksi
            </Text>
            <Text fontSize="sm" color="gray.500">
              Kelola pemasukan dan pengeluaran
            </Text>
          </Box>
        </Flex>
        <Box
          h="200px"
          bg="gray.100"
          _dark={{ bg: 'gray.800' }}
          borderRadius="xl"
          animation="pulse 2s infinite"
        />
      </Box>
    );
  }

  return (
    <Box p={6}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6} flexWrap="wrap" gap={4}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            Transaksi
          </Text>
          <Text fontSize="sm" color="gray.500" _dark={{ color: 'gray.400' }}>
            Kelola pemasukan dan pengeluaran
          </Text>
        </Box>

        <Box
          as="button"
          display="flex"
          alignItems="center"
          gap={2}
          px={5}
          py={2.5}
          bg="teal.500"
          color="white"
          borderRadius="lg"
          fontWeight="medium"
          transition="all 0.2s"
          _hover={{ bg: 'teal.600', transform: 'translateY(-1px)' }}
          _active={{ transform: 'translateY(0)' }}
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={20} />
          <Text>Tambah Transaksi</Text>
        </Box>
      </Flex>

      {/* Overview Summary Cards */}
      <TransactionOverview />

      {/* Filters */}
      <Box mt={6}>
        <TransactionFilters />
      </Box>

      {/* Transaction List */}
      <Box mt={6}>
        <TransactionList transactions={transactions} />
      </Box>

      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  );
}
