/**
 * AddTransactionModal - Modal untuk menambah transaksi baru
 * Dual mode: Income (Pemasukan) / Expense (Pengeluaran)
 */

'use client';

import { Box, Flex, Text, VStack, Button } from '@chakra-ui/react';
import { X } from 'lucide-react';
import { TransactionTypeSelector } from './TransactionTypeSelector';
import { TransactionForm } from './TransactionForm';
import { useTransactionForm } from '@/hooks/useTransactionForm';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTransactionModal({ isOpen, onClose }: AddTransactionModalProps) {
  const { form, onSubmit, transactionType, setType, isSubmitting, reset } = useTransactionForm({
    onSuccess: () => {
      onClose();
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <Box
        position="fixed"
        inset={0}
        bg="blackAlpha.600"
        backdropFilter="blur(4px)"
        zIndex={1000}
        onClick={handleClose}
      />

      {/* Modal */}
      <Box
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="full"
        maxW="500px"
        maxH="90vh"
        overflowY="auto"
        bg="white"
        _dark={{ bg: 'gray.800' }}
        borderRadius="xl"
        boxShadow="2xl"
        zIndex={1001}
        mx={4}
      >
        {/* Header */}
        <Flex
          justify="space-between"
          align="center"
          p={5}
          borderBottom="1px solid"
          borderColor="gray.200"
          _dark={{ borderColor: 'gray.700' }}
        >
          <Text fontSize="lg" fontWeight="bold">
            Tambah Transaksi
          </Text>
          <Box
            as="button"
            p={2}
            borderRadius="lg"
            _hover={{ bg: 'gray.100', _dark: { bg: 'gray.700' } }}
            onClick={handleClose}
          >
            <X size={20} />
          </Box>
        </Flex>

        {/* Body */}
        <form onSubmit={onSubmit}>
          <VStack gap={0} align="stretch" p={5}>
            {/* Type Selector */}
            <TransactionTypeSelector
              value={transactionType}
              onChange={(type) => setType(type)}
            />

            {/* Form Fields */}
            <TransactionForm form={form} />
          </VStack>

          {/* Footer */}
          <Flex
            justify="flex-end"
            gap={3}
            p={5}
            pt={4}
            borderTop="1px solid"
            borderColor="gray.200"
            _dark={{ borderColor: 'gray.700' }}
          >
            <Box
              as="button"
              px={5}
              py={2.5}
              borderRadius="lg"
              fontWeight="medium"
              bg="gray.100"
              color="gray.700"
              _dark={{ bg: 'gray.700', color: 'gray.300' }}
              _hover={{ bg: 'gray.200', _dark: { bg: 'gray.600' } }}
              onClick={handleClose}
            >
              Batal
            </Box>
            <Button
              type="submit"
              px={5}
              py={2.5}
              borderRadius="lg"
              fontWeight="medium"
              bg={transactionType === 'income' ? 'green.500' : 'red.500'}
              color="white"
              _hover={{
                bg: transactionType === 'income' ? 'green.600' : 'red.600',
              }}
              loading={isSubmitting}
            >
              Simpan Transaksi
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
}
