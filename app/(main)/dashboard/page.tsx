"use client";

import { Box, SimpleGrid } from "@chakra-ui/react";
import { Header } from "@/components/layout";
import {
  StatCard,
  RecentTransactions,
  BudgetOverview,
  SavingsOverview,
} from "@/components/dashboard";
import {
  LuWallet,
  LuTrendingUp,
  LuTrendingDown,
  LuPiggyBank,
} from "react-icons/lu";

export default function DashboardPage() {
  return (
    <Box minH="100vh">
      <Header title="Dashboard" />
      
      <Box p={{ base: 4, md: 6 }} maxW="1600px" mx="auto">
        {/* Stats Grid */}
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4} mb={6}>
          <StatCard
            title="Total Saldo"
            value="Rp 26.450.000"
            icon={<LuWallet size={20} />}
            change="12% dari bulan lalu"
            changeType="positive"
            colorScheme="teal"
          />
          <StatCard
            title="Pemasukan"
            value="Rp 10.500.000"
            icon={<LuTrendingUp size={20} />}
            change="8% dari bulan lalu"
            changeType="positive"
            colorScheme="green"
          />
          <StatCard
            title="Pengeluaran"
            value="Rp 4.530.000"
            icon={<LuTrendingDown size={20} />}
            change="5% dari bulan lalu"
            changeType="negative"
            colorScheme="red"
          />
          <StatCard
            title="Total Tabungan"
            value="Rp 26.450.000"
            icon={<LuPiggyBank size={20} />}
            change="3 target aktif"
            changeType="neutral"
            colorScheme="purple"
          />
        </SimpleGrid>

        {/* Full Width Savings */}
        <Box mb={6}>
          <SavingsOverview />
        </Box>

        {/* Transactions and Budget Grid */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
          <RecentTransactions />
          <BudgetOverview />
        </SimpleGrid>
      </Box>
    </Box>
  );
}
