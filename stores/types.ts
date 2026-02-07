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
