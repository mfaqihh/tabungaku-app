/**
 * Zustand store untuk mengelola data tabungan
 * Menggunakan persist middleware untuk menyimpan ke localStorage
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SavingsGoal, CreateSavingsInput, UpdateSavingsInput } from './types';

interface SavingsStore {
  // State
  savingsGoals: SavingsGoal[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addSavings: (data: CreateSavingsInput) => SavingsGoal;
  updateSavings: (id: string, data: UpdateSavingsInput) => void;
  deleteSavings: (id: string) => void;
  getSavingsById: (id: string) => SavingsGoal | undefined;
  addFunds: (id: string, amount: number) => void;
  withdrawFunds: (id: string, amount: number) => boolean;
  clearError: () => void;
}

/**
 * Menghitung target nabung bulanan untuk tabungan berjangka
 */
const calculateMonthlyTarget = (
  targetAmount: number,
  targetDate: string,
  initialAmount: number = 0
): number => {
  const today = new Date();
  const deadline = new Date(targetDate);
  
  // Hitung selisih bulan
  const monthsRemaining = Math.max(1,
    (deadline.getFullYear() - today.getFullYear()) * 12 +
    deadline.getMonth() - today.getMonth()
  );
  
  // Hitung sisa yang perlu ditabung
  const remainingAmount = targetAmount - initialAmount;
  
  // Target bulanan (dibulatkan ke atas)
  return Math.ceil(remainingAmount / monthsRemaining);
};

/**
 * Generate unique ID untuk tabungan baru
 */
const generateId = (): string => {
  return `savings_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

export const useSavingsStore = create<SavingsStore>()(
  persist(
    (set, get) => ({
      savingsGoals: [],
      isLoading: false,
      error: null,
      
      addSavings: (data: CreateSavingsInput): SavingsGoal => {
        const id = generateId();
        const now = new Date().toISOString();
        const initialAmount = data.initialAmount || 0;
        
        const newSavings: SavingsGoal = {
          id,
          userId: 'user_mock', // Mock untuk sementara
          name: data.name,
          type: data.type,
          targetAmount: data.targetAmount,
          targetDate: data.targetDate,
          initialAmount: initialAmount,
          currentAmount: initialAmount,
          icon: data.icon,
          color: data.color,
          isActive: true,
          createdAt: now,
          updatedAt: now,
          progressPercentage: Math.round((initialAmount / data.targetAmount) * 100),
          remainingAmount: data.targetAmount - initialAmount,
        };
        
        // Hitung target bulanan jika tipe berjangka
        if (data.type === 'berjangka' && data.targetDate) {
          newSavings.monthlyTarget = calculateMonthlyTarget(
            data.targetAmount,
            data.targetDate,
            initialAmount
          );
        }
        
        console.log('✅ Savings goal created:', newSavings);
        
        set((state) => ({
          savingsGoals: [...state.savingsGoals, newSavings],
          error: null,
        }));
        
        return newSavings;
      },
      
      updateSavings: (id: string, data: UpdateSavingsInput) => {
        set((state) => ({
          savingsGoals: state.savingsGoals.map((savings) => {
            if (savings.id !== id) return savings;
            
            const updated: SavingsGoal = {
              ...savings,
              ...data,
              updatedAt: new Date().toISOString(),
            };
            
            // Recalculate jika target berubah
            if (data.targetAmount) {
              updated.progressPercentage = Math.round(
                (updated.currentAmount / data.targetAmount) * 100
              );
              updated.remainingAmount = data.targetAmount - updated.currentAmount;
            }
            
            // Recalculate monthly target jika ada perubahan
            if (updated.type === 'berjangka' && updated.targetDate) {
              updated.monthlyTarget = calculateMonthlyTarget(
                updated.targetAmount,
                updated.targetDate,
                updated.currentAmount
              );
            }
            
            console.log('✏️ Savings updated:', updated);
            return updated;
          }),
          error: null,
        }));
      },
      
      deleteSavings: (id: string) => {
        set((state) => ({
          savingsGoals: state.savingsGoals.filter((s) => s.id !== id),
          error: null,
        }));
        console.log('🗑️ Savings deleted:', id);
      },
      
      getSavingsById: (id: string) => {
        return get().savingsGoals.find((s) => s.id === id);
      },
      
      addFunds: (id: string, amount: number) => {
        set((state) => ({
          savingsGoals: state.savingsGoals.map((savings) => {
            if (savings.id !== id) return savings;
            
            const newCurrentAmount = savings.currentAmount + amount;
            const updated: SavingsGoal = {
              ...savings,
              currentAmount: newCurrentAmount,
              progressPercentage: Math.round(
                (newCurrentAmount / savings.targetAmount) * 100
              ),
              remainingAmount: savings.targetAmount - newCurrentAmount,
              updatedAt: new Date().toISOString(),
            };
            
            // Recalculate monthly target
            if (updated.type === 'berjangka' && updated.targetDate) {
              updated.monthlyTarget = calculateMonthlyTarget(
                updated.targetAmount,
                updated.targetDate,
                newCurrentAmount
              );
            }
            
            console.log('💰 Funds added:', amount, 'to', savings.name);
            return updated;
          }),
          error: null,
        }));
      },
      
      withdrawFunds: (id: string, amount: number): boolean => {
        const savings = get().getSavingsById(id);
        if (!savings || savings.currentAmount < amount) {
          set({ error: 'Saldo tidak mencukupi' });
          return false;
        }
        
        set((state) => ({
          savingsGoals: state.savingsGoals.map((s) => {
            if (s.id !== id) return s;
            
            const newCurrentAmount = s.currentAmount - amount;
            return {
              ...s,
              currentAmount: newCurrentAmount,
              progressPercentage: Math.round(
                (newCurrentAmount / s.targetAmount) * 100
              ),
              remainingAmount: s.targetAmount - newCurrentAmount,
              updatedAt: new Date().toISOString(),
            };
          }),
          error: null,
        }));
        
        console.log('💸 Funds withdrawn:', amount, 'from', savings.name);
        return true;
      },
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'tabunganku-savings', // Key untuk localStorage
    }
  )
);
