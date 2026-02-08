/**
 * Zod validation schema untuk form budget
 * Mendukung validasi client-side dengan pesan error Bahasa Indonesia
 */

import { z } from 'zod';

// Schema untuk Create Budget Period (setup budget bulanan)
export const budgetPeriodSchema = z.object({
  month: z
    .number({
      error: 'Bulan harus dipilih',
    })
    .min(1, 'Bulan tidak valid')
    .max(12, 'Bulan tidak valid'),
  
  year: z
    .number({
      error: 'Tahun harus dipilih',
    })
    .min(2020, 'Tahun minimal 2020')
    .max(2100, 'Tahun maksimal 2100'),
  
  totalBudget: z
    .number({
      error: 'Total budget harus diisi',
    })
    .min(10000, 'Total budget minimal Rp 10.000'),
});

// Schema untuk Create/Edit Budget Category
export const budgetCategorySchema = z.object({
  name: z
    .string({
      error: 'Nama kategori harus diisi',
    })
    .min(2, 'Nama minimal 2 karakter')
    .max(50, 'Nama maksimal 50 karakter'),
  
  iconValue: z
    .string({
      error: 'Pilih icon',
    })
    .min(1, 'Pilih icon untuk kategori'),
  
  color: z
    .string({
      error: 'Pilih warna',
    })
    .regex(/^#[0-9A-Fa-f]{6}$/i, 'Format warna tidak valid'),
  
  allocatedAmount: z
    .number({
      error: 'Alokasi budget harus diisi',
    })
    .min(1000, 'Alokasi minimal Rp 1.000'),
  
  categoryType: z.enum(['bulanan', 'berjangka'], {
    error: 'Pilih jenis kategori',
  }),
  
  budgetPeriodId: z.string(),
});

// Type exports
export type BudgetPeriodFormData = z.infer<typeof budgetPeriodSchema>;
export type BudgetCategoryFormData = z.infer<typeof budgetCategorySchema>;

// Default values untuk form period
export const defaultBudgetPeriodValues: BudgetPeriodFormData = {
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  totalBudget: 0,
};

// Default values untuk form category
export const defaultBudgetCategoryValues: Partial<BudgetCategoryFormData> = {
  name: '',
  iconValue: 'utensils',
  color: '#319795',
  allocatedAmount: 0,
  categoryType: 'bulanan',
};
