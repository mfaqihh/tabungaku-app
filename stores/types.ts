/**
 * Type definitions untuk fitur Tabungan
 * Digunakan di seluruh aplikasi untuk type safety
 */

// Tipe tabungan: berjangka (ada deadline) atau reguler (tanpa deadline)
export type SavingsType = 'berjangka' | 'reguler';

/**
 * Interface untuk satu goal tabungan
 * Menyimpan semua data terkait target tabungan user
 */
export interface SavingsGoal {
  id: string;
  userId: string;
  name: string;
  type: SavingsType;
  targetAmount: number;
  targetDate?: string; // ISO date string, optional untuk tipe reguler
  initialAmount: number;
  currentAmount: number;
  icon: string; // emoji
  color: string; // hex color
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  
  // Calculated fields
  monthlyTarget?: number; // Target nabung per bulan (hanya untuk berjangka)
  progressPercentage?: number;
  remainingAmount?: number;
}

/**
 * Input untuk membuat tabungan baru
 * Subset dari SavingsGoal tanpa field yang auto-generated
 */
export interface CreateSavingsInput {
  name: string;
  type: SavingsType;
  targetAmount: number;
  targetDate?: string;
  initialAmount?: number;
  icon: string;
  color: string;
}

/**
 * Input untuk update tabungan
 */
export interface UpdateSavingsInput {
  name?: string;
  targetAmount?: number;
  targetDate?: string;
  icon?: string;
  color?: string;
}

/**
 * Input untuk menambah/kurangi saldo tabungan
 */
export interface FundTransactionInput {
  savingsId: string;
  amount: number;
  type: 'deposit' | 'withdraw';
  note?: string;
}

// ============================================
// BUDGET TYPES
// ============================================

/**
 * Status budget berdasarkan persentase penggunaan
 * - safe: < 75% terpakai
 * - warning: 75-90% terpakai
 * - danger: 90-100% terpakai
 * - exceeded: > 100% terpakai
 */
export type BudgetStatus = 'safe' | 'warning' | 'danger' | 'exceeded';

/**
 * Tipe kategori budget
 * - bulanan: recurring setiap bulan
 * - berjangka: one-time atau tidak rutin
 */
export type BudgetCategoryType = 'bulanan' | 'berjangka';

/**
 * Interface untuk periode budget (per bulan)
 * Menyimpan data budget untuk satu bulan tertentu
 */
export interface BudgetPeriod {
  id: string;
  userId: string;
  month: number; // 1-12
  year: number;
  totalBudget: number; // Total anggaran yang ditetapkan
  totalAllocated: number; // Total yang sudah dialokasikan ke kategori
  totalSpent: number;
  createdAt: string;
  updatedAt: string;
  // Calculated fields
  remainingToAllocate?: number; // Sisa yang bisa dialokasikan
  remainingBudget?: number; // Sisa budget (allocated - spent)
  progressPercentage?: number;
  status?: BudgetStatus;
}

/**
 * Interface untuk kategori budget
 * Setiap kategori punya alokasi dan tracking pengeluaran sendiri
 */
export interface BudgetCategory {
  id: string;
  budgetPeriodId: string;
  name: string;
  iconValue: string; // Lucide icon identifier (e.g., 'utensils')
  color: string; // hex color
  allocatedAmount: number;
  spentAmount: number;
  categoryType: BudgetCategoryType;
  createdAt: string;
  updatedAt: string;
  // Calculated fields
  remainingAmount?: number;
  progressPercentage?: number;
  status?: BudgetStatus;
}

/**
 * Input untuk membuat budget period baru
 */
export interface CreateBudgetPeriodInput {
  month: number;
  year: number;
  totalBudget: number;
}

/**
 * Input untuk membuat kategori budget baru
 */
export interface CreateBudgetCategoryInput {
  budgetPeriodId: string;
  name: string;
  iconValue: string;
  color: string;
  allocatedAmount: number;
  categoryType: BudgetCategoryType;
}

/**
 * Input untuk update kategori budget
 */
export interface UpdateBudgetCategoryInput {
  name?: string;
  iconValue?: string;
  color?: string;
  allocatedAmount?: number;
  categoryType?: BudgetCategoryType;
}
