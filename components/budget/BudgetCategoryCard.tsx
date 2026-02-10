/**
 * BudgetCategoryCard - Card untuk menampilkan satu kategori budget
 * Menampilkan info kategori dengan progress bar dan aksi
 */

'use client';

import { Box, HStack, VStack, Text, Progress, IconButton, Flex, Badge } from '@chakra-ui/react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import type { BudgetCategory, BudgetStatus } from '@/stores/types';
import { getIconByValue } from '@/constants/budgetIcons';
import { formatCurrency } from '@/lib/utils/currency';
import { useBudgetStore } from '@/stores/budgetStore';
import { toaster } from '@/components/ui/toaster';
import { TOAST_MESSAGES } from '@/constants/toastMessages';

interface BudgetCategoryCardProps {
  category: BudgetCategory;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
}

const STATUS_COLORS: Record<BudgetStatus, string> = {
  safe: 'green',
  warning: 'yellow',
  danger: 'orange',
  exceeded: 'red',
};

const STATUS_LABELS: Record<BudgetStatus, string> = {
  safe: 'Aman',
  warning: 'Waspada',
  danger: 'Hampir Habis',
  exceeded: 'Melebihi',
};

export function BudgetCategoryCard({ category, onEdit, onView }: BudgetCategoryCardProps) {
  const deleteCategory = useBudgetStore((state) => state.deleteCategory);
  
  const progressPercentage = category.progressPercentage ?? 
    (category.allocatedAmount > 0 
      ? Math.min(100, Math.round((category.spentAmount / category.allocatedAmount) * 100))
      : 0);
  
  const status: BudgetStatus = category.status ?? 'safe';
  const statusColor = STATUS_COLORS[status];
  const remainingAmount = category.remainingAmount ?? (category.allocatedAmount - category.spentAmount);
  
  // Get icon component
  const IconComponent = getIconByValue(category.iconValue);
  
  // Handle delete
  const handleDelete = () => {
    if (window.confirm(`Hapus kategori "${category.name}"?`)) {
      deleteCategory(category.id);
      toaster.create({
        title: TOAST_MESSAGES.budget.categoryDeleted.title,
        description: TOAST_MESSAGES.budget.categoryDeleted.description(category.name),
        type: 'success',
        duration: 3000,
      });
    }
  };
  
  return (
    <Box
      bg="white"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.200"
      overflow="hidden"
      transition="all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        borderColor: 'gray.300',
        shadow: 'lg',
        transform: 'translateY(-2px)',
      }}
      _dark={{
        bg: 'gray.800',
        borderColor: 'gray.700',
        _hover: { borderColor: 'gray.600', shadow: 'lg', transform: 'translateY(-2px)' },
      }}
    >
      {/* Color bar on top */}
      <Box h={1} bg={category.color} />
      
      <Box p={5}>
        <Flex justify="space-between" align="flex-start" mb={4}>
          {/* Left side - Icon and name */}
          <HStack gap={3}>
            <Flex
              p={2.5}
              bg={`${category.color}20`}
              borderRadius="lg"
              align="center"
              justify="center"
              color={category.color}
            >
              {IconComponent && <IconComponent size={22} />}
            </Flex>
            <VStack align="flex-start" gap={0}>
              <Text fontWeight="semibold" fontSize="md" color="gray.900" _dark={{ color: 'white' }}>
                {category.name}
              </Text>
              <HStack gap={2}>
                <Badge
                  size="sm"
                  colorPalette={category.categoryType === 'bulanan' ? 'purple' : 'blue'}
                  variant="subtle"
                  borderRadius="md"
                >
                  {category.categoryType === 'bulanan' ? 'Bulanan' : 'Sesekali'}
                </Badge>
                <Badge
                  size="sm"
                  colorPalette={statusColor}
                  variant="subtle"
                  borderRadius="md"
                >
                  {STATUS_LABELS[status]}
                </Badge>
              </HStack>
            </VStack>
          </HStack>
          
          {/* Right side - Actions */}
          <HStack gap={1}>
            {onView && (
              <IconButton
                aria-label="Lihat detail"
                variant="ghost"
                size="sm"
                onClick={() => onView(category.id)}
                borderRadius="lg"
              >
                <Eye size={16} />
              </IconButton>
            )}
            {onEdit && (
              <IconButton
                aria-label="Edit kategori"
                variant="ghost"
                size="sm"
                onClick={() => onEdit(category.id)}
                borderRadius="lg"
              >
                <Pencil size={16} />
              </IconButton>
            )}
            <IconButton
              aria-label="Hapus kategori"
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              borderRadius="lg"
              color="red.500"
              _hover={{ bg: 'red.50' }}
              _dark={{ _hover: { bg: 'red.900' } }}
            >
              <Trash2 size={16} />
            </IconButton>
          </HStack>
        </Flex>
        
        {/* Amount Info */}
        <VStack gap={2} mb={4} align="stretch">
          <Flex justify="space-between">
            <Text fontSize="sm" color="gray.500" _dark={{ color: 'gray.400' }}>
              Terpakai
            </Text>
            <Text fontSize="sm" fontWeight="medium" color="gray.700" _dark={{ color: 'gray.200' }}>
              {formatCurrency(category.spentAmount)}
            </Text>
          </Flex>
          <Flex justify="space-between">
            <Text fontSize="sm" color="gray.500" _dark={{ color: 'gray.400' }}>
              Dialokasikan
            </Text>
            <Text fontSize="sm" fontWeight="medium" color="gray.700" _dark={{ color: 'gray.200' }}>
              {formatCurrency(category.allocatedAmount)}
            </Text>
          </Flex>
        </VStack>
        
        {/* Progress Bar */}
        <Box>
          <Flex justify="space-between" mb={1}>
            <Text fontSize="xs" color="gray.500" _dark={{ color: 'gray.400' }}>
              {progressPercentage}% terpakai
            </Text>
            <Text fontSize="xs" color={remainingAmount >= 0 ? 'green.500' : 'red.500'}>
              {remainingAmount >= 0 ? 'Sisa: ' : 'Lebih: '}
              {formatCurrency(Math.abs(remainingAmount))}
            </Text>
          </Flex>
          <Progress.Root
            value={Math.min(100, progressPercentage)}
            size="sm"
            borderRadius="full"
            colorPalette={statusColor}
          >
            <Progress.Track>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
        </Box>
      </Box>
    </Box>
  );
}
