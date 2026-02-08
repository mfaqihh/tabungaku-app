/**
 * Zod validation schemas untuk form transaksi
 * Menggunakan pesan error dalam Bahasa Indonesia
 */

import { z } from 'zod';

/**
 * Schema validasi untuk form transaksi
 */
export const transactionSchema = z.object({
  type: z.enum(['income', 'expense'], {
    error: 'Pilih jenis transaksi',
  }),
  
  amount: z
    .number({
      error: 'Jumlah harus diisi',
    })
    .positive('Jumlah harus lebih dari 0')
    .max(1000000000, 'Jumlah terlalu besar (maks 1 miliar)'),
  
  description: z
    .string({
      error: 'Deskripsi harus diisi',
    })
    .min(3, 'Deskripsi minimal 3 karakter')
    .max(200, 'Deskripsi maksimal 200 karakter'),
  
  categoryName: z.string().optional(),
  
  subcategoryName: z.string().optional(),
  
  transactionDate: z.string({
    error: 'Tanggal transaksi harus diisi',
  }).refine(
    (date) => {
      const d = new Date(date);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      return d <= today;
    },
    { message: 'Tanggal tidak boleh di masa depan' }
  ),
  
  // Optional fields for relations
  budgetCategoryId: z.string().optional(),
  savingsGoalId: z.string().optional(),
  
}).refine(
  (data) => {
    // EXPENSE must have budgetCategoryId
    if (data.type === 'expense' && !data.budgetCategoryId) {
      return false;
    }
    return true;
  },
  {
    message: 'Pengeluaran harus memilih kategori budget',
    path: ['budgetCategoryId'],
  }
);

/**
 * Type inference dari schema
 */
export type TransactionFormData = z.infer<typeof transactionSchema>;

/**
 * Default values untuk form transaksi
 */
export const defaultTransactionValues: Partial<TransactionFormData> = {
  type: 'expense',
  amount: 0,
  description: '',
  categoryName: '',
  subcategoryName: '',
  transactionDate: new Date().toISOString().split('T')[0], // Today
  budgetCategoryId: undefined,
  savingsGoalId: undefined,
};
