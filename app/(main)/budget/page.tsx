/**
 * Budget Page - Halaman untuk mengelola budget bulanan
 * Features:
 * - Overview budget bulanan
 * - List kategori dengan progress
 * - Modal buat budget & tambah kategori
 * - Skeleton loading & empty states
 */

'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  SimpleGrid,
  Flex,
  Skeleton,
  HStack,
} from '@chakra-ui/react';
import { Plus, Wallet } from 'lucide-react';
import { Header } from '@/components/layout';
import { useBudgetStore } from '@/stores/budgetStore';
import {
  BudgetOverview,
  CreateBudgetModal,
  AddCategoryModal,
  BudgetCategoryCard,
} from '@/components/budget';

// Bulan dalam Bahasa Indonesia
const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

// Skeleton for overview stat cards
function OverviewSkeleton() {
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4} mb={6}>
        {[...Array(4)].map((_, i) => (
          <Box
            key={i}
            bg="white"
            borderRadius="xl"
            p={5}
            border="1px solid"
            borderColor="gray.200"
            _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
          >
            <Flex justify="space-between" align="flex-start" mb={3}>
              <VStack align="flex-start" gap={1}>
                <Skeleton h={4} w="80px" borderRadius="md" />
                <Skeleton h={7} w="140px" borderRadius="md" />
                <Skeleton h={3} w="100px" borderRadius="md" />
              </VStack>
              <Skeleton h={10} w={10} borderRadius="lg" />
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
      <Box
        bg="white"
        borderRadius="xl"
        p={5}
        border="1px solid"
        borderColor="gray.200"
        _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
      >
        <Flex justify="space-between" mb={3}>
          <Skeleton h={5} w="120px" borderRadius="md" />
          <Skeleton h={4} w="200px" borderRadius="md" />
        </Flex>
        <Skeleton h={3} w="full" borderRadius="full" />
      </Box>
    </Box>
  );
}

// Skeleton for category cards
function CategoryCardSkeleton() {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.200"
      overflow="hidden"
      _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
    >
      <Skeleton h={1} />
      <Box p={5}>
        <Flex justify="space-between" mb={4}>
          <HStack gap={3}>
            <Skeleton h={10} w={10} borderRadius="lg" />
            <VStack align="start" gap={1}>
              <Skeleton h={4} w="120px" borderRadius="md" />
              <HStack>
                <Skeleton h={4} w="60px" borderRadius="md" />
                <Skeleton h={4} w="50px" borderRadius="md" />
              </HStack>
            </VStack>
          </HStack>
        </Flex>
        <VStack gap={2} mb={4} align="stretch">
          <Flex justify="space-between">
            <Skeleton h={3} w="60px" borderRadius="md" />
            <Skeleton h={3} w="100px" borderRadius="md" />
          </Flex>
          <Flex justify="space-between">
            <Skeleton h={3} w="80px" borderRadius="md" />
            <Skeleton h={3} w="100px" borderRadius="md" />
          </Flex>
        </VStack>
        <Skeleton h={2} w="full" borderRadius="full" />
      </Box>
    </Box>
  );
}

export default function BudgetPage() {
  const {
    getCurrentPeriod,
    getCategoriesByPeriod,
  } = useBudgetStore();
  
  const [isHydrated, setIsHydrated] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  
  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  // Get current period and categories
  const currentPeriod = getCurrentPeriod();
  const categories = currentPeriod ? getCategoriesByPeriod(currentPeriod.id) : [];
  
  // Check if need to show create modal on mount
  useEffect(() => {
    if (isHydrated && !currentPeriod) {
      setIsCreateModalOpen(true);
    }
  }, [isHydrated, currentPeriod]);
  
  // Loading state during hydration - skeleton
  if (!isHydrated) {
    return (
      <Box minH="100vh">
        <Header title="Budget" />
        <Box p={{ base: 4, md: 6 }} maxW="1600px" mx="auto">
          {/* Title skeleton */}
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'flex-start', md: 'center' }}
            mb={6}
            gap={4}
          >
            <VStack align="start" gap={1}>
              <Skeleton h={5} w="140px" borderRadius="md" />
              <Skeleton h={4} w="240px" borderRadius="md" />
            </VStack>
            <Skeleton h={9} w="160px" borderRadius="lg" />
          </Flex>

          {/* Overview skeleton */}
          <OverviewSkeleton />

          {/* Categories skeleton */}
          <Box mt={6}>
            <Flex justify="space-between" align="center" mb={4}>
              <Skeleton h={5} w="120px" borderRadius="md" />
              <Skeleton h={4} w="80px" borderRadius="md" />
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
              {[...Array(3)].map((_, i) => (
                <CategoryCardSkeleton key={i} />
              ))}
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
    );
  }
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthYearLabel = `${MONTHS[currentMonth]} ${currentYear}`;
  
  // No budget state
  if (!currentPeriod) {
    return (
      <Box minH="100vh">
        <Header title="Budget" />
        <Box p={{ base: 4, md: 6 }} maxW="1600px" mx="auto">
          {/* Empty State */}
          <Flex
            direction="column"
            align="center"
            justify="center"
            minH="60vh"
            textAlign="center"
          >
            <Box
              p={5}
              bg="teal.50"
              borderRadius="full"
              mb={6}
              _dark={{ bg: 'teal.900' }}
            >
              <Wallet size={48} color="#319795" />
            </Box>
            <Text fontSize="xl" fontWeight="bold" mb={3} color="gray.800" _dark={{ color: 'white' }}>
              Belum Ada Budget Bulan Ini
            </Text>
            <Text color="gray.500" mb={6} maxW="400px" _dark={{ color: 'gray.400' }}>
              Buat budget untuk bulan {monthYearLabel} dan mulai kelola keuanganmu dengan lebih baik.
            </Text>
            <Button
              colorPalette="teal"
              size="lg"
              onClick={() => setIsCreateModalOpen(true)}
              _hover={{ transform: "translateY(-1px)", boxShadow: "md" }}
              transition="all 0.2s"
            >
              <Plus size={20} />
              Buat Budget
            </Button>
          </Flex>
          
          {/* Create Budget Modal */}
          <CreateBudgetModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
          />
        </Box>
      </Box>
    );
  }
  
  return (
    <Box minH="100vh">
      <Header title="Budget" />
      
      <Box p={{ base: 4, md: 6 }} maxW="1600px" mx="auto">
        {/* Page Title & Action */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'flex-start', md: 'center' }}
          mb={6}
          gap={4}
        >
          <Box>
            <Text fontSize="lg" fontWeight="semibold" color="gray.700" _dark={{ color: 'gray.300' }}>
              {monthYearLabel}
            </Text>
            <Text fontSize="sm" color="gray.500" _dark={{ color: 'gray.400' }}>
              Kelola alokasi dan pengeluaran bulanan
            </Text>
          </Box>
          <Button
            colorPalette="teal"
            size="sm"
            borderRadius="lg"
            onClick={() => setIsAddCategoryModalOpen(true)}
            _hover={{ transform: "translateY(-1px)", boxShadow: "md" }}
            transition="all 0.2s"
          >
            <Plus size={16} />
            Tambah Kategori
          </Button>
        </Flex>
        
        {/* Budget Overview */}
        <BudgetOverview />
        
        {/* Categories List */}
        <Box mt={6}>
          <Flex justify="space-between" align="center" mb={4}>
            <Text fontWeight="semibold" color="gray.800" _dark={{ color: 'white' }}>
              Kategori Budget
            </Text>
            <Text fontSize="sm" color="gray.500" _dark={{ color: 'gray.400' }}>
              {categories.length} kategori
            </Text>
          </Flex>
          
          {categories.length === 0 ? (
            <Box
              textAlign="center"
              py={12}
              bg="white"
              borderRadius="xl"
              border="1px dashed"
              borderColor="gray.200"
              _dark={{
                bg: 'gray.800',
                borderColor: 'gray.700',
              }}
            >
              <VStack gap={4}>
                <Box
                  p={4}
                  bg="gray.100"
                  borderRadius="full"
                  _dark={{ bg: 'gray.700' }}
                >
                  <Wallet size={32} color="#718096" />
                </Box>
                <Box>
                  <Text fontWeight="medium" color="gray.600" mb={1} _dark={{ color: 'gray.300' }}>
                    Belum ada kategori budget
                  </Text>
                  <Text fontSize="sm" color="gray.500" _dark={{ color: 'gray.400' }}>
                    Tambahkan kategori untuk mengalokasikan budget
                  </Text>
                </Box>
                <Button
                  colorPalette="teal"
                  variant="outline"
                  onClick={() => setIsAddCategoryModalOpen(true)}
                  _hover={{ transform: "translateY(-1px)", boxShadow: "md" }}
                  transition="all 0.2s"
                >
                  <Plus size={18} />
                  Tambah Kategori
                </Button>
              </VStack>
            </Box>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
              {categories.map((category) => (
                <BudgetCategoryCard
                  key={category.id}
                  category={category}
                />
              ))}
            </SimpleGrid>
          )}
        </Box>
        
        {/* Modals */}
        <CreateBudgetModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
        <AddCategoryModal
          isOpen={isAddCategoryModalOpen}
          onClose={() => setIsAddCategoryModalOpen(false)}
        />
      </Box>
    </Box>
  );
}
