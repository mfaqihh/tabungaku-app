/**
 * AddSavingsModal - Modal untuk menambah tabungan baru
 * Features: backdrop blur, entrance animation, escape key, body scroll lock
 */

'use client';

import { useEffect, useCallback } from 'react';
import { Box, Text, Flex, IconButton } from '@chakra-ui/react';
import { LuX } from 'react-icons/lu';
import { SavingsForm } from './SavingsForm';
import { toaster } from '@/components/ui/toaster';
import { TOAST_MESSAGES } from '@/constants/toastMessages';

interface AddSavingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddSavingsModal({ isOpen, onClose }: AddSavingsModalProps) {
  // Handle success - show toast and close modal
  const handleSuccess = (name?: string) => {
    const msg = TOAST_MESSAGES.savings.created;
    toaster.create({
      title: msg.title,
      description: msg.description(name || 'Tabungan Baru'),
      type: 'success',
      duration: 4000,
    });
    onClose();
  };

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
        zIndex={100}
        onClick={onClose}
        className="backdrop-enter"
      />

      {/* Modal Container */}
      <Box
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex={101}
        w={{ base: '95vw', md: '700px', lg: '800px' }}
        maxH="90vh"
        overflowY="auto"
        bg="white"
        borderRadius="2xl"
        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        _dark={{ bg: 'gray.800' }}
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
          position="sticky"
          top={0}
          bg="white"
          _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
          zIndex={1}
          borderTopRadius="2xl"
        >
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="gray.900"
            _dark={{ color: 'white' }}
          >
            Buat Target Tabungan Baru
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

        {/* Body - Form */}
        <Box p={6}>
          <SavingsForm onSuccess={handleSuccess} onCancel={onClose} />
        </Box>
      </Box>
    </>
  );
}
