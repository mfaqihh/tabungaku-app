/**
 * CreateBudgetModal - Modal untuk setup budget bulan baru
 * Ditampilkan saat pertama kali user masuk dan belum ada budget bulan ini
 */

'use client';

import { Box, Text, Flex, IconButton, VStack, Input, Button, HStack } from '@chakra-ui/react';
import { X, Calendar, Wallet } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { CurrencyInput } from '@/components/ui/CurrencyInput';
import { useBudgetPeriodForm } from '@/hooks/useBudgetForm';

interface CreateBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Bulan dalam Bahasa Indonesia
const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export function CreateBudgetModal({ isOpen, onClose }: CreateBudgetModalProps) {
  const { form, watchedValues, errors, isSubmitting, isValid, onSubmit } = useBudgetPeriodForm({
    onSuccess: onClose,
  });
  
  const { control, setValue } = form;
  
  if (!isOpen) return null;
  
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  
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
        w={{ base: '95vw', md: '480px' }}
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
          _dark={{ borderColor: 'gray.700' }}
        >
          <Text fontSize="lg" fontWeight="bold" color="gray.900" _dark={{ color: 'white' }}>
            Buat Budget Bulan Ini
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
          <form onSubmit={onSubmit}>
            <VStack gap={5} align="stretch">
              {/* Info Text */}
              <Box
                bg="teal.50"
                p={4}
                borderRadius="lg"
                _dark={{ bg: 'teal.900' }}
              >
                <Flex gap={3} align="flex-start">
                  <Box color="teal.500" mt={0.5}>
                    <Calendar size={20} />
                  </Box>
                  <Text fontSize="sm" color="teal.700" _dark={{ color: 'teal.200' }}>
                    Buat budget untuk bulan {MONTHS[currentMonth - 1]} {currentYear}. 
                    Tentukan total anggaran yang ingin kamu kelola bulan ini.
                  </Text>
                </Flex>
              </Box>
              
              {/* Period Display */}
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.700" _dark={{ color: 'gray.300' }}>
                  Periode Budget
                </Text>
                <HStack
                  p={3}
                  bg="gray.50"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="gray.200"
                  _dark={{ bg: 'gray.700', borderColor: 'gray.600' }}
                >
                  <Calendar size={18} />
                  <Text fontWeight="medium">
                    {MONTHS[currentMonth - 1]} {currentYear}
                  </Text>
                </HStack>
                <Input type="hidden" {...form.register('month', { valueAsNumber: true })} value={currentMonth} />
                <Input type="hidden" {...form.register('year', { valueAsNumber: true })} value={currentYear} />
              </Box>
              
              {/* Total Budget */}
              <Box>
                <Flex justify="space-between" align="center" mb={2}>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700" _dark={{ color: 'gray.300' }}>
                    Total Budget Bulanan
                  </Text>
                  <Wallet size={18} />
                </Flex>
                <Controller
                  name="totalBudget"
                  control={control}
                  render={({ field }) => (
                    <CurrencyInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Contoh: 5.000.000"
                      isInvalid={!!errors.totalBudget}
                    />
                  )}
                />
                {errors.totalBudget && (
                  <Text fontSize="sm" color="red.500" mt={1}>
                    {errors.totalBudget.message}
                  </Text>
                )}
                <Text fontSize="xs" color="gray.500" mt={1} _dark={{ color: 'gray.400' }}>
                  Total anggaran yang ingin kamu kelola bulan ini
                </Text>
              </Box>
              
              {/* Quick Presets */}
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.600" _dark={{ color: 'gray.400' }}>
                  Pilihan Cepat
                </Text>
                <Flex gap={2} flexWrap="wrap">
                  {[1000000, 2000000, 3000000, 5000000, 7500000, 10000000].map((amount) => (
                    <Button
                      key={amount}
                      size="sm"
                      variant={watchedValues.totalBudget === amount ? 'solid' : 'outline'}
                      colorPalette={watchedValues.totalBudget === amount ? 'teal' : 'gray'}
                      onClick={() => setValue('totalBudget', amount, { shouldValidate: true })}
                      borderRadius="full"
                    >
                      {amount >= 1000000 
                        ? `${(amount / 1000000).toFixed(amount % 1000000 === 0 ? 0 : 1)} Jt`
                        : `${amount / 1000} Rb`
                      }
                    </Button>
                  ))}
                </Flex>
              </Box>
              
              {/* Submit Button */}
              <Button
                type="submit"
                colorPalette="teal"
                size="lg"
                w="full"
                loading={isSubmitting}
                disabled={!isValid || isSubmitting}
                mt={2}
              >
                Buat Budget
              </Button>
            </VStack>
          </form>
        </Box>
      </Box>
    </>
  );
}
