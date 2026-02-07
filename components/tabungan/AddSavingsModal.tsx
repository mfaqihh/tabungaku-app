/**
 * AddSavingsModal - Modal untuk menambah tabungan baru
 * Menggunakan custom modal karena Chakra UI v3 tidak punya Modal lagi
 */

'use client';

import { Box, Text, Flex, IconButton } from '@chakra-ui/react';
import { LuX } from 'react-icons/lu';
import { SavingsForm } from './SavingsForm';
import { toaster } from '@/components/ui/toaster';

interface AddSavingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddSavingsModal({ isOpen, onClose }: AddSavingsModalProps) {
  // Handle success - show toast and close modal
  const handleSuccess = () => {
    toaster.success({
      title: 'Berhasil!',
      description: 'Tabungan baru berhasil dibuat.',
      duration: 3000,
    });
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
        zIndex={100}
        onClick={onClose}
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
        boxShadow="2xl"
        _dark={{ bg: 'gray.800' }}
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
        >
          <Text fontSize="lg" fontWeight="bold" color="gray.900" _dark={{ color: 'white' }}>
            Buat Target Tabungan Baru
          </Text>
          <IconButton
            aria-label="Tutup modal"
            variant="ghost"
            size="sm"
            onClick={onClose}
            borderRadius="lg"
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
