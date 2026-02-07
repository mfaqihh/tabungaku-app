/**
 * Utility functions untuk format dan parse currency (Rupiah)
 */

/**
 * Format angka ke format Rupiah dengan separator ribuan
 * @param amount - angka yang akan diformat
 * @returns string format "Rp 1.000.000"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format angka ke string dengan separator ribuan (tanpa "Rp")
 * @param amount - angka yang akan diformat
 * @returns string format "1.000.000"
 */
export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('id-ID').format(amount);
}

/**
 * Parse string currency ke angka
 * Menghapus semua karakter non-digit
 * @param value - string yang akan di-parse (contoh: "Rp 1.000.000")
 * @returns number (contoh: 1000000)
 */
export function parseCurrency(value: string): number {
  // Hapus semua karakter kecuali digit
  const cleanValue = value.replace(/[^\d]/g, '');
  const parsed = parseInt(cleanValue, 10);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Format input currency saat user mengetik
 * @param value - raw string input
 * @returns string terformat dengan separator ribuan
 */
export function formatCurrencyInput(value: string): string {
  const number = parseCurrency(value);
  if (number === 0) return '';
  return formatNumber(number);
}

/**
 * Format currency singkat untuk angka besar
 * @param amount - angka yang akan diformat
 * @returns string format singkat (contoh: "1,5 Jt" atau "1 M")
 */
export function formatCurrencyShort(amount: number): string {
  if (amount >= 1000000000) {
    return `${(amount / 1000000000).toFixed(1).replace('.0', '')} M`;
  }
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1).replace('.0', '')} Jt`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(0)} Rb`;
  }
  return formatNumber(amount);
}
