/**
 * Transaksi Page
 * Main page untuk mengelola semua transaksi (income & expense)
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { Header } from '@/components/layout';
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
      <Box minH="100vh">
        <Header title="Transaksi" />
        <Box p={{ base: 4, md: 6 }} maxW="1600px" mx="auto">
          <Box
            h="200px"
            bg="gray.100"
            _dark={{ bg: 'gray.800' }}
            borderRadius="xl"
            animation="pulse 2s infinite"
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box minH="100vh">
      <Header title="Transaksi" />
      
      <Box p={{ base: 4, md: 6 }} maxW="1600px" mx="auto">
        {/* Page Title & Action */}
        <Flex 
          justify="space-between" 
          align="center" 
          mb={6} 
          flexWrap="wrap" 
          gap={4}
        >
          <Box>
            <Text fontSize="sm" color="gray.500" _dark={{ color: 'gray.400' }}>
              Kelola pemasukan dan pengeluaran
            </Text>
          </Box>

          <Button
            colorPalette="teal"
            size="sm"
            borderRadius="lg"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={16} />
            Tambah Transaksi
          </Button>
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
    </Box>
  );
}
