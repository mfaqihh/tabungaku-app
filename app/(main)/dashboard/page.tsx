"use client";

import { Box, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
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
    <Box>
      <Header title="Dashboard" />
      
      <Box p={{ base: 4, md: 6 }}>
        {/* Stats Grid */}
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4} mb={6}>
          <StatCard
            title="Total Saldo"
            value="Rp 26.450.000"
            icon={<LuWallet />}
            change="+12% dari bulan lalu"
            changeType="positive"
            colorScheme="teal"
          />
          <StatCard
            title="Pemasukan Bulan Ini"
            value="Rp 10.500.000"
            icon={<LuTrendingUp />}
            change="+8% dari bulan lalu"
            changeType="positive"
            colorScheme="green"
          />
          <StatCard
            title="Pengeluaran Bulan Ini"
            value="Rp 4.530.000"
            icon={<LuTrendingDown />}
            change="-5% dari bulan lalu"
            changeType="positive"
            colorScheme="red"
          />
          <StatCard
            title="Total Tabungan"
            value="Rp 26.450.000"
            icon={<LuPiggyBank />}
            change="3 target aktif"
            changeType="neutral"
            colorScheme="purple"
          />
        </SimpleGrid>

        {/* Main Content Grid */}
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr", xl: "2fr 1fr" }}
          gap={6}
        >
          <GridItem>
            <RecentTransactions />
          </GridItem>
          <GridItem>
            <SavingsOverview />
          </GridItem>
          <GridItem colSpan={{ base: 1, lg: 2, xl: 1 }}>
            <BudgetOverview />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}
