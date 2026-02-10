/**
 * AddTransactionModal - Modal untuk menambah transaksi baru
 * Features: backdrop blur, entrance animation, escape key, body scroll lock
 */

'use client';

import { useEffect, useCallback } from 'react';
import { Box, Flex, Text, VStack, Button, IconButton } from '@chakra-ui/react';
import { LuX } from 'react-icons/lu';
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
    if (isSubmitting) return; // Prevent closing while submitting
    reset();
    onClose();
  };

  // Keyboard escape handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) handleClose();
    },
    [isSubmitting]
  );

  // Lock body scroll & listen for escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

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
        className="backdrop-enter"
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
        borderRadius="2xl"
        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        zIndex={1001}
        mx={4}
        className="modal-enter"
      >
        {/* Header */}
        <Flex
          justify="space-between"
          align="center"
          p={5}
          borderBottom="1px solid"
          borderColor="gray.200"
          _dark={{ borderColor: 'gray.700' }}
          position="sticky"
          top={0}
          bg="white"
          zIndex={1}
          borderTopRadius="2xl"
          css={{
            _dark: { bg: 'var(--chakra-colors-gray-800)' },
          }}
        >
          <Text fontSize="lg" fontWeight="bold">
            Tambah Transaksi
          </Text>
          <IconButton
            aria-label="Tutup modal"
            variant="ghost"
            size="sm"
            onClick={handleClose}
            disabled={isSubmitting}
            borderRadius="lg"
            opacity={isSubmitting ? 0.5 : 1}
            _hover={{ bg: 'gray.100', _dark: { bg: 'gray.700' } }}
          >
            <LuX size={20} />
          </IconButton>
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
            position="sticky"
            bottom={0}
            bg="white"
            css={{
              _dark: { bg: 'var(--chakra-colors-gray-800)' },
            }}
            borderBottomRadius="2xl"
          >
            <Button
              variant="outline"
              borderRadius="lg"
              onClick={handleClose}
              disabled={isSubmitting}
              _dark={{ borderColor: 'gray.600' }}
            >
              Batal
            </Button>
            <Button
              type="submit"
              borderRadius="lg"
              fontWeight="medium"
              bg={transactionType === 'income' ? 'green.500' : 'red.500'}
              color="white"
              _hover={{
                bg: transactionType === 'income' ? 'green.600' : 'red.600',
                transform: 'translateY(-1px)',
                boxShadow: 'md',
              }}
              loading={isSubmitting}
              loadingText="Menyimpan..."
              transition="all 0.2s"
            >
              Simpan Transaksi
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
}
