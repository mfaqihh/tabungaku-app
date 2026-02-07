/**
 * Utility functions untuk format tanggal dalam Bahasa Indonesia
 */

/**
 * Nama bulan dalam Bahasa Indonesia (singkat)
 */
const MONTH_NAMES_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
  'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
];

/**
 * Nama bulan dalam Bahasa Indonesia (lengkap)
 */
const MONTH_NAMES_FULL = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

/**
 * Format tanggal ke format Indonesia singkat
 * @param dateString - ISO date string atau Date object
 * @returns string format "31 Des 2024"
 */
export function formatDateShort(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  
  if (isNaN(date.getTime())) {
    return '-';
  }
  
  const day = date.getDate();
  const month = MONTH_NAMES_SHORT[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
}

/**
 * Format tanggal ke format Indonesia lengkap
 * @param dateString - ISO date string atau Date object
 * @returns string format "31 Desember 2024"
 */
export function formatDateFull(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  
  if (isNaN(date.getTime())) {
    return '-';
  }
  
  const day = date.getDate();
  const month = MONTH_NAMES_FULL[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
}

/**
 * Format tanggal ke ISO string (YYYY-MM-DD) untuk input date HTML
 * @param date - Date object
 * @returns string format "2024-12-31"
 */
export function formatDateISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Dapatkan tanggal minimal untuk date picker (hari ini)
 * @returns string format "2024-12-31"
 */
export function getMinDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return formatDateISO(tomorrow);
}

/**
 * Dapatkan default target date (1 bulan dari sekarang)
 * @returns string format "2024-12-31"
 */
export function getDefaultTargetDate(): string {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  return formatDateISO(date);
}

/**
 * Hitung selisih bulan antara dua tanggal
 * @param startDate - tanggal awal
 * @param endDate - tanggal akhir
 * @returns jumlah bulan
 */
export function getMonthsDifference(startDate: Date, endDate: Date): number {
  return Math.max(1,
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    endDate.getMonth() - startDate.getMonth()
  );
}

/**
 * Format relative time (berapa lama lagi)
 * @param targetDate - tanggal target
 * @returns string format "3 bulan lagi" atau "45 hari lagi"
 */
export function formatTimeRemaining(targetDate: string | Date): string {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const now = new Date();
  
  const diffTime = target.getTime() - now.getTime();
  if (diffTime <= 0) return 'Sudah lewat';
  
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays > 30) {
    const months = Math.floor(diffDays / 30);
    return `${months} bulan lagi`;
  }
  
  return `${diffDays} hari lagi`;
}
