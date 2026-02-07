/**
 * ColorPicker - Komponen untuk memilih warna tabungan
 * Features:
 * - 6 pilihan warna dengan nama
 * - Circle swatches dengan selected border
 * - Tooltip nama warna on hover
 */

'use client';

import { Box, HStack, Text } from '@chakra-ui/react';
import { Tooltip } from '@/components/ui/tooltip';

// Daftar warna yang tersedia untuk tabungan
export const SAVINGS_COLORS = [
  { name: 'Teal', value: '#319795' },
  { name: 'Purple', value: '#805AD5' },
  { name: 'Blue', value: '#3182CE' },
  { name: 'Green', value: '#38A169' },
  { name: 'Orange', value: '#DD6B20' },
  { name: 'Pink', value: '#D53F8C' },
];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <Box>
      <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.700" _dark={{ color: 'gray.300' }}>
        Pilih Warna
      </Text>
      <HStack gap={3}>
        {SAVINGS_COLORS.map((color) => {
          const isSelected = value === color.value;
          
          return (
            <Tooltip key={color.value} content={color.name}>
              <Box
                onClick={() => onChange(color.value)}
                w={8}
                h={8}
                borderRadius="full"
                bg={color.value}
                cursor="pointer"
                transition="all 0.2s"
                border="3px solid"
                borderColor={isSelected ? 'white' : 'transparent'}
                boxShadow={isSelected ? `0 0 0 2px ${color.value}` : 'none'}
                _hover={{
                  transform: 'scale(1.15)',
                }}
                role="button"
                aria-label={`Pilih warna ${color.name}`}
                aria-pressed={isSelected}
              />
            </Tooltip>
          );
        })}
      </HStack>
    </Box>
  );
}
