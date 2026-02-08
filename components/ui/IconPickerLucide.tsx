/**
 * IconPickerLucide - Komponen untuk memilih icon budget
 * Features:
 * - Grid layout dengan Lucide React icons
 * - Grouping by category (optional)
 * - Selected state dengan border highlight
 * - Hover effect
 */

'use client';

import { Box, SimpleGrid, Text, VStack, Flex } from '@chakra-ui/react';
import { BUDGET_ICONS, BUDGET_ICON_CATEGORIES, type BudgetIconOption } from '@/constants/budgetIcons';

interface IconPickerLucideProps {
  value: string;
  onChange: (value: string) => void;
  groupByCategory?: boolean;
}

interface IconButtonProps {
  option: BudgetIconOption;
  isSelected: boolean;
  onClick: () => void;
}

function IconButton({ option, isSelected, onClick }: IconButtonProps) {
  const Icon = option.icon;
  
  return (
    <Box
      as="button"
      p={3}
      borderRadius="lg"
      border="2px solid"
      borderColor={isSelected ? 'teal.500' : 'gray.200'}
      bg={isSelected ? 'teal.50' : 'white'}
      _hover={{
        bg: isSelected ? 'teal.100' : 'gray.50',
        borderColor: isSelected ? 'teal.500' : 'gray.300',
      }}
      _dark={{
        borderColor: isSelected ? 'teal.400' : 'gray.600',
        bg: isSelected ? 'teal.900' : 'gray.700',
        _hover: {
          bg: isSelected ? 'teal.800' : 'gray.600',
        },
      }}
      onClick={onClick}
      transition="all 0.2s"
      cursor="pointer"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1}
      minW={0}
    >
      <Icon 
        size={22} 
        color={isSelected ? '#319795' : 'currentColor'}
      />
      <Text 
        fontSize="xs" 
        textAlign="center" 
        lineClamp={2}
        color={isSelected ? 'teal.600' : 'gray.600'}
        _dark={{ color: isSelected ? 'teal.300' : 'gray.300' }}
      >
        {option.name}
      </Text>
    </Box>
  );
}

export function IconPickerLucide({
  value,
  onChange,
  groupByCategory = false,
}: IconPickerLucideProps) {
  if (groupByCategory) {
    // Grouped by category
    const categories = Object.keys(BUDGET_ICON_CATEGORIES);
    
    return (
      <VStack align="stretch" gap={4}>
        {categories.map((cat) => {
          const icons = BUDGET_ICONS.filter((i) => i.category === cat);
          const categoryLabel = BUDGET_ICON_CATEGORIES[cat];
          
          return (
            <Box key={cat}>
              <Text
                fontSize="sm"
                fontWeight="semibold"
                mb={2}
                color="gray.600"
                _dark={{ color: 'gray.400' }}
              >
                {categoryLabel}
              </Text>
              <SimpleGrid columns={{ base: 3, sm: 4, md: 5 }} gap={2}>
                {icons.map((option) => (
                  <IconButton
                    key={option.value}
                    option={option}
                    isSelected={value === option.value}
                    onClick={() => onChange(option.value)}
                  />
                ))}
              </SimpleGrid>
            </Box>
          );
        })}
      </VStack>
    );
  }

  // Simple grid (no grouping)
  return (
    <SimpleGrid columns={{ base: 3, sm: 4, md: 5 }} gap={2}>
      {BUDGET_ICONS.map((option) => (
        <IconButton
          key={option.value}
          option={option}
          isSelected={value === option.value}
          onClick={() => onChange(option.value)}
        />
      ))}
    </SimpleGrid>
  );
}
