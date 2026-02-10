/**
 * Centralized toast messages for consistent UX
 * All messages in Bahasa Indonesia
 */

export const TOAST_MESSAGES = {
  // Savings
  savings: {
    created: {
      title: 'Tabungan Berhasil Dibuat! 🎯',
      description: (name: string) => `Target tabungan "${name}" siap digunakan`,
    },
    updated: {
      title: 'Tabungan Diperbarui ✏️',
      description: 'Perubahan berhasil disimpan',
    },
    deleted: {
      title: 'Tabungan Dihapus',
      description: (name: string) => `Tabungan "${name}" telah dihapus`,
    },
    fundsAdded: {
      title: 'Berhasil Menabung! 💰',
      description: (amount: string, name: string) =>
        `${amount} ditambahkan ke "${name}"`,
    },
    fundsWithdrawn: {
      title: 'Penarikan Berhasil',
      description: (amount: string, name: string) =>
        `${amount} ditarik dari "${name}"`,
    },
    goalReached: {
      title: 'Selamat! Target Tercapai! 🎉',
      description: (name: string) => `Tabungan "${name}" sudah mencapai target!`,
    },
  },

  // Budget
  budget: {
    periodCreated: {
      title: 'Budget Berhasil Dibuat! 📋',
      description: (month: string) => `Budget ${month} siap digunakan`,
    },
    categoryCreated: {
      title: 'Kategori Ditambahkan ✅',
      description: (name: string, amount: string) =>
        `"${name}" dengan alokasi ${amount}`,
    },
    categoryUpdated: {
      title: 'Kategori Diperbarui',
      description: 'Perubahan berhasil disimpan',
    },
    categoryDeleted: {
      title: 'Kategori Dihapus',
      description: (name: string) => `Kategori "${name}" telah dihapus`,
    },
    overBudget: {
      title: 'Peringatan Budget! ⚠️',
      description: (category: string) =>
        `Pengeluaran kategori "${category}" sudah terlampaui`,
    },
    allocationExceeded: {
      title: 'Alokasi Melebihi Budget',
      description: (remaining: string) =>
        `Sisa yang bisa dialokasikan: ${remaining}`,
    },
  },

  // Transactions
  transactions: {
    incomeCreated: {
      title: 'Pemasukan Tercatat! ✅',
      description: (amount: string) => `Pemasukan ${amount} berhasil dicatat`,
    },
    expenseCreated: {
      title: 'Pengeluaran Tercatat! 📝',
      description: (amount: string) => `Pengeluaran ${amount} berhasil dicatat`,
    },
    updated: {
      title: 'Transaksi Diperbarui',
      description: 'Perubahan berhasil disimpan',
    },
    deleted: {
      title: 'Transaksi Dihapus',
      description: 'Transaksi telah dihapus dari catatan',
    },
  },

  // Errors
  errors: {
    generic: {
      title: 'Terjadi Kesalahan',
      description: 'Silakan coba lagi beberapa saat',
    },
    validation: {
      title: 'Data Tidak Valid',
      description: 'Periksa kembali data yang Anda masukkan',
    },
    saveFailed: {
      title: 'Gagal Menyimpan',
      description: 'Terjadi kesalahan saat menyimpan data',
    },
    deleteFailed: {
      title: 'Gagal Menghapus',
      description: 'Terjadi kesalahan saat menghapus data',
    },
  },
} as const;
