/**
 * Transaksi Page
 * Main page untuk mengelola semua transaksi (income & expense)
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
import { Box, Flex, Text, Button, SimpleGrid, Skeleton, VStack, HStack } from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { Header } from '@/components/layout';
import { useTransactionStore } from '@/stores/transactionStore';
import {
  TransactionOverview,
  TransactionFilters,
  TransactionList,
  AddTransactionModal,
} from '@/components/transaksi';

// Skeleton for summary cards
function OverviewSkeleton() {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
      {[...Array(3)].map((_, i) => (
        <Box
          key={i}
          bg="white"
          borderRadius="xl"
          p={5}
          border="1px solid"
          borderColor="gray.200"
          borderLeft="4px solid"
          borderLeftColor="gray.300"
          _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
        >
          <Flex justify="space-between" align="flex-start" mb={3}>
            <Flex alignItems="center" gap={2}>
              <Skeleton h={9} w={9} borderRadius="lg" />
              <Skeleton h={4} w="100px" borderRadius="md" />
            </Flex>
          </Flex>
          <VStack align="flex-start" gap={1}>
            <Skeleton h={7} w="160px" borderRadius="md" />
            <Skeleton h={3} w="120px" borderRadius="md" />
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
}

// Skeleton for transaction items
function TransactionListSkeleton() {
  return (
    <VStack align="stretch" gap={6}>
      <Skeleton h={4} w="80px" borderRadius="md" />
      <VStack align="stretch" gap={2}>
        {[...Array(5)].map((_, i) => (
          <Box
            key={i}
            bg="white"
            p={4}
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
            borderLeft="4px solid"
            borderLeftColor="gray.300"
            _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
          >
            <Flex justify="space-between" align="center">
              <Flex gap={3} align="center">
                <Skeleton h={10} w={10} borderRadius="lg" />
                <VStack align="start" gap={1}>
                  <Skeleton h={4} w="140px" borderRadius="md" />
                  <Skeleton h={3} w="100px" borderRadius="md" />
                </VStack>
              </Flex>
              <HStack>
                <Skeleton h={5} w="100px" borderRadius="md" />
                <Skeleton h={8} w={8} borderRadius="lg" />
              </HStack>
            </Flex>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
}

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

  // Skeleton loading during hydration
  if (!isHydrated) {
    return (
      <Box minH="100vh">
        <Header title="Transaksi" />
        <Box p={{ base: 4, md: 6 }} maxW="1600px" mx="auto">
          {/* Header area skeleton */}
          <Flex justify="space-between" align="center" mb={6} flexWrap="wrap" gap={4}>
            <Box>
              <Skeleton h={4} w="200px" borderRadius="md" />
            </Box>
            <Skeleton h={9} w="160px" borderRadius="lg" />
          </Flex>

          {/* Overview skeleton */}
          <OverviewSkeleton />

          {/* Filter skeleton */}
          <Box mt={6}>
            <Skeleton h={10} w="full" borderRadius="lg" />
          </Box>

          {/* List skeleton */}
          <Box mt={6}>
            <TransactionListSkeleton />
          </Box>
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
            _hover={{ transform: "translateY(-1px)", boxShadow: "md" }}
            transition="all 0.2s"
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
