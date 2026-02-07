/**
 * SavingsCard - Komponen card untuk menampilkan satu tabungan
 * Menampilkan info tabungan dengan progress bar dan aksi
 */

'use client';

import { Box, HStack, VStack, Text, Progress, IconButton, Flex, Badge, Icon } from '@chakra-ui/react';
import { LuEye, LuPencil, LuTrash2 } from 'react-icons/lu';
import type { SavingsGoal } from '@/stores/types';
import { formatCurrency } from '@/lib/utils/currency';
import { formatDateShort, formatTimeRemaining } from '@/lib/utils/formatDate';
import { getIconComponent } from '@/components/ui/IconPicker';

interface SavingsCardProps {
  savings: SavingsGoal;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function SavingsCard({ savings, onView, onEdit, onDelete }: SavingsCardProps) {
  const progressPercentage = Math.min(100, Math.round((savings.currentAmount / savings.targetAmount) * 100));
  const isCompleted = savings.currentAmount >= savings.targetAmount;
  
  return (
    <Box
      bg="white"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.200"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{
        borderColor: 'gray.300',
        shadow: 'md',
      }}
      _dark={{
        bg: 'gray.800',
        borderColor: 'gray.700',
        _hover: { borderColor: 'gray.600' },
      }}
    >
      {/* Color bar on top */}
      <Box h={1} bg={savings.color} />
      
      <Box p={5}>
        <Flex justify="space-between" align="flex-start" mb={4}>
          {/* Left side - Icon and name */}
          <HStack gap={3}>
            <Flex
              p={2.5}
              bg={`${savings.color}20`}
              borderRadius="lg"
              align="center"
              justify="center"
            >
              <Icon boxSize={6} color={savings.color}>
                {(() => { const IconComp = getIconComponent(savings.icon); return <IconComp />; })()}
              </Icon>
            </Flex>
            <VStack align="flex-start" gap={0}>
              <Text fontWeight="semibold" fontSize="md" color="gray.900" _dark={{ color: 'white' }}>
                {savings.name}
              </Text>
              <HStack gap={2}>
                <Badge
                  size="sm"
                  colorPalette={savings.type === 'berjangka' ? 'purple' : 'blue'}
                  variant="subtle"
                  borderRadius="md"
                >
                  {savings.type === 'berjangka' ? 'Berjangka' : 'Reguler'}
                </Badge>
                {isCompleted && (
                  <Badge size="sm" colorPalette="green" variant="subtle" borderRadius="md">
                    ✓ Tercapai
                  </Badge>
                )}
              </HStack>
            </VStack>
          </HStack>
          
          {/* Right side - Actions */}
          <HStack gap={0.5}>
            {onView && (
              <IconButton
                aria-label="Lihat detail"
                variant="ghost"
                size="sm"
                onClick={() => onView(savings.id)}
                color="gray.500"
                _hover={{ color: 'gray.700', bg: 'gray.100' }}
                _dark={{ _hover: { color: 'white', bg: 'gray.700' } }}
              >
                <LuEye size={16} />
              </IconButton>
            )}
            {onEdit && (
              <IconButton
                aria-label="Edit"
                variant="ghost"
                size="sm"
                onClick={() => onEdit(savings.id)}
                color="gray.500"
                _hover={{ color: 'blue.600', bg: 'blue.50' }}
                _dark={{ _hover: { color: 'blue.400', bg: 'blue.900' } }}
              >
                <LuPencil size={16} />
              </IconButton>
            )}
            {onDelete && (
              <IconButton
                aria-label="Hapus"
                variant="ghost"
                size="sm"
                onClick={() => onDelete(savings.id)}
                color="gray.500"
                _hover={{ color: 'red.600', bg: 'red.50' }}
                _dark={{ _hover: { color: 'red.400', bg: 'red.900' } }}
              >
                <LuTrash2 size={16} />
              </IconButton>
            )}
          </HStack>
        </Flex>
        
        {/* Amount info */}
        <VStack align="stretch" gap={2} mb={4}>
          <Flex justify="space-between" align="baseline">
            <Text fontSize="xl" fontWeight="bold" color="gray.900" _dark={{ color: 'white' }}>
              {formatCurrency(savings.currentAmount)}
            </Text>
            <Text fontSize="sm" color="gray.500">
              dari {formatCurrency(savings.targetAmount)}
            </Text>
          </Flex>
          
          {/* Progress bar */}
          <Progress.Root value={progressPercentage} size="sm" colorPalette="teal">
            <Progress.Track bg="gray.100" borderRadius="full" _dark={{ bg: 'gray.700' }}>
              <Progress.Range borderRadius="full" bg={savings.color} />
            </Progress.Track>
          </Progress.Root>
          
          <Flex justify="space-between" align="center">
            <Text fontSize="xs" color="gray.500">
              {progressPercentage}% tercapai
            </Text>
            {savings.remainingAmount && savings.remainingAmount > 0 && (
              <Text fontSize="xs" color="gray.500">
                Sisa {formatCurrency(savings.remainingAmount)}
              </Text>
            )}
          </Flex>
        </VStack>
        
        {/* Footer info for berjangka type */}
        {savings.type === 'berjangka' && savings.targetDate && (
          <Box
            bg="gray.50"
            borderRadius="lg"
            p={3}
            _dark={{ bg: 'gray.700' }}
          >
            <Flex justify="space-between" align="center">
              <VStack align="flex-start" gap={0}>
                <Text fontSize="xs" color="gray.500">Deadline</Text>
                <Text fontSize="sm" fontWeight="medium" color="gray.700" _dark={{ color: 'gray.300' }}>
                  {formatDateShort(savings.targetDate)}
                </Text>
              </VStack>
              <VStack align="flex-end" gap={0}>
                <Text fontSize="xs" color="gray.500">Target/bulan</Text>
                <Text fontSize="sm" fontWeight="medium" color={savings.color}>
                  {savings.monthlyTarget ? formatCurrency(savings.monthlyTarget) : '-'}
                </Text>
              </VStack>
            </Flex>
            <Text fontSize="xs" color="gray.400" mt={2} _dark={{ color: 'gray.500' }}>
              {formatTimeRemaining(savings.targetDate)}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
