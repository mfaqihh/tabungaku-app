/**
 * CategoryForm - Form untuk menambah/edit kategori budget
 * Reusable component yang bisa dipakai di modal add/edit
 */

'use client';

import { Box, Text, VStack, Input, Button, Flex, RadioGroup, HStack, Badge } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import { CurrencyInput } from '@/components/ui/CurrencyInput';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { IconPickerLucide } from '@/components/ui/IconPickerLucide';
import { useBudgetCategoryForm } from '@/hooks/useBudgetForm';
import { formatCurrency } from '@/lib/utils/currency';

// Quick suggestions untuk nama kategori
const QUICK_SUGGESTIONS = [
  'Makanan & Minuman',
  'Transportasi',
  'Belanja Kebutuhan',
  'Hiburan',
  'Listrik',
  'Internet',
  'Kesehatan',
];

interface CategoryFormProps {
  onSuccess?: () => void;
}

export function CategoryForm({ onSuccess }: CategoryFormProps) {
  const {
    form,
    watchedValues,
    errors,
    isSubmitting,
    isValid,
    isAllocationValid,
    remainingBudget,
    onSubmit,
  } = useBudgetCategoryForm({ onSuccess });
  
  const { control, register } = form;
  
  return (
    <form onSubmit={onSubmit}>
      <VStack gap={5} align="stretch">
        {/* Remaining Budget Info */}
        <Box
          bg={remainingBudget > 0 ? 'blue.50' : 'orange.50'}
          p={4}
          borderRadius="lg"
          _dark={{
            bg: remainingBudget > 0 ? 'blue.900' : 'orange.900',
          }}
        >
          <Text
            fontSize="sm"
            color={remainingBudget > 0 ? 'blue.700' : 'orange.700'}
            _dark={{ color: remainingBudget > 0 ? 'blue.200' : 'orange.200' }}
          >
            Sisa budget yang bisa dialokasikan:
          </Text>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color={remainingBudget > 0 ? 'blue.600' : 'orange.600'}
            _dark={{ color: remainingBudget > 0 ? 'blue.300' : 'orange.300' }}
          >
            {formatCurrency(remainingBudget)}
          </Text>
        </Box>
        
        {/* Category Name */}
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.700" _dark={{ color: 'gray.300' }}>
            Nama Kategori
          </Text>
          <Input
            {...register('name')}
            placeholder="Contoh: Makan & Minum"
            size="md"
            borderRadius="lg"
          />
          {errors.name && (
            <Text fontSize="sm" color="red.500" mt={1}>
              {errors.name.message}
            </Text>
          )}
          
          {/* Quick suggestions */}
          <HStack mt={2} gap={2} flexWrap="wrap">
            <Text fontSize="xs" color="gray.500" _dark={{ color: 'gray.400' }}>
              Saran:
            </Text>
            {QUICK_SUGGESTIONS.map((suggestion) => (
              <Badge
                key={suggestion}
                size="sm"
                variant="outline"
                colorPalette="gray"
                cursor="pointer"
                onClick={() => form.setValue('name', suggestion, { shouldValidate: true })}
                _hover={{ bg: 'gray.100', _dark: { bg: 'gray.700' } }}
                borderRadius="md"
                px={2}
                py={0.5}
              >
                {suggestion}
              </Badge>
            ))}
          </HStack>
        </Box>
        
        {/* Category Type */}
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.700" _dark={{ color: 'gray.300' }}>
            Jenis Kategori
          </Text>
          <Controller
            name="categoryType"
            control={control}
            render={({ field }) => (
              <RadioGroup.Root
                value={field.value}
                onValueChange={({ value }) => field.onChange(value)}
              >
                <HStack gap={4}>
                  <RadioGroup.Item value="bulanan">
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>Bulanan (Recurring)</RadioGroup.ItemText>
                  </RadioGroup.Item>
                  <RadioGroup.Item value="berjangka">
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>Sesekali</RadioGroup.ItemText>
                  </RadioGroup.Item>
                </HStack>
              </RadioGroup.Root>
            )}
          />
        </Box>
        
        {/* Allocated Amount */}
        <Box>
          <Flex justify="space-between" align="center" mb={2}>
            <Text fontSize="sm" fontWeight="medium" color="gray.700" _dark={{ color: 'gray.300' }}>
              Alokasi Budget
            </Text>
            {!isAllocationValid && watchedValues.allocatedAmount > 0 && (
              <Text fontSize="xs" color="red.500">
                Melebihi sisa budget
              </Text>
            )}
          </Flex>
          <Controller
            name="allocatedAmount"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                value={field.value}
                onChange={field.onChange}
                placeholder="Contoh: 500.000"
                isInvalid={!!errors.allocatedAmount || !isAllocationValid}
              />
            )}
          />
          {errors.allocatedAmount && (
            <Text fontSize="sm" color="red.500" mt={1}>
              {errors.allocatedAmount.message}
            </Text>
          )}
          
          {/* Quick Presets */}
          <Flex gap={2} flexWrap="wrap" mt={2}>
            {[100000, 250000, 500000, 750000, 1000000].map((amount) => (
              <Button
                key={amount}
                size="xs"
                variant={watchedValues.allocatedAmount === amount ? 'solid' : 'outline'}
                colorPalette={watchedValues.allocatedAmount === amount ? 'teal' : 'gray'}
                onClick={() => form.setValue('allocatedAmount', Math.min(amount, remainingBudget), { shouldValidate: true })}
                borderRadius="full"
                disabled={amount > remainingBudget}
              >
                {amount >= 1000000 
                  ? `${(amount / 1000000).toFixed(0)} Jt`
                  : `${amount / 1000} Rb`
                }
              </Button>
            ))}
          </Flex>
        </Box>
        
        {/* Icon Picker */}
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.700" _dark={{ color: 'gray.300' }}>
            Pilih Icon
          </Text>
          <Controller
            name="iconValue"
            control={control}
            render={({ field }) => (
              <IconPickerLucide
                value={field.value}
                onChange={field.onChange}
                groupByCategory
              />
            )}
          />
          {errors.iconValue && (
            <Text fontSize="sm" color="red.500" mt={1}>
              {errors.iconValue.message}
            </Text>
          )}
        </Box>
        
        {/* Color Picker */}
        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <ColorPicker value={field.value} onChange={field.onChange} />
          )}
        />
        
        {/* Submit Button */}
        <Button
          type="submit"
          colorPalette="teal"
          size="lg"
          w="full"
          loading={isSubmitting}
          disabled={!isValid || isSubmitting || !isAllocationValid}
          mt={2}
        >
          Tambah Kategori
        </Button>
      </VStack>
    </form>
  );
}
