/**
 * TransactionTypeSelector - Toggle untuk memilih jenis transaksi
 * Income (Pemasukan) atau Expense (Pengeluaran)
 */

'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { TransactionType } from '@/stores/types';

interface TransactionTypeSelectorProps {
  value: TransactionType;
  onChange: (type: TransactionType) => void;
}

export function TransactionTypeSelector({ value, onChange }: TransactionTypeSelectorProps) {
  const isIncome = value === 'income';
  const isExpense = value === 'expense';

  return (
    <Box mb={6}>
      <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.600" _dark={{ color: 'gray.400' }}>
        Jenis Transaksi
      </Text>
      <Flex
        bg="gray.100"
        _dark={{ bg: 'gray.700' }}
        borderRadius="lg"
        p={1}
        gap={1}
      >
        {/* Pemasukan Button */}
        <Box
          as="button"
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2}
          py={2.5}
          px={4}
          borderRadius="md"
          fontWeight="medium"
          transition="all 0.2s"
          bg={isIncome ? 'green.500' : 'transparent'}
          color={isIncome ? 'white' : 'gray.600'}
          _dark={{
            bg: isIncome ? 'green.500' : 'transparent',
            color: isIncome ? 'white' : 'gray.400',
          }}
          _hover={{
            bg: isIncome ? 'green.600' : 'gray.200',
            _dark: { bg: isIncome ? 'green.600' : 'gray.600' },
          }}
          onClick={() => onChange('income')}
        >
          <TrendingUp size={18} />
          <Text>Pemasukan</Text>
        </Box>

        {/* Pengeluaran Button */}
        <Box
          as="button"
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2}
          py={2.5}
          px={4}
          borderRadius="md"
          fontWeight="medium"
          transition="all 0.2s"
          bg={isExpense ? 'red.500' : 'transparent'}
          color={isExpense ? 'white' : 'gray.600'}
          _dark={{
            bg: isExpense ? 'red.500' : 'transparent',
            color: isExpense ? 'white' : 'gray.400',
          }}
          _hover={{
            bg: isExpense ? 'red.600' : 'gray.200',
            _dark: { bg: isExpense ? 'red.600' : 'gray.600' },
          }}
          onClick={() => onChange('expense')}
        >
          <TrendingDown size={18} />
          <Text>Pengeluaran</Text>
        </Box>
      </Flex>
    </Box>
  );
}
