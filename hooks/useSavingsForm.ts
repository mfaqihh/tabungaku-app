/**
 * Custom hook untuk mengelola form tambah tabungan
 * Menggunakan React Hook Form dengan Zod validation
 */

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { savingsSchema, defaultSavingsFormValues, type SavingsFormData } from '@/lib/validations/savingsSchema';
import { useSavingsStore } from '@/stores/savingsStore';
import { getDefaultTargetDate } from '@/lib/utils/formatDate';

interface UseSavingsFormOptions {
  onSuccess?: () => void;
}

export function useSavingsForm({ onSuccess }: UseSavingsFormOptions = {}) {
  const addSavings = useSavingsStore((state) => state.addSavings);
  
  const form = useForm<SavingsFormData>({
    resolver: zodResolver(savingsSchema),
    defaultValues: defaultSavingsFormValues,
    mode: 'onChange', // Validasi saat onChange untuk UX yang lebih baik
  });
  
  const { watch, setValue, handleSubmit, reset, formState: { errors, isSubmitting, isValid } } = form;
  
  // Watch untuk reactive values
  const watchedValues = watch();
  
  // Handle perubahan tipe tabungan
  const handleTypeChange = useCallback((type: 'berjangka' | 'reguler') => {
    setValue('type', type, { shouldValidate: true });
    
    // Set default target date jika berjangka
    if (type === 'berjangka' && !watchedValues.targetDate) {
      setValue('targetDate', getDefaultTargetDate(), { shouldValidate: true });
    }
    
    // Clear target date jika reguler
    if (type === 'reguler') {
      setValue('targetDate', undefined, { shouldValidate: true });
    }
  }, [setValue, watchedValues.targetDate]);
  
  // Hitung target bulanan untuk preview
  const calculateMonthlyTarget = useCallback((): number | null => {
    const { type, targetAmount, targetDate, initialAmount = 0 } = watchedValues;
    
    if (type !== 'berjangka' || !targetDate || !targetAmount) {
      return null;
    }
    
    const today = new Date();
    const deadline = new Date(targetDate);
    
    const monthsRemaining = Math.max(1,
      (deadline.getFullYear() - today.getFullYear()) * 12 +
      deadline.getMonth() - today.getMonth()
    );
    
    const remainingAmount = targetAmount - (initialAmount || 0);
    return Math.ceil(remainingAmount / monthsRemaining);
  }, [watchedValues]);
  
  // Submit handler
  const onSubmit = useCallback(async (data: SavingsFormData) => {
    try {
      // Simulasi delay untuk loading state
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Tambah ke store
      addSavings({
        name: data.name,
        type: data.type,
        targetAmount: data.targetAmount,
        targetDate: data.targetDate,
        initialAmount: data.initialAmount,
        icon: data.icon,
        color: data.color,
      });
      
      // Reset form
      reset(defaultSavingsFormValues);
      
      // Callback success
      onSuccess?.();
      
      return true;
    } catch (error) {
      console.error('Error saving:', error);
      return false;
    }
  }, [addSavings, reset, onSuccess]);
  
  // Reset form ke default
  const resetForm = useCallback(() => {
    reset(defaultSavingsFormValues);
  }, [reset]);
  
  return {
    form,
    errors,
    isSubmitting,
    isValid,
    watchedValues,
    handleTypeChange,
    calculateMonthlyTarget,
    onSubmit: handleSubmit(onSubmit),
    resetForm,
    register: form.register,
    setValue,
  };
}
