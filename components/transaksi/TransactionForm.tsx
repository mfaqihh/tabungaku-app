/**
 * TransactionForm - Form dinamis untuk input transaksi
 * Fields berbeda berdasarkan type (income/expense)
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Box,
  VStack,
  Text,
  Flex,
  NativeSelect,
  Input,
} from '@chakra-ui/react';
import { AlertCircle, PiggyBank, Wallet } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import type { TransactionFormData } from '@/lib/validations/transactionSchema';
import { CurrencyInput } from '@/components/ui/CurrencyInput';
import { useBudgetStore } from '@/stores/budgetStore';
import { useSavingsStore } from '@/stores/savingsStore';
import { formatCurrency } from '@/lib/utils/currency';
import {
  INCOME_CATEGORIES,
  QUICK_AMOUNTS,
  EXPENSE_DESCRIPTIONS,
  INCOME_DESCRIPTIONS,
} from '@/constants/transactionCategories';

interface TransactionFormProps {
  form: UseFormReturn<TransactionFormData>;
}

export function TransactionForm({ form }: TransactionFormProps) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const [saveToSavings, setSaveToSavings] = useState(false);

  // Watched values
  const watchedType = watch('type');
  const watchedAmount = watch('amount');
  const watchedCategoryId = watch('budgetCategoryId');
  const watchedDescription = watch('description');

  const isIncome = watchedType === 'income';
  const isExpense = watchedType === 'expense';

    // Budget data (for expense categories) - get raw state to avoid infinite loop
  const budgetPeriods = useBudgetStore((state) => state.budgetPeriods);
  const allBudgetCategories = useBudgetStore((state) => state.budgetCategories);

  // Compute current period using useMemo
  const currentPeriod = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    return budgetPeriods.find(
      (p) => p.month === currentMonth && p.year === currentYear
    ) || null;
  }, [budgetPeriods]);

  // Compute budget categories for current period
  const budgetCategories = useMemo(() => {
    if (!currentPeriod) return [];
    return allBudgetCategories.filter((c) => c.budgetPeriodId === currentPeriod.id);
  }, [allBudgetCategories, currentPeriod]);

  // Savings data (for income to savings option) - get raw state
  const allSavingsGoals = useSavingsStore((state) => state.savingsGoals);

  // Compute active savings goals
  const savingsGoals = useMemo(() => {
    return allSavingsGoals.filter((s) => s.isActive);
  }, [allSavingsGoals]);

  // Get selected category details
  const selectedCategory = budgetCategories.find((c) => c.id === watchedCategoryId);

  // Check if expense exceeds category budget
  const isOverBudget =
    isExpense && selectedCategory
      ? watchedAmount > (selectedCategory.remainingAmount ?? 0)
      : false;

  // Reset saveToSavings when type changes
  useEffect(() => {
    if (isExpense) {
      setSaveToSavings(false);
      setValue('savingsGoalId', undefined);
    }
  }, [isExpense, setValue]);

  // Quick descriptions based on type
  const quickDescriptions = isIncome ? INCOME_DESCRIPTIONS : EXPENSE_DESCRIPTIONS;

  return (
    <VStack gap={5} align="stretch" mt={4}>
      {/* Jumlah */}
      <Box>
        <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.600" _dark={{ color: 'gray.400' }}>
          Jumlah <Text as="span" color="red.500">*</Text>
        </Text>
        <CurrencyInput
          value={watch('amount')}
          onChange={(value) => setValue('amount', value)}
          placeholder="0"
          isInvalid={!!errors.amount}
        />
        {errors.amount && (
          <Text fontSize="sm" color="red.500" mt={1}>
            {errors.amount.message}
          </Text>
        )}
        
        {/* Quick Amount Buttons */}
        <Flex mt={2} gap={2} flexWrap="wrap">
          {QUICK_AMOUNTS.map((preset) => (
            <Box
              key={preset.value}
              as="button"
              px={3}
              py={1}
              fontSize="xs"
              borderRadius="full"
              bg="gray.100"
              color="gray.600"
              _dark={{ bg: 'gray.700', color: 'gray.300' }}
              _hover={{
                bg: isIncome ? 'green.100' : 'red.100',
                color: isIncome ? 'green.700' : 'red.700',
                _dark: {
                  bg: isIncome ? 'green.900' : 'red.900',
                  color: isIncome ? 'green.300' : 'red.300',
                },
              }}
              onClick={() => setValue('amount', preset.value)}
            >
              {preset.label}
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Deskripsi */}
      <Box>
        <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.600" _dark={{ color: 'gray.400' }}>
          Deskripsi <Text as="span" color="red.500">*</Text>
        </Text>
                <Input
          {...register('description')}
          placeholder="cth: Gaji Bulanan, Belanja Bulanan"
          bg="white"
          borderColor={errors.description ? 'red.500' : 'gray.200'}
          _dark={{
            bg: 'gray.700',
            borderColor: errors.description ? 'red.500' : 'gray.600',
          }}
          _focus={{
            borderColor: 'teal.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-teal-500)',
          }}
        />
        {errors.description && (
          <Text fontSize="sm" color="red.500" mt={1}>
            {errors.description.message}
          </Text>
        )}
        
        {/* Quick Description Suggestions */}
        {!watchedDescription && (
          <Flex mt={2} gap={2} flexWrap="wrap">
            {quickDescriptions.slice(0, 4).map((desc) => (
              <Box
                key={desc}
                as="button"
                px={3}
                py={1}
                fontSize="xs"
                borderRadius="full"
                bg="gray.100"
                color="gray.600"
                _dark={{ bg: 'gray.700', color: 'gray.300' }}
                _hover={{
                  bg: 'teal.100',
                  color: 'teal.700',
                  _dark: { bg: 'teal.900', color: 'teal.300' },
                }}
                onClick={() => setValue('description', desc)}
              >
                {desc}
              </Box>
            ))}
          </Flex>
        )}
      </Box>

      {/* Tanggal */}
      <Box>
        <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.600" _dark={{ color: 'gray.400' }}>
          Tanggal Transaksi <Text as="span" color="red.500">*</Text>
        </Text>
                <Input
          type="date"
          {...register('transactionDate')}
          max={new Date().toISOString().split('T')[0]}
          bg="white"
          borderColor={errors.transactionDate ? 'red.500' : 'gray.200'}
          _dark={{
            bg: 'gray.700',
            borderColor: errors.transactionDate ? 'red.500' : 'gray.600',
          }}
          _focus={{
            borderColor: 'teal.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-teal-500)',
          }}
        />
        {errors.transactionDate && (
          <Text fontSize="sm" color="red.500" mt={1}>
            {errors.transactionDate.message}
          </Text>
        )}
      </Box>

      {/* ========================================= */}
      {/* INCOME-SPECIFIC FIELDS */}
      {/* ========================================= */}
      {isIncome && (
        <>
          {/* Kategori Income (Optional) */}
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.600" _dark={{ color: 'gray.400' }}>
              Kategori (Opsional)
            </Text>
            <NativeSelect.Root>
              <NativeSelect.Field
                {...register('subcategoryName')}
                bg="white"
                _dark={{ bg: 'gray.700' }}
              >
                <option value="">Pilih kategori</option>
                {INCOME_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Box>

          {/* Simpan ke Tabungan Toggle */}
          <Box
            p={4}
            borderRadius="lg"
            bg="gray.50"
            border="1px solid"
            borderColor="gray.200"
            _dark={{ bg: 'gray.750', borderColor: 'gray.600' }}
          >
            <Flex justify="space-between" align="center">
              <Flex gap={3} align="center">
                <Box
                  p={2}
                  borderRadius="lg"
                  bg="teal.100"
                  color="teal.600"
                  _dark={{ bg: 'teal.900', color: 'teal.300' }}
                >
                  <PiggyBank size={20} />
                </Box>
                <Box>
                  <Text fontWeight="medium" fontSize="sm">
                    Simpan ke Tabungan?
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Tambahkan ke salah satu goal tabungan
                  </Text>
                </Box>
              </Flex>
              <Box
                as="button"
                w="44px"
                h="24px"
                borderRadius="full"
                bg={saveToSavings ? 'teal.500' : 'gray.300'}
                position="relative"
                transition="all 0.2s"
                onClick={() => {
                  const newValue = !saveToSavings;
                  setSaveToSavings(newValue);
                  if (!newValue) {
                    setValue('savingsGoalId', undefined);
                  }
                }}
              >
                <Box
                  position="absolute"
                  top="2px"
                  left={saveToSavings ? '22px' : '2px'}
                  w="20px"
                  h="20px"
                  borderRadius="full"
                  bg="white"
                  transition="all 0.2s"
                  boxShadow="sm"
                />
              </Box>
            </Flex>
          </Box>

                    {/* Pilih Savings Goal (Conditional) */}
          {saveToSavings && (
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.600" _dark={{ color: 'gray.400' }}>
                Pilih Tabungan
              </Text>
              <NativeSelect.Root>
                <NativeSelect.Field
                  {...register('savingsGoalId')}
                  bg="white"
                  _dark={{ bg: 'gray.700' }}
                >
                  <option value="">Pilih goal tabungan</option>
                  {savingsGoals.map((goal) => (
                    <option key={goal.id} value={goal.id}>
                      {goal.name} - Sisa: {formatCurrency(goal.remainingAmount || 0)}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
              {errors.savingsGoalId && (
                <Text fontSize="sm" color="red.500" mt={1}>
                  {errors.savingsGoalId.message}
                </Text>
              )}

              {savingsGoals.length === 0 && (
                <Text fontSize="xs" color="orange.500" mt={2}>
                  Belum ada goal tabungan. Buat di menu Tabungan terlebih dahulu.
                </Text>
              )}
            </Box>
          )}
        </>
      )}

      {/* ========================================= */}
      {/* EXPENSE-SPECIFIC FIELDS */}
      {/* ========================================= */}
      {isExpense && (
        <>
          {/* Kategori Budget (REQUIRED) */}
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.600" _dark={{ color: 'gray.400' }}>
              Kategori Budget <Text as="span" color="red.500">*</Text>
            </Text>
            <NativeSelect.Root>
              <NativeSelect.Field
                {...register('budgetCategoryId')}
                bg="white"
                _dark={{ bg: 'gray.700' }}
              >
                <option value="">Pilih kategori</option>
                {budgetCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} - Sisa: {formatCurrency(category.remainingAmount ?? 0)}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            {errors.budgetCategoryId && (
              <Text fontSize="sm" color="red.500" mt={1}>
                {errors.budgetCategoryId.message}
              </Text>
            )}

            {/* Over Budget Warning */}
            {isOverBudget && selectedCategory && (
              <Flex
                mt={2}
                p={3}
                bg="red.50"
                borderRadius="lg"
                gap={2}
                align="flex-start"
                _dark={{ bg: 'red.900' }}
              >
                <AlertCircle size={16} color="var(--chakra-colors-red-500)" />
                <Text fontSize="sm" color="red.600" _dark={{ color: 'red.300' }}>
                  Pengeluaran melebihi sisa budget kategori ini!
                  Sisa: {formatCurrency(selectedCategory.remainingAmount ?? 0)}
                </Text>
              </Flex>
            )}

            {/* Selected Category Info */}
            {selectedCategory && !isOverBudget && (
              <Flex
                mt={2}
                p={3}
                bg="blue.50"
                borderRadius="lg"
                align="center"
                gap={2}
                _dark={{ bg: 'blue.900' }}
              >
                <Wallet size={16} color="var(--chakra-colors-blue-500)" />
                <Text fontSize="sm" color="blue.600" _dark={{ color: 'blue.300' }}>
                  Sisa budget: {formatCurrency(selectedCategory.remainingAmount ?? 0)}
                </Text>
              </Flex>
            )}

            {budgetCategories.length === 0 && (
              <Text fontSize="xs" color="orange.500" mt={2}>
                Belum ada kategori budget. Buat di menu Budget terlebih dahulu.
              </Text>
            )}
          </Box>
        </>
      )}
    </VStack>
  );
}
