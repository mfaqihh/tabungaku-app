/**
 * Zod validation schema untuk form tabungan
 * Mendukung validasi client-side dengan pesan error Bahasa Indonesia
 */

import { z } from 'zod';

// Schema untuk form tambah tabungan
export const savingsSchema = z.object({
  name: z
    .string()
    .min(3, 'Nama tabungan minimal 3 karakter')
    .max(50, 'Nama tabungan maksimal 50 karakter'),
  
  type: z.enum(['berjangka', 'reguler'], {
    error: 'Pilih jenis tabungan',
  }),
  
  targetAmount: z
    .number({
      error: 'Target jumlah wajib diisi dan harus berupa angka',
    })
    .min(10000, 'Target minimal Rp 10.000'),
  
  targetDate: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true; // Optional
        const date = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date > today;
      },
      { message: 'Tanggal target harus di masa depan' }
    ),
  
  initialAmount: z
    .number()
    .min(0, 'Saldo awal tidak boleh negatif')
    .default(0)
    .optional(),
  
  icon: z.string().min(1, 'Pilih icon untuk tabungan'),
  
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Pilih warna yang valid'),
}).refine(
  (data) => {
    // Jika tipe berjangka, targetDate wajib diisi
    if (data.type === 'berjangka') {
      return !!data.targetDate;
    }
    return true;
  },
  {
    message: 'Tanggal target wajib diisi untuk tabungan berjangka',
    path: ['targetDate'],
  }
).refine(
  (data) => {
    // Saldo awal tidak boleh lebih besar dari target
    if (data.initialAmount && data.initialAmount > data.targetAmount) {
      return false;
    }
    return true;
  },
  {
    message: 'Saldo awal tidak boleh melebihi target',
    path: ['initialAmount'],
  }
);

// Type inference dari schema
export type SavingsFormData = z.infer<typeof savingsSchema>;

// Default values untuk form
export const defaultSavingsFormValues: SavingsFormData = {
  name: '',
  type: 'reguler',
  targetAmount: 0,
  targetDate: undefined,
  initialAmount: 0,
  icon: 'piggy-bank',
  color: '#319795',
};
