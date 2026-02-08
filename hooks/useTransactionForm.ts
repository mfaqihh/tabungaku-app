/**
 * Custom hook untuk mengelola form transaksi
 * Menggunakan React Hook Form dengan Zod validation
 * 
 * Menangani integrasi dengan:
 * - budgetStore (untuk expense)
 * - savingsStore (untuk income to savings)
 */

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useTransactionStore } from '@/stores/transactionStore';
import { useBudgetStore } from '@/stores/budgetStore';
import { useSavingsStore } from '@/stores/savingsStore';
import {
  transactionSchema,
  defaultTransactionValues,
  type TransactionFormData,
} from '@/lib/validations/transactionSchema';
import { formatCurrency } from '@/lib/utils/currency';
import { toaster } from '@/components/ui/toaster';

interface UseTransactionFormOptions {
  onSuccess?: () => void;
  defaultType?: 'income' | 'expense';
}

/**
 * Hook untuk form create transaksi baru
 */
export function useTransactionForm(options: UseTransactionFormOptions = {}) {
  const { onSuccess, defaultType = 'expense' } = options;

  // Store actions
  const addTransaction = useTransactionStore((state) => state.addTransaction);

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

  // Form setup
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      ...defaultTransactionValues,
      type: defaultType,
    } as TransactionFormData,
    mode: 'onChange',
  });

  const {
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = form;

  // Watched values for conditional UI
  const watchedType = watch('type');
  const watchedBudgetCategoryId = watch('budgetCategoryId');
  const watchedSavingsGoalId = watch('savingsGoalId');
  const watchedAmount = watch('amount');

  // Computed values
  const isIncome = watchedType === 'income';
  const isExpense = watchedType === 'expense';

  // Get selected category details
  const selectedCategory = useMemo(() => {
    if (!watchedBudgetCategoryId) return null;
    return budgetCategories.find((c) => c.id === watchedBudgetCategoryId);
  }, [budgetCategories, watchedBudgetCategoryId]);

  // Get selected savings details
  const selectedSavings = useMemo(() => {
    if (!watchedSavingsGoalId) return null;
    return savingsGoals.find((s) => s.id === watchedSavingsGoalId);
  }, [savingsGoals, watchedSavingsGoalId]);

  // Category remaining amount validation
  const categoryRemainingAmount = selectedCategory?.remainingAmount ?? 0;
  const isOverBudget = isExpense && watchedAmount > categoryRemainingAmount;

  // Toggle transaction type
  const toggleType = useCallback(() => {
    const newType = watchedType === 'income' ? 'expense' : 'income';
    setValue('type', newType);
    // Clear related fields when switching type
    setValue('budgetCategoryId', undefined);
    setValue('savingsGoalId', undefined);
  }, [watchedType, setValue]);

  // Set type explicitly
  const setType = useCallback(
    (type: 'income' | 'expense') => {
      setValue('type', type);
      // Clear related fields when switching type
      if (type === 'income') {
        setValue('budgetCategoryId', undefined);
      } else {
        setValue('savingsGoalId', undefined);
      }
    },
    [setValue]
  );

  // Submit handler
  const onSubmit = useCallback(
    async (data: TransactionFormData) => {
      try {
        // Build category name based on type
        let categoryName = 'Transaksi';

        if (data.type === 'expense' && selectedCategory) {
          categoryName = selectedCategory.name;
        } else if (data.type === 'income' && selectedSavings) {
          categoryName = `Menabung: ${selectedSavings.name}`;
        } else if (data.type === 'income') {
          categoryName = data.categoryName || 'Pemasukan';
        }

        // Create transaction
        addTransaction({
          type: data.type,
          amount: data.amount,
          description: data.description,
          categoryName,
          subcategoryName: data.subcategoryName,
          transactionDate: data.transactionDate,
          budgetCategoryId: data.budgetCategoryId,
          savingsGoalId: data.savingsGoalId,
        });

        const typeText = data.type === 'income' ? 'Pemasukan' : 'Pengeluaran';

        toaster.create({
          title: 'Transaksi Berhasil!',
          description: `${typeText} ${formatCurrency(data.amount)} telah dicatat`,
          type: 'success',
          duration: 3000,
        });

        // Reset form but keep the same type
        reset({
          ...defaultTransactionValues,
          type: data.type,
          transactionDate: new Date().toISOString().split('T')[0],
        } as TransactionFormData);

        onSuccess?.();
      } catch (error) {
        console.error('Error creating transaction:', error);
        toaster.create({
          title: 'Gagal',
          description: 'Terjadi kesalahan saat mencatat transaksi',
          type: 'error',
          duration: 3000,
        });
      }
    },
    [addTransaction, selectedCategory, selectedSavings, reset, onSuccess]
  );

  // Reset form to defaults
  const resetForm = useCallback(() => {
    reset({
      ...defaultTransactionValues,
      type: defaultType,
      transactionDate: new Date().toISOString().split('T')[0],
    } as TransactionFormData);
  }, [reset, defaultType]);

  return {
    // Form
    form,
    errors,
    isSubmitting,
    isValid,
    onSubmit: handleSubmit(onSubmit),
    reset: resetForm,

    // Type helpers
    transactionType: watchedType,
    isIncome,
    isExpense,
    toggleType,
    setType,

    // Related data
    budgetCategories,
    savingsGoals,
    selectedCategory,
    selectedSavings,
    hasBudgetPeriod: !!currentPeriod,

    // Validation helpers
    categoryRemainingAmount,
    isOverBudget,
    watchedAmount,
  };
}
