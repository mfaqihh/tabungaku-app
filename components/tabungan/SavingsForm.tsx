/**
 * SavingsForm - Form untuk membuat tabungan baru
 * Includes:
 * - Semua input fields
 * - Preview card real-time
 * - Validasi dengan error messages
 */

'use client';

import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Fieldset,
  RadioGroup,
  Flex,
  Separator,
  Icon,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import { CurrencyInput } from '@/components/ui/CurrencyInput';
import { IconPicker, getIconComponent } from '@/components/ui/IconPicker';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { useSavingsForm } from '@/hooks/useSavingsForm';
import { formatCurrency } from '@/lib/utils/currency';
import { formatDateShort, getMinDate, formatTimeRemaining } from '@/lib/utils/formatDate';

interface SavingsFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function SavingsForm({ onSuccess, onCancel }: SavingsFormProps) {
  const {
    form,
    errors,
    isSubmitting,
    watchedValues,
    handleTypeChange,
    calculateMonthlyTarget,
    onSubmit,
    resetForm,
  } = useSavingsForm({ onSuccess });
  
  const { control, register } = form;
  const monthlyTarget = calculateMonthlyTarget();
  
  // Handle cancel
  const handleCancel = () => {
    resetForm();
    onCancel?.();
  };
  
  return (
    <form onSubmit={onSubmit}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap={6}
      >
        {/* Form Fields */}
        <Box flex={1}>
          <VStack gap={5} align="stretch">
            {/* Nama Tabungan */}
            <Fieldset.Root invalid={!!errors.name}>
              <Fieldset.Legend fontSize="sm" fontWeight="medium" color="gray.700" _dark={{ color: 'gray.300' }}>
                Nama Tabungan
              </Fieldset.Legend>
              <Input
                {...register('name')}
                placeholder="Contoh: Dana Darurat"
                size="md"
                borderRadius="lg"
                bg="white"
                borderColor={errors.name ? 'red.500' : 'gray.200'}
                _dark={{ bg: 'gray.700', borderColor: errors.name ? 'red.500' : 'gray.600' }}
              />
              {errors.name && (
                <Text fontSize="xs" color="red.500" mt={1}>
                  {errors.name.message}
                </Text>
              )}
            </Fieldset.Root>
            
            {/* Jenis Tabungan */}
            <Fieldset.Root invalid={!!errors.type}>
              <Fieldset.Legend fontSize="sm" fontWeight="medium" color="gray.700" _dark={{ color: 'gray.300' }}>
                Jenis Tabungan
              </Fieldset.Legend>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <RadioGroup.Root
                    value={field.value}
                    onValueChange={(details) => handleTypeChange(details.value as 'berjangka' | 'reguler')}
                  >
                    <HStack gap={4}>
                      <RadioGroup.Item value="reguler">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>
                          <Text fontSize="sm">Reguler</Text>
                          <Text fontSize="xs" color="gray.500">Tanpa deadline</Text>
                        </RadioGroup.ItemText>
                      </RadioGroup.Item>
                      <RadioGroup.Item value="berjangka">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>
                          <Text fontSize="sm">Berjangka</Text>
                          <Text fontSize="xs" color="gray.500">Ada target waktu</Text>
                        </RadioGroup.ItemText>
                      </RadioGroup.Item>
                    </HStack>
                  </RadioGroup.Root>
                )}
              />
            </Fieldset.Root>
            
            {/* Target Jumlah */}
            <Fieldset.Root invalid={!!errors.targetAmount}>
              <Fieldset.Legend fontSize="sm" fontWeight="medium" color="gray.700" _dark={{ color: 'gray.300' }}>
                Target Jumlah
              </Fieldset.Legend>
              <Controller
                name="targetAmount"
                control={control}
                render={({ field }) => (
                  <CurrencyInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="0"
                    isInvalid={!!errors.targetAmount}
                  />
                )}
              />
              {errors.targetAmount && (
                <Text fontSize="xs" color="red.500" mt={1}>
                  {errors.targetAmount.message}
                </Text>
              )}
            </Fieldset.Root>
            
            {/* Target Tanggal - Conditional */}
            {watchedValues.type === 'berjangka' && (
              <Fieldset.Root invalid={!!errors.targetDate}>
                <Fieldset.Legend fontSize="sm" fontWeight="medium" color="gray.700" _dark={{ color: 'gray.300' }}>
                  Target Tanggal
                </Fieldset.Legend>
                <Input
                  type="date"
                  {...register('targetDate')}
                  min={getMinDate()}
                  size="md"
                  borderRadius="lg"
                  bg="white"
                  borderColor={errors.targetDate ? 'red.500' : 'gray.200'}
                  _dark={{ bg: 'gray.700', borderColor: errors.targetDate ? 'red.500' : 'gray.600' }}
                />
                {errors.targetDate && (
                  <Text fontSize="xs" color="red.500" mt={1}>
                    {errors.targetDate.message}
                  </Text>
                )}
              </Fieldset.Root>
            )}
            
            {/* Saldo Awal (Optional) */}
            <Fieldset.Root invalid={!!errors.initialAmount}>
              <Fieldset.Legend fontSize="sm" fontWeight="medium" color="gray.700" _dark={{ color: 'gray.300' }}>
                Saldo Awal <Text as="span" color="gray.400" fontWeight="normal">(opsional)</Text>
              </Fieldset.Legend>
              <Controller
                name="initialAmount"
                control={control}
                render={({ field }) => (
                  <CurrencyInput
                    value={field.value || 0}
                    onChange={field.onChange}
                    placeholder="0"
                    isInvalid={!!errors.initialAmount}
                  />
                )}
              />
              {errors.initialAmount && (
                <Text fontSize="xs" color="red.500" mt={1}>
                  {errors.initialAmount.message}
                </Text>
              )}
            </Fieldset.Root>
            
            <Separator />
            
            {/* Icon Picker */}
            <Controller
              name="icon"
              control={control}
              render={({ field }) => (
                <IconPicker value={field.value} onChange={field.onChange} />
              )}
            />
            
            {/* Color Picker */}
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <ColorPicker value={field.value} onChange={field.onChange} />
              )}
            />
          </VStack>
        </Box>
        
        {/* Preview Card */}
        <Box
          w={{ base: 'full', md: '280px' }}
          flexShrink={0}
        >
          <Text fontSize="sm" fontWeight="medium" mb={3} color="gray.700" _dark={{ color: 'gray.300' }}>
            Preview
          </Text>
          <Box
            bg={watchedValues.color}
            bgGradient={`linear(to-br, ${watchedValues.color}, ${watchedValues.color}dd)`}
            borderRadius="xl"
            p={5}
            color="white"
            minH="180px"
          >
            <Flex direction="column" h="full" justify="space-between">
              {/* Header dengan icon */}
              <Flex justify="space-between" align="flex-start" mb={3}>
                <Box>
                  <Text fontSize="xs" opacity={0.9} textTransform="uppercase" letterSpacing="wide" mb={1}>
                    {watchedValues.type === 'berjangka' ? 'Berjangka' : 'Reguler'}
                  </Text>
                  <Text fontSize="lg" fontWeight="bold" lineHeight="tight">
                    {watchedValues.name || 'Nama Tabungan'}
                  </Text>
                </Box>
                <Flex
                  p={2}
                  bg="whiteAlpha.200"
                  borderRadius="lg"
                  align="center"
                  justify="center"
                >
                  <Icon boxSize={7} color="white">
                    {(() => { const IconComp = getIconComponent(watchedValues.icon); return <IconComp />; })()}
                  </Icon>
                </Flex>
              </Flex>
              
              {/* Target Amount */}
              <Box mb={3}>
                <Text fontSize="xs" opacity={0.8}>Target</Text>
                <Text fontSize="xl" fontWeight="bold">
                  {watchedValues.targetAmount > 0 
                    ? formatCurrency(watchedValues.targetAmount)
                    : 'Rp 0'}
                </Text>
              </Box>
              
              {/* Target Date & Monthly Suggestion */}
              {watchedValues.type === 'berjangka' && watchedValues.targetDate && (
                <Box
                  bg="whiteAlpha.200"
                  borderRadius="lg"
                  p={3}
                >
                  <Flex justify="space-between" align="center" mb={1}>
                    <Text fontSize="xs" opacity={0.9}>
                      Deadline: {formatDateShort(watchedValues.targetDate)}
                    </Text>
                    <Text fontSize="xs" opacity={0.9}>
                      {formatTimeRemaining(watchedValues.targetDate)}
                    </Text>
                  </Flex>
                  {monthlyTarget && monthlyTarget > 0 && (
                    <Text fontSize="sm" fontWeight="medium">
                      💡 Nabung {formatCurrency(monthlyTarget)}/bulan
                    </Text>
                  )}
                </Box>
              )}
              
              {/* Initial Amount Info */}
              {watchedValues.initialAmount && watchedValues.initialAmount > 0 && (
                <Text fontSize="xs" opacity={0.8} mt={2}>
                  Saldo awal: {formatCurrency(watchedValues.initialAmount)}
                </Text>
              )}
            </Flex>
          </Box>
        </Box>
      </Flex>
      
      {/* Form Actions */}
      <Flex justify="flex-end" gap={3} mt={6} pt={4} borderTop="1px solid" borderColor="gray.200" _dark={{ borderColor: 'gray.700' }}>
        <Button
          variant="outline"
          onClick={handleCancel}
          borderRadius="lg"
          _dark={{ borderColor: 'gray.600' }}
        >
          Batal
        </Button>
        <Button
          type="submit"
          colorPalette="teal"
          borderRadius="lg"
          loading={isSubmitting}
          loadingText="Menyimpan..."
        >
          Buat Tabungan
        </Button>
      </Flex>
    </form>
  );
}
