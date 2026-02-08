/**
 * BudgetOverview - Summary cards untuk budget overview
 * Menampilkan total budget, allocated, spent, dan remaining
 */

'use client';

import { Box, SimpleGrid, Text, Flex, VStack, Progress } from '@chakra-ui/react';
import { Wallet, PieChart, TrendingDown, Banknote } from 'lucide-react';
import { useBudgetStore } from '@/stores/budgetStore';
import { formatCurrency } from '@/lib/utils/currency';
import type { BudgetStatus } from '@/stores/types';

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  colorScheme: string;
  subtitle?: string;
}

function StatCard({ label, value, icon, colorScheme, subtitle }: StatCardProps) {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      p={5}
      border="1px solid"
      borderColor="gray.200"
      _dark={{
        bg: 'gray.800',
        borderColor: 'gray.700',
      }}
    >
      <Flex justify="space-between" align="flex-start" mb={3}>
        <VStack align="flex-start" gap={0}>
          <Text fontSize="sm" color="gray.500" _dark={{ color: 'gray.400' }}>
            {label}
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="gray.900" _dark={{ color: 'white' }}>
            {formatCurrency(value)}
          </Text>
          {subtitle && (
            <Text fontSize="xs" color="gray.400" _dark={{ color: 'gray.500' }}>
              {subtitle}
            </Text>
          )}
        </VStack>
        <Box
          p={2.5}
          borderRadius="lg"
          bg={`${colorScheme}.50`}
          color={`${colorScheme}.500`}
          _dark={{
            bg: `${colorScheme}.900`,
            color: `${colorScheme}.300`,
          }}
        >
          {icon}
        </Box>
      </Flex>
    </Box>
  );
}

const STATUS_COLORS: Record<BudgetStatus, string> = {
  safe: 'green',
  warning: 'yellow',
  danger: 'orange',
  exceeded: 'red',
};

export function BudgetOverview() {
  const { getCurrentPeriod, getTotalAllocated, getTotalSpent, getRemainingToAllocate } = useBudgetStore();
  const currentPeriod = getCurrentPeriod();
  
  if (!currentPeriod) return null;
  
  const totalBudget = currentPeriod.totalBudget;
  const totalAllocated = getTotalAllocated();
  const totalSpent = getTotalSpent();
  const remainingToAllocate = getRemainingToAllocate();
  const remainingFromAllocated = totalAllocated - totalSpent;
  
  // Progress percentages
  const allocatedProgress = totalBudget > 0 ? (totalAllocated / totalBudget) * 100 : 0;
  const spentProgress = totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0;
  
  // Determine spending status
  const spendingStatus: BudgetStatus = currentPeriod.status || 'safe';
  const statusColor = STATUS_COLORS[spendingStatus];
  
  return (
    <Box>
      {/* Main Stats Grid */}
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4} mb={6}>
        <StatCard
          label="Total Budget"
          value={totalBudget}
          icon={<Wallet size={22} />}
          colorScheme="teal"
          subtitle={`Bulan ${new Date(currentPeriod.year, currentPeriod.month - 1).toLocaleDateString('id-ID', { month: 'long' })}`}
        />
        <StatCard
          label="Dialokasikan"
          value={totalAllocated}
          icon={<PieChart size={22} />}
          colorScheme="blue"
          subtitle={`${allocatedProgress.toFixed(0)}% dari total budget`}
        />
        <StatCard
          label="Total Terpakai"
          value={totalSpent}
          icon={<TrendingDown size={22} />}
          colorScheme={statusColor}
          subtitle={`${spentProgress.toFixed(0)}% dari alokasi`}
        />
        <StatCard
          label="Sisa Budget"
          value={remainingFromAllocated}
          icon={<Banknote size={22} />}
          colorScheme={remainingFromAllocated >= 0 ? 'green' : 'red'}
          subtitle={remainingFromAllocated >= 0 ? 'Masih tersedia' : 'Melebihi budget'}
        />
      </SimpleGrid>
      
      {/* Allocation Progress */}
      <Box
        bg="white"
        borderRadius="xl"
        p={5}
        border="1px solid"
        borderColor="gray.200"
        _dark={{
          bg: 'gray.800',
          borderColor: 'gray.700',
        }}
      >
        <Flex justify="space-between" mb={3}>
          <Text fontWeight="semibold" color="gray.700" _dark={{ color: 'gray.200' }}>
            Alokasi Budget
          </Text>
          <Text fontSize="sm" color="gray.500" _dark={{ color: 'gray.400' }}>
            {formatCurrency(totalAllocated)} / {formatCurrency(totalBudget)}
          </Text>
        </Flex>
        
        <Progress.Root
          value={Math.min(100, allocatedProgress)}
          size="md"
          borderRadius="full"
          colorPalette={allocatedProgress >= 100 ? 'green' : 'blue'}
        >
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
        
        {remainingToAllocate > 0 && (
          <Text fontSize="sm" color="gray.500" mt={2} _dark={{ color: 'gray.400' }}>
            Sisa yang bisa dialokasikan: {formatCurrency(remainingToAllocate)}
          </Text>
        )}
        {allocatedProgress >= 100 && (
          <Text fontSize="sm" color="green.500" mt={2}>
            ✓ Semua budget sudah dialokasikan
          </Text>
        )}
      </Box>
    </Box>
  );
}
