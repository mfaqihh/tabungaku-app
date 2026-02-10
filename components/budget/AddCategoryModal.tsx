/**
 * AddCategoryModal - Modal untuk menambah kategori budget baru
 * Features: backdrop blur, entrance animation, escape key, body scroll lock
 */

'use client';

import { useEffect, useCallback } from 'react';
import { Box, Flex, Text, IconButton } from '@chakra-ui/react';
import { LuX } from 'react-icons/lu';
import { CategoryForm } from './CategoryForm';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCategoryModal({ isOpen, onClose }: AddCategoryModalProps) {
  // Keyboard escape handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
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
        onClick={onClose}
        className="backdrop-enter"
      />

      {/* Modal */}
      <Box
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="full"
        maxW="520px"
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
          px={6}
          py={4}
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
          <Text fontSize="lg" fontWeight="bold" color="gray.900" _dark={{ color: 'white' }}>
            Tambah Kategori Budget
          </Text>
          <IconButton
            aria-label="Tutup modal"
            variant="ghost"
            size="sm"
            onClick={onClose}
            borderRadius="lg"
            _hover={{ bg: 'gray.100', _dark: { bg: 'gray.700' } }}
          >
            <LuX size={20} />
          </IconButton>
        </Flex>

        {/* Body */}
        <Box p={6}>
          <CategoryForm onSuccess={onClose} />
        </Box>
      </Box>
    </>
  );
}
