/**
 * Custom hooks untuk mengelola form budget
 * Menggunakan React Hook Form dengan Zod validation
 */

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import {
  budgetPeriodSchema,
  budgetCategorySchema,
  defaultBudgetPeriodValues,
  defaultBudgetCategoryValues,
  type BudgetPeriodFormData,
  type BudgetCategoryFormData,
} from '@/lib/validations/budgetSchema';
import { useBudgetStore } from '@/stores/budgetStore';
import { formatCurrency } from '@/lib/utils/currency';
import { toaster } from '@/components/ui/toaster';
import { TOAST_MESSAGES } from '@/constants/toastMessages';

interface UseBudgetFormOptions {
  onSuccess?: () => void;
}

/**
 * Hook untuk form create budget period (setup budget bulanan)
 */
export function useBudgetPeriodForm({ onSuccess }: UseBudgetFormOptions = {}) {
  const createBudgetPeriod = useBudgetStore((state) => state.createBudgetPeriod);
  
  const form = useForm<BudgetPeriodFormData>({
    resolver: zodResolver(budgetPeriodSchema),
    defaultValues: defaultBudgetPeriodValues,
    mode: 'onChange',
  });
  
  const { watch, handleSubmit, reset, formState: { errors, isSubmitting, isValid } } = form;
  
  const watchedValues = watch();
  
  // Submit handler
  const onSubmit = useCallback(async (data: BudgetPeriodFormData) => {
    try {
      createBudgetPeriod(data);
      
      const monthName = new Date(data.year, data.month - 1).toLocaleDateString('id-ID', { month: 'long' });
      
      toaster.create({
        title: TOAST_MESSAGES.budget.periodCreated.title,
        description: TOAST_MESSAGES.budget.periodCreated.description(`${monthName} ${data.year}`),
        type: 'success',
        duration: 4000,
      });
      
      reset(defaultBudgetPeriodValues);
      onSuccess?.();
    } catch (error) {
      console.error('Error creating budget period:', error);
      toaster.create({
        title: TOAST_MESSAGES.errors.saveFailed.title,
        description: TOAST_MESSAGES.errors.saveFailed.description,
        type: 'error',
        duration: 4000,
      });
    }
  }, [createBudgetPeriod, reset, onSuccess]);
  
  return {
    form,
    watchedValues,
    errors,
    isSubmitting,
    isValid,
    onSubmit: handleSubmit(onSubmit),
    reset,
  };
}

/**
 * Hook untuk form add/edit budget category
 */
export function useBudgetCategoryForm({ onSuccess }: UseBudgetFormOptions = {}) {
  const { addCategory, getCurrentPeriod, getRemainingToAllocate } = useBudgetStore();
  const currentPeriod = getCurrentPeriod();
  
  const form = useForm<BudgetCategoryFormData>({
    resolver: zodResolver(budgetCategorySchema),
    defaultValues: {
      ...defaultBudgetCategoryValues,
      budgetPeriodId: currentPeriod?.id || '',
    } as BudgetCategoryFormData,
    mode: 'onChange',
  });
  
  const { watch, setValue, handleSubmit, reset, formState: { errors, isSubmitting, isValid } } = form;
  
  const watchedValues = watch();
  const remainingBudget = getRemainingToAllocate();
  
  // Validate allocation doesn't exceed remaining budget
  const isAllocationValid = watchedValues.allocatedAmount <= remainingBudget;
  
  // Submit handler
  const onSubmit = useCallback(async (data: BudgetCategoryFormData) => {
    // Validate against remaining budget
    if (data.allocatedAmount > remainingBudget) {
      toaster.create({
        title: TOAST_MESSAGES.budget.allocationExceeded.title,
        description: TOAST_MESSAGES.budget.allocationExceeded.description(formatCurrency(remainingBudget)),
        type: 'error',
        duration: 4000,
      });
      return;
    }
    
    try {
      addCategory({
        ...data,
        budgetPeriodId: currentPeriod?.id || '',
      });
      
      toaster.create({
        title: TOAST_MESSAGES.budget.categoryCreated.title,
        description: TOAST_MESSAGES.budget.categoryCreated.description(data.name, formatCurrency(data.allocatedAmount)),
        type: 'success',
        duration: 4000,
      });
      
      // Reset form with new budgetPeriodId
      reset({
        ...defaultBudgetCategoryValues,
        budgetPeriodId: currentPeriod?.id || '',
      } as BudgetCategoryFormData);
      
      onSuccess?.();
    } catch (error) {
      console.error('Error adding category:', error);
      toaster.create({
        title: TOAST_MESSAGES.errors.saveFailed.title,
        description: TOAST_MESSAGES.errors.saveFailed.description,
        type: 'error',
        duration: 4000,
      });
    }
  }, [addCategory, currentPeriod?.id, remainingBudget, reset, onSuccess]);
  
  // Update budgetPeriodId when currentPeriod changes
  const updatePeriodId = useCallback(() => {
    if (currentPeriod?.id) {
      setValue('budgetPeriodId', currentPeriod.id);
    }
  }, [currentPeriod?.id, setValue]);
  
  return {
    form,
    watchedValues,
    errors,
    isSubmitting,
    isValid,
    isAllocationValid,
    remainingBudget,
    onSubmit: handleSubmit(onSubmit),
    reset,
    updatePeriodId,
  };
}
