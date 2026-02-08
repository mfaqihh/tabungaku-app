/**
 * Constants untuk kategori transaksi
 * Menggunakan Lucide React icons
 */

import {
  Wallet,
  Briefcase,
  TrendingUp,
  Gift,
  Coins,
  HandCoins,
  type LucideIcon,
} from 'lucide-react';

/**
 * Interface untuk opsi kategori income
 */
export interface IncomeCategoryOption {
  label: string;
  icon: LucideIcon;
  value: string;
  description?: string;
}

/**
 * Kategori default untuk pemasukan (income)
 * Digunakan ketika user tidak memilih untuk menyimpan ke tabungan
 */
export const INCOME_CATEGORIES: IncomeCategoryOption[] = [
  {
    label: 'Gaji',
    icon: Wallet,
    value: 'gaji',
    description: 'Gaji bulanan dari pekerjaan',
  },
  {
    label: 'Freelance',
    icon: Briefcase,
    value: 'freelance',
    description: 'Pendapatan dari proyek lepas',
  },
  {
    label: 'Investasi',
    icon: TrendingUp,
    value: 'investasi',
    description: 'Hasil investasi atau dividen',
  },
  {
    label: 'Hadiah',
    icon: Gift,
    value: 'hadiah',
    description: 'Hadiah atau bonus',
  },
  {
    label: 'Bonus',
    icon: Coins,
    value: 'bonus',
    description: 'Bonus pekerjaan',
  },
  {
    label: 'Lainnya',
    icon: HandCoins,
    value: 'lainnya',
    description: 'Sumber pemasukan lainnya',
  },
];

/**
 * Get income category by value
 */
export function getIncomeCategoryByValue(
  value: string
): IncomeCategoryOption | undefined {
  return INCOME_CATEGORIES.find((cat) => cat.value === value);
}

/**
 * Default colors untuk transaksi
 */
export const TRANSACTION_COLORS = {
  income: '#38A169', // Green
  expense: '#E53E3E', // Red
  savings: '#3182CE', // Blue
  neutral: '#718096', // Gray
};

/**
 * Quick amount presets untuk form transaksi
 */
export const QUICK_AMOUNTS = [
  { label: '10rb', value: 10000 },
  { label: '25rb', value: 25000 },
  { label: '50rb', value: 50000 },
  { label: '100rb', value: 100000 },
  { label: '250rb', value: 250000 },
  { label: '500rb', value: 500000 },
];

/**
 * Quick description suggestions untuk expense
 */
export const EXPENSE_DESCRIPTIONS = [
  'Makan siang',
  'Bensin',
  'Belanja bulanan',
  'Tagihan listrik',
  'Tagihan air',
  'Internet',
  'Transportasi online',
  'Langganan streaming',
];

/**
 * Quick description suggestions untuk income
 */
export const INCOME_DESCRIPTIONS = [
  'Gaji bulanan',
  'Pendapatan freelance',
  'Hasil investasi',
  'Bonus tahunan',
  'THR',
  'Dividen',
  'Cashback',
];
