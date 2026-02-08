/**
 * TransactionList - List container untuk transaksi
 * Mengelompokkan transaksi berdasarkan tanggal
 */

'use client';

import { Box, Text, VStack } from '@chakra-ui/react';
import { Receipt } from 'lucide-react';
import type { Transaction } from '@/stores/types';
import { TransactionItem } from './TransactionItem';
import { formatDateFull } from '@/lib/utils/formatDate';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  // Empty state
  if (transactions.length === 0) {
    return (
      <Box
        textAlign="center"
        py={12}
        px={6}
        bg="white"
        borderRadius="xl"
        border="1px solid"
        borderColor="gray.200"
        _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
      >
        <Box
          w={16}
          h={16}
          mx="auto"
          mb={4}
          borderRadius="full"
          bg="gray.100"
          _dark={{ bg: 'gray.700' }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Receipt size={32} color="var(--chakra-colors-gray-400)" />
        </Box>
        <Text fontWeight="medium" mb={1}>
          Belum Ada Transaksi
        </Text>
        <Text fontSize="sm" color="gray.500">
          Tambahkan transaksi pertamamu dengan menekan tombol &quot;Tambah Transaksi&quot;
        </Text>
      </Box>
    );
  }

  // Group transactions by date
  const groupedByDate = transactions.reduce(
    (groups, transaction) => {
      const date = transaction.transactionDate.split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    },
    {} as Record<string, Transaction[]>
  );

  // Helper to get human-readable date label
  const getDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Reset time for comparison
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const yesterdayOnly = new Date(
      yesterday.getFullYear(),
      yesterday.getMonth(),
      yesterday.getDate()
    );

    if (dateOnly.getTime() === todayOnly.getTime()) return 'Hari Ini';
    if (dateOnly.getTime() === yesterdayOnly.getTime()) return 'Kemarin';
    return formatDateFull(dateStr);
  };

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedByDate).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <VStack align="stretch" gap={6}>
      {sortedDates.map((date) => (
        <Box key={date}>
          <Text
            fontSize="sm"
            fontWeight="semibold"
            mb={3}
            color="gray.500"
            _dark={{ color: 'gray.400' }}
          >
            {getDateLabel(date)}
          </Text>
          <VStack align="stretch" gap={2}>
            {groupedByDate[date].map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </VStack>
        </Box>
      ))}
    </VStack>
  );
}
