/**
 * AddCategoryModal - Modal untuk menambah kategori budget baru
 */

'use client';

import { Box, Text, Flex, IconButton } from '@chakra-ui/react';
import { X } from 'lucide-react';
import { CategoryForm } from './CategoryForm';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCategoryModal({ isOpen, onClose }: AddCategoryModalProps) {
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
        w={{ base: '95vw', md: '550px' }}
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
            Tambah Kategori Budget
          </Text>
          <IconButton
            aria-label="Tutup modal"
            variant="ghost"
            size="sm"
            onClick={onClose}
            borderRadius="lg"
          >
            <X size={20} />
          </IconButton>
        </Flex>
        
        {/* Content */}
        <Box p={6}>
          <CategoryForm onSuccess={onClose} />
        </Box>
      </Box>
    </>
  );
}
