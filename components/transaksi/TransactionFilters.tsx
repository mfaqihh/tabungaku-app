/**
 * TransactionFilters - Filter controls untuk transaksi
 * Filter by type, date range, dan search
 */

'use client';

import { Box, Flex, NativeSelect, Input } from '@chakra-ui/react';
import { Search } from 'lucide-react';
import { useTransactionStore } from '@/stores/transactionStore';

export function TransactionFilters() {
  const filters = useTransactionStore((state) => state.filters);
  const setFilters = useTransactionStore((state) => state.setFilters);

  const handleTypeChange = (value: string) => {
    setFilters({
      type: value === 'all' ? undefined : (value as 'income' | 'expense'),
    });
  };

  const handleSearchChange = (value: string) => {
    setFilters({ searchQuery: value || undefined });
  };

  // Quick date range presets
  const setDateRange = (range: string) => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    switch (range) {
      case 'this-month':
        setFilters({
          startDate: startOfMonth.toISOString().split('T')[0],
          endDate: today.toISOString().split('T')[0],
        });
        break;
      case 'last-month':
        setFilters({
          startDate: startOfLastMonth.toISOString().split('T')[0],
          endDate: endOfLastMonth.toISOString().split('T')[0],
        });
        break;
      case 'all':
        setFilters({ startDate: undefined, endDate: undefined });
        break;
    }
  };

  return (
    <Flex
      gap={3}
      flexWrap="wrap"
      align="center"
      p={4}
      bg="white"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.200"
      _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
    >
      {/* Type Filter */}
      <Box w={{ base: 'full', sm: 'auto' }} minW="180px">
        <NativeSelect.Root size="sm">
          <NativeSelect.Field
            value={filters.type || 'all'}
            onChange={(e) => handleTypeChange(e.target.value)}
            bg="gray.50"
            _dark={{ bg: 'gray.700' }}
          >
            <option value="all">Semua Transaksi</option>
            <option value="income">Pemasukan</option>
            <option value="expense">Pengeluaran</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Box>

      {/* Date Range Filter */}
      <Box w={{ base: 'full', sm: 'auto' }} minW="180px">
        <NativeSelect.Root size="sm">
          <NativeSelect.Field
            onChange={(e) => setDateRange(e.target.value)}
            bg="gray.50"
            _dark={{ bg: 'gray.700' }}
          >
            <option value="all">Semua Waktu</option>
            <option value="this-month">Bulan Ini</option>
            <option value="last-month">Bulan Lalu</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Box>

      {/* Search */}
      <Box flex={1} minW="200px" position="relative">
        <Box
          position="absolute"
          left={3}
          top="50%"
          transform="translateY(-50%)"
          color="gray.400"
          zIndex={1}
          pointerEvents="none"
        >
          <Search size={18} />
        </Box>
                <Input
          placeholder="Cari transaksi..."
          value={filters.searchQuery || ''}
          onChange={(e) => handleSearchChange(e.target.value)}
          pl={10}
          size="sm"
          bg="gray.50"
          _dark={{
            bg: 'gray.700',
          }}
        />
      </Box>
    </Flex>
  );
}
