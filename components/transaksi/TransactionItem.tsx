/**
 * TransactionItem - Single transaction card
 * Menampilkan detail satu transaksi dengan icon dan warna
 */

'use client';

import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { MoreVertical, Edit, Trash2, Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import { getIconByValue } from '@/constants/budgetIcons';
import type { Transaction } from '@/stores/types';
import { formatCurrency } from '@/lib/utils/currency';
import { useTransactionStore } from '@/stores/transactionStore';

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);

  // Get icon component based on displayIcon value
  const IconComponent = transaction.displayIcon
    ? getIconByValue(transaction.displayIcon)
    : null;

  const isIncome = transaction.type === 'income';

  // Fallback icon for income/expense
  const FallbackIcon = isIncome ? TrendingUp : TrendingDown;

  // Display icon color
  const iconColor = transaction.displayColor || (isIncome ? '#38A169' : '#E53E3E');
  const iconBgColor = isIncome ? 'green.50' : 'red.50';
  const iconBgColorDark = isIncome ? 'green.900' : 'red.900';

  const handleDelete = () => {
    if (confirm('Hapus transaksi ini?')) {
      deleteTransaction(transaction.id);
    }
    setMenuOpen(false);
  };

  return (
    <Box
      bg="white"
      p={4}
      borderRadius="lg"
      borderLeft="4px solid"
      borderLeftColor={isIncome ? 'green.500' : 'red.500'}
      border="1px solid"
      borderColor="gray.200"
      _dark={{
        bg: 'gray.800',
        borderColor: 'gray.700',
        borderLeftColor: isIncome ? 'green.500' : 'red.500',
      }}
      transition="all 0.2s"
      _hover={{
        boxShadow: 'md',
        transform: 'translateY(-1px)',
      }}
    >
      <Flex justify="space-between" align="center">
        {/* Left: Icon + Info */}
        <Flex gap={3} flex={1} align="center">
          <Box
            p={2.5}
            borderRadius="lg"
            bg={iconBgColor}
            _dark={{ bg: iconBgColorDark }}
          >
            {IconComponent ? (
              <IconComponent size={22} color={iconColor} />
            ) : (
              <FallbackIcon size={22} color={iconColor} />
            )}
          </Box>
          <VStack align="start" gap={0}>
            <Text fontWeight="semibold" fontSize="sm">
              {transaction.description}
            </Text>
            <Text fontSize="xs" color="gray.500" _dark={{ color: 'gray.400' }}>
              {isIncome ? 'Pemasukan' : 'Pengeluaran'} • {transaction.categoryName}
            </Text>
          </VStack>
        </Flex>

        {/* Right: Amount + Menu */}
        <Flex gap={2} align="center">
          <Text
            fontWeight="bold"
            fontSize="md"
            color={isIncome ? 'green.600' : 'red.600'}
            _dark={{ color: isIncome ? 'green.400' : 'red.400' }}
          >
            {isIncome ? '+' : '-'}
            {formatCurrency(transaction.amount)}
          </Text>

          {/* Menu Dropdown */}
          <Box position="relative">
            <Box
              as="button"
              p={2}
              borderRadius="lg"
              _hover={{ bg: 'gray.100', _dark: { bg: 'gray.700' } }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <MoreVertical size={18} />
            </Box>

            {/* Dropdown Menu */}
            {menuOpen && (
              <>
                {/* Backdrop to close menu */}
                <Box
                  position="fixed"
                  inset={0}
                  zIndex={10}
                  onClick={() => setMenuOpen(false)}
                />
                <Box
                  position="absolute"
                  right={0}
                  top="100%"
                  mt={1}
                  bg="white"
                  _dark={{ bg: 'gray.700', borderColor: 'gray.600' }}
                  borderRadius="lg"
                  boxShadow="lg"
                  border="1px solid"
                  borderColor="gray.200"
                  zIndex={20}
                  minW="140px"
                  overflow="hidden"
                >
                  <Box
                    as="button"
                    w="100%"
                    display="flex"
                    alignItems="center"
                    gap={2}
                    px={4}
                    py={2.5}
                    fontSize="sm"
                    _hover={{ bg: 'gray.50', _dark: { bg: 'gray.600' } }}
                    onClick={() => {
                      // TODO: Edit functionality - Phase 2
                      setMenuOpen(false);
                    }}
                  >
                    <Edit size={16} />
                    <Text>Edit</Text>
                  </Box>
                  <Box
                    as="button"
                    w="100%"
                    display="flex"
                    alignItems="center"
                    gap={2}
                    px={4}
                    py={2.5}
                    fontSize="sm"
                    color="red.500"
                    _hover={{ bg: 'red.50', _dark: { bg: 'red.900' } }}
                    onClick={handleDelete}
                  >
                    <Trash2 size={16} />
                    <Text>Hapus</Text>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
