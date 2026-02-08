/**
 * Budget Icons Configuration
 * Menggunakan Lucide React icons untuk konsistensi UI
 */

import {
  ShoppingCart,
  Car,
  Home,
  Zap,
  Smartphone,
  Heart,
  Coffee,
  Film,
  GraduationCap,
  Shirt,
  Utensils,
  Bus,
  Wifi,
  Droplet,
  Plane,
  Gift,
  Dumbbell,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react';

export interface BudgetIconOption {
  name: string;
  icon: LucideIcon;
  value: string; // identifier untuk store di database
  category?: string; // untuk grouping
}

export const BUDGET_ICONS: BudgetIconOption[] = [
  // Kebutuhan Pokok
  { name: 'Makanan & Minuman', icon: Utensils, value: 'utensils', category: 'kebutuhan' },
  { name: 'Belanja Kebutuhan', icon: ShoppingCart, value: 'shopping-cart', category: 'kebutuhan' },
  { name: 'Transportasi', icon: Bus, value: 'bus', category: 'kebutuhan' },
  { name: 'Kendaraan', icon: Car, value: 'car', category: 'kebutuhan' },
  
  // Tagihan
  { name: 'Listrik', icon: Zap, value: 'zap', category: 'tagihan' },
  { name: 'Air', icon: Droplet, value: 'droplet', category: 'tagihan' },
  { name: 'Internet/WiFi', icon: Wifi, value: 'wifi', category: 'tagihan' },
  { name: 'Telepon', icon: Smartphone, value: 'smartphone', category: 'tagihan' },
  { name: 'Rumah/Sewa', icon: Home, value: 'home', category: 'tagihan' },
  
  // Keinginan & Hiburan
  { name: 'Hiburan', icon: Film, value: 'film', category: 'hiburan' },
  { name: 'Kopi/Café', icon: Coffee, value: 'coffee', category: 'hiburan' },
  { name: 'Shopping', icon: Shirt, value: 'shirt', category: 'hiburan' },
  { name: 'Hadiah', icon: Gift, value: 'gift', category: 'hiburan' },
  { name: 'Liburan', icon: Plane, value: 'plane', category: 'hiburan' },
  
  // Lainnya
  { name: 'Kesehatan', icon: Stethoscope, value: 'stethoscope', category: 'lainnya' },
  { name: 'Olahraga', icon: Dumbbell, value: 'dumbbell', category: 'lainnya' },
  { name: 'Pendidikan', icon: GraduationCap, value: 'graduation-cap', category: 'lainnya' },
  { name: 'Lainnya', icon: Heart, value: 'heart', category: 'lainnya' },
];

// Category labels untuk grouping
export const BUDGET_ICON_CATEGORIES: Record<string, string> = {
  kebutuhan: 'Kebutuhan Pokok',
  tagihan: 'Tagihan',
  hiburan: 'Keinginan & Hiburan',
  lainnya: 'Lainnya',
};

/**
 * Helper function untuk get icon component by value
 */
export const getIconByValue = (value: string): LucideIcon | undefined => {
  return BUDGET_ICONS.find(icon => icon.value === value)?.icon;
};

/**
 * Helper function untuk get icon option by value
 */
export const getIconOptionByValue = (value: string): BudgetIconOption | undefined => {
  return BUDGET_ICONS.find(icon => icon.value === value);
};
