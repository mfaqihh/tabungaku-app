/**
 * Zustand store untuk mengelola data budget
 * Menggunakan persist middleware untuk menyimpan ke localStorage
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  BudgetPeriod,
  BudgetCategory,
  BudgetStatus,
  CreateBudgetPeriodInput,
  CreateBudgetCategoryInput,
  UpdateBudgetCategoryInput,
} from './types';

interface BudgetStore {
  // State
  budgetPeriods: BudgetPeriod[];
  budgetCategories: BudgetCategory[];
  isLoading: boolean;
  error: string | null;

  // Selectors
  getCurrentPeriod: () => BudgetPeriod | null;
  getPeriodById: (id: string) => BudgetPeriod | undefined;
  getCategoryById: (id: string) => BudgetCategory | undefined;
  getCategoriesByPeriod: (periodId: string) => BudgetCategory[];
  getTotalAllocated: (periodId?: string) => number;
  getTotalSpent: (periodId?: string) => number;
  getRemainingToAllocate: (periodId?: string) => number;

  // Actions
  createBudgetPeriod: (data: CreateBudgetPeriodInput) => BudgetPeriod;
  addCategory: (data: CreateBudgetCategoryInput) => BudgetCategory;
  updateCategory: (id: string, data: UpdateBudgetCategoryInput) => void;
  deleteCategory: (id: string) => void;
  addSpending: (categoryId: string, amount: number) => void;
  clearError: () => void;
  reset: () => void;
}

/**
 * Generate unique ID
 */
const generateId = (prefix: string): string => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Calculate budget status based on percentage
 */
const calculateStatus = (spent: number, allocated: number): BudgetStatus => {
  if (allocated === 0) return 'safe';
  const percentage = (spent / allocated) * 100;
  
  if (percentage > 100) return 'exceeded';
  if (percentage >= 90) return 'danger';
  if (percentage >= 75) return 'warning';
  return 'safe';
};

/**
 * Calculate progress percentage
 */
const calculateProgress = (spent: number, allocated: number): number => {
  if (allocated === 0) return 0;
  return Math.min(100, Math.round((spent / allocated) * 100));
};

export const useBudgetStore = create<BudgetStore>()(
  persist(
    (set, get) => ({
      budgetPeriods: [],
      budgetCategories: [],
      isLoading: false,
      error: null,

      // Selectors
      getCurrentPeriod: () => {
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();
        
        return get().budgetPeriods.find(
          (p) => p.month === currentMonth && p.year === currentYear
        ) || null;
      },

      getPeriodById: (id) => {
        return get().budgetPeriods.find((p) => p.id === id);
      },

      getCategoryById: (id) => {
        return get().budgetCategories.find((c) => c.id === id);
      },

      getCategoriesByPeriod: (periodId) => {
        return get().budgetCategories.filter((c) => c.budgetPeriodId === periodId);
      },

      getTotalAllocated: (periodId) => {
        const pid = periodId || get().getCurrentPeriod()?.id;
        if (!pid) return 0;
        
        return get()
          .budgetCategories
          .filter((c) => c.budgetPeriodId === pid)
          .reduce((sum, c) => sum + c.allocatedAmount, 0);
      },

      getTotalSpent: (periodId) => {
        const pid = periodId || get().getCurrentPeriod()?.id;
        if (!pid) return 0;
        
        return get()
          .budgetCategories
          .filter((c) => c.budgetPeriodId === pid)
          .reduce((sum, c) => sum + c.spentAmount, 0);
      },

      getRemainingToAllocate: (periodId) => {
        const pid = periodId || get().getCurrentPeriod()?.id;
        if (!pid) return 0;
        
        const period = get().getPeriodById(pid);
        if (!period) return 0;
        
        const allocated = get().getTotalAllocated(pid);
        return Math.max(0, period.totalBudget - allocated);
      },

      // Actions
      createBudgetPeriod: (data) => {
        const id = generateId('budget_period');
        const now = new Date().toISOString();
        
        // Check if period already exists
        const existing = get().budgetPeriods.find(
          (p) => p.month === data.month && p.year === data.year
        );
        
        if (existing) {
          // Update existing period
          set((state) => ({
            budgetPeriods: state.budgetPeriods.map((p) =>
              p.id === existing.id
                ? {
                    ...p,
                    totalBudget: data.totalBudget,
                    updatedAt: now,
                  }
                : p
            ),
          }));
          return existing;
        }
        
        const newPeriod: BudgetPeriod = {
          id,
          userId: 'user_mock',
          month: data.month,
          year: data.year,
          totalBudget: data.totalBudget,
          totalAllocated: 0,
          totalSpent: 0,
          createdAt: now,
          updatedAt: now,
          remainingToAllocate: data.totalBudget,
          remainingBudget: data.totalBudget,
          progressPercentage: 0,
          status: 'safe',
        };

        set((state) => ({
          budgetPeriods: [...state.budgetPeriods, newPeriod],
        }));

        console.log('✅ Budget period created:', newPeriod);
        return newPeriod;
      },

      addCategory: (data) => {
        const id = generateId('budget_cat');
        const now = new Date().toISOString();
        
        const newCategory: BudgetCategory = {
          id,
          budgetPeriodId: data.budgetPeriodId,
          name: data.name,
          iconValue: data.iconValue,
          color: data.color,
          allocatedAmount: data.allocatedAmount,
          spentAmount: 0,
          categoryType: data.categoryType,
          createdAt: now,
          updatedAt: now,
          remainingAmount: data.allocatedAmount,
          progressPercentage: 0,
          status: 'safe',
        };

        set((state) => {
          const updatedCategories = [...state.budgetCategories, newCategory];
          const totalAllocated = updatedCategories
            .filter((c) => c.budgetPeriodId === data.budgetPeriodId)
            .reduce((sum, c) => sum + c.allocatedAmount, 0);
          
          // Update period's totalAllocated
          const updatedPeriods = state.budgetPeriods.map((p) =>
            p.id === data.budgetPeriodId
              ? {
                  ...p,
                  totalAllocated,
                  remainingToAllocate: p.totalBudget - totalAllocated,
                  updatedAt: now,
                }
              : p
          );

          return {
            budgetCategories: updatedCategories,
            budgetPeriods: updatedPeriods,
          };
        });

        console.log('✅ Budget category created:', newCategory);
        return newCategory;
      },

      updateCategory: (id, data) => {
        const now = new Date().toISOString();
        
        set((state) => {
          const category = state.budgetCategories.find((c) => c.id === id);
          if (!category) return state;

          const updatedCategories = state.budgetCategories.map((c) => {
            if (c.id !== id) return c;
            
            const newAllocated = data.allocatedAmount ?? c.allocatedAmount;
            const remaining = newAllocated - c.spentAmount;
            
            return {
              ...c,
              ...data,
              remainingAmount: remaining,
              progressPercentage: calculateProgress(c.spentAmount, newAllocated),
              status: calculateStatus(c.spentAmount, newAllocated),
              updatedAt: now,
            };
          });

          // Update period's totalAllocated if allocatedAmount changed
          if (data.allocatedAmount !== undefined) {
            const totalAllocated = updatedCategories
              .filter((c) => c.budgetPeriodId === category.budgetPeriodId)
              .reduce((sum, c) => sum + c.allocatedAmount, 0);
            
            const updatedPeriods = state.budgetPeriods.map((p) =>
              p.id === category.budgetPeriodId
                ? {
                    ...p,
                    totalAllocated,
                    remainingToAllocate: p.totalBudget - totalAllocated,
                    updatedAt: now,
                  }
                : p
            );

            return {
              budgetCategories: updatedCategories,
              budgetPeriods: updatedPeriods,
            };
          }

          return { budgetCategories: updatedCategories };
        });
      },

      deleteCategory: (id) => {
        const now = new Date().toISOString();
        
        set((state) => {
          const category = state.budgetCategories.find((c) => c.id === id);
          if (!category) return state;

          const updatedCategories = state.budgetCategories.filter((c) => c.id !== id);
          const totalAllocated = updatedCategories
            .filter((c) => c.budgetPeriodId === category.budgetPeriodId)
            .reduce((sum, c) => sum + c.allocatedAmount, 0);
          
          const updatedPeriods = state.budgetPeriods.map((p) =>
            p.id === category.budgetPeriodId
              ? {
                  ...p,
                  totalAllocated,
                  remainingToAllocate: p.totalBudget - totalAllocated,
                  updatedAt: now,
                }
              : p
          );

          return {
            budgetCategories: updatedCategories,
            budgetPeriods: updatedPeriods,
          };
        });
      },

      addSpending: (categoryId, amount) => {
        const now = new Date().toISOString();
        
        set((state) => {
          const category = state.budgetCategories.find((c) => c.id === categoryId);
          if (!category) return state;

          const newSpent = category.spentAmount + amount;
          const remaining = category.allocatedAmount - newSpent;
          
          const updatedCategories = state.budgetCategories.map((c) =>
            c.id === categoryId
              ? {
                  ...c,
                  spentAmount: newSpent,
                  remainingAmount: remaining,
                  progressPercentage: calculateProgress(newSpent, c.allocatedAmount),
                  status: calculateStatus(newSpent, c.allocatedAmount),
                  updatedAt: now,
                }
              : c
          );

          // Update period's totalSpent
          const totalSpent = updatedCategories
            .filter((c) => c.budgetPeriodId === category.budgetPeriodId)
            .reduce((sum, c) => sum + c.spentAmount, 0);
          
          const updatedPeriods = state.budgetPeriods.map((p) => {
            if (p.id !== category.budgetPeriodId) return p;
            
            const remainingBudget = p.totalAllocated - totalSpent;
            return {
              ...p,
              totalSpent,
              remainingBudget,
              progressPercentage: calculateProgress(totalSpent, p.totalAllocated),
              status: calculateStatus(totalSpent, p.totalAllocated),
              updatedAt: now,
            };
          });

          return {
            budgetCategories: updatedCategories,
            budgetPeriods: updatedPeriods,
          };
        });
      },

      clearError: () => set({ error: null }),
      
      reset: () =>
        set({
          budgetPeriods: [],
          budgetCategories: [],
          isLoading: false,
          error: null,
        }),
    }),
    {
      name: 'tabunganku-budget',
    }
  )
);
