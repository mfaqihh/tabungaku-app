/**
 * Zustand store untuk mengelola data transaksi
 * Menggunakan persist middleware untuk menyimpan ke localStorage
 * 
 * CRITICAL: Store ini terintegrasi dengan:
 * - budgetStore: untuk update spending pada kategori budget (expense)
 * - savingsStore: untuk update saldo tabungan (income to savings)
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Transaction,
  CreateTransactionInput,
  TransactionSummary,
  TransactionFilters,
} from './types';
import { useBudgetStore } from './budgetStore';
import { useSavingsStore } from './savingsStore';

interface TransactionStore {
  // State
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  filters: TransactionFilters;

  // Selectors
  getFilteredTransactions: () => Transaction[];
  getTransactionById: (id: string) => Transaction | undefined;
  getTransactionsByType: (type: 'income' | 'expense') => Transaction[];
  getSummary: () => TransactionSummary;
  getRecentTransactions: (limit?: number) => Transaction[];
  getTransactionsByPeriod: (month: number, year: number) => Transaction[];

  // Actions
  addTransaction: (data: CreateTransactionInput) => Transaction;
  updateTransaction: (id: string, data: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setFilters: (filters: Partial<TransactionFilters>) => void;
  clearFilters: () => void;
  clearError: () => void;
  reset: () => void;
}

/**
 * Generate unique ID untuk transaksi baru
 */
const generateId = (): string => {
  return `trans_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set, get) => ({
      transactions: [],
      isLoading: false,
      error: null,
      filters: {},

      // ==========================================
      // SELECTORS
      // ==========================================

      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        let filtered = [...transactions];

        // Filter by type
        if (filters.type) {
          filtered = filtered.filter((t) => t.type === filters.type);
        }

        // Filter by date range (start date)
        if (filters.startDate) {
          filtered = filtered.filter(
            (t) => new Date(t.transactionDate) >= new Date(filters.startDate!)
          );
        }

        // Filter by date range (end date)
        if (filters.endDate) {
          filtered = filtered.filter(
            (t) => new Date(t.transactionDate) <= new Date(filters.endDate!)
          );
        }

        // Filter by category (for expenses)
        if (filters.categoryId) {
          filtered = filtered.filter(
            (t) => t.budgetCategoryId === filters.categoryId
          );
        }

        // Search query (description or category name)
        if (filters.searchQuery) {
          const query = filters.searchQuery.toLowerCase();
          filtered = filtered.filter(
            (t) =>
              t.description.toLowerCase().includes(query) ||
              t.categoryName.toLowerCase().includes(query)
          );
        }

        // Sort by date (newest first)
        return filtered.sort(
          (a, b) =>
            new Date(b.transactionDate).getTime() -
            new Date(a.transactionDate).getTime()
        );
      },

      getTransactionById: (id) => {
        return get().transactions.find((t) => t.id === id);
      },

      getTransactionsByType: (type) => {
        return get()
          .transactions.filter((t) => t.type === type)
          .sort(
            (a, b) =>
              new Date(b.transactionDate).getTime() -
              new Date(a.transactionDate).getTime()
          );
      },

      getTransactionsByPeriod: (month, year) => {
        return get()
          .transactions.filter((t) => {
            const date = new Date(t.transactionDate);
            return date.getMonth() + 1 === month && date.getFullYear() === year;
          })
          .sort(
            (a, b) =>
              new Date(b.transactionDate).getTime() -
              new Date(a.transactionDate).getTime()
          );
      },

      getSummary: () => {
        const transactions = get().getFilteredTransactions();

        const income = transactions.filter((t) => t.type === 'income');
        const expense = transactions.filter((t) => t.type === 'expense');

        const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
        const totalExpense = expense.reduce((sum, t) => sum + t.amount, 0);

        return {
          totalIncome,
          totalExpense,
          netBalance: totalIncome - totalExpense,
          transactionCount: transactions.length,
          incomeCount: income.length,
          expenseCount: expense.length,
        };
      },

      getRecentTransactions: (limit = 10) => {
        return get().getFilteredTransactions().slice(0, limit);
      },

      // ==========================================
      // ACTIONS
      // ==========================================

      addTransaction: (data) => {
        const id = generateId();
        const now = new Date().toISOString();

        // Get current period for budgetPeriodId
        const currentPeriod = useBudgetStore.getState().getCurrentPeriod();

        const newTransaction: Transaction = {
          id,
          userId: 'user_mock', // Mock untuk sementara
          type: data.type,
          amount: data.amount,
          description: data.description,
          categoryName: data.categoryName,
          subcategoryName: data.subcategoryName,
          transactionDate: data.transactionDate,
          budgetPeriodId: currentPeriod?.id,
          budgetCategoryId: data.budgetCategoryId,
          savingsGoalId: data.savingsGoalId,
          createdAt: now,
          updatedAt: now,
        };

        // ==========================================
        // CRITICAL: Update related stores
        // ==========================================

        // EXPENSE: Update budget category spending
        if (data.type === 'expense' && data.budgetCategoryId) {
          const budgetStore = useBudgetStore.getState();
          const category = budgetStore.getCategoryById(data.budgetCategoryId);

          if (category) {
            // Use addSpending method to properly update budget
            budgetStore.addSpending(data.budgetCategoryId, data.amount);

            // Set display helpers from category
            newTransaction.displayIcon = category.iconValue;
            newTransaction.displayColor = category.color;
          }
        }

        // INCOME to SAVINGS: Update savings goal
        if (data.type === 'income' && data.savingsGoalId) {
          const savingsStore = useSavingsStore.getState();
          const savings = savingsStore.getSavingsById(data.savingsGoalId);

          if (savings) {
            // Use addFunds method to properly update savings
            savingsStore.addFunds(data.savingsGoalId, data.amount);

            // Set display helpers from savings
            newTransaction.displayIcon = savings.icon;
            newTransaction.displayColor = savings.color;
          }
        }

        console.log('✅ Transaction created:', newTransaction);

        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
          error: null,
        }));

        return newTransaction;
      },

      updateTransaction: (id, data) => {
        // TODO: Phase 2 - Implement with rollback logic for budget/savings
        // When amount changes, need to:
        // 1. Rollback old amount from budget/savings
        // 2. Apply new amount
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id
              ? { ...t, ...data, updatedAt: new Date().toISOString() }
              : t
          ),
        }));
      },

      deleteTransaction: (id) => {
        // TODO: Phase 2 - Implement with rollback logic
        // Need to subtract amount from budget/savings before deleting
        const transaction = get().getTransactionById(id);
        
        if (transaction) {
          // Rollback expense from budget
          if (transaction.type === 'expense' && transaction.budgetCategoryId) {
            const budgetStore = useBudgetStore.getState();
            // Use addSpending with negative amount to rollback
            budgetStore.addSpending(transaction.budgetCategoryId, -transaction.amount);
          }

          // Rollback income from savings
          if (transaction.type === 'income' && transaction.savingsGoalId) {
            const savingsStore = useSavingsStore.getState();
            savingsStore.withdrawFunds(transaction.savingsGoalId, transaction.amount);
          }
        }

        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));

        console.log('🗑️ Transaction deleted:', id);
      },

      setFilters: (filters) => {
        set((state) => ({
          filters: { ...state.filters, ...filters },
        }));
      },

      clearFilters: () => {
        set({ filters: {} });
      },

      clearError: () => set({ error: null }),

      reset: () =>
        set({
          transactions: [],
          isLoading: false,
          error: null,
          filters: {},
        }),
    }),
    {
      name: 'tabunganku-transactions',
    }
  )
);
