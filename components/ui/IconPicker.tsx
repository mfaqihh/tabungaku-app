/**
 * IconPicker - Komponen untuk memilih icon tabungan
 * Features:
 * - Grid layout responsive (6 cols desktop, 4 cols mobile)
 * - Selected state dengan border highlight
 * - Hover effect
 * - Menggunakan Lucide icons untuk konsistensi
 */

'use client';

import { Box, SimpleGrid, Text, Icon } from '@chakra-ui/react';
import {
  LuPiggyBank,
  LuShield,
  LuPlane,
  LuSmartphone,
  LuHouse,
  LuCar,
  LuGraduationCap,
  LuHeart,
  LuGift,
  LuBriefcase,
  LuTrophy,
  LuStar,
  LuWallet,
  LuGamepad2,
  LuShoppingCart,
  LuBaby,
  LuLaptop,
  LuUmbrella,
} from 'react-icons/lu';
import type { IconType } from 'react-icons';

// Mapping icon key ke komponen Lucide
export const ICON_MAP: Record<string, IconType> = {
  'piggy-bank': LuPiggyBank,
  'shield': LuShield,
  'plane': LuPlane,
  'smartphone': LuSmartphone,
  'house': LuHouse,
  'car': LuCar,
  'graduation-cap': LuGraduationCap,
  'heart': LuHeart,
  'gift': LuGift,
  'briefcase': LuBriefcase,
  'trophy': LuTrophy,
  'star': LuStar,
  'wallet': LuWallet,
  'gamepad': LuGamepad2,
  'shopping-cart': LuShoppingCart,
  'baby': LuBaby,
  'laptop': LuLaptop,
  'umbrella': LuUmbrella,
};

// Daftar icon keys yang tersedia
export const SAVINGS_ICONS = Object.keys(ICON_MAP);

// Helper untuk mendapatkan komponen icon dari key
export function getIconComponent(iconKey: string): IconType {
  return ICON_MAP[iconKey] || LuPiggyBank;
}

interface IconPickerProps {
  value: string;
  onChange: (icon: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <Box>
      <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.700" _dark={{ color: 'gray.300' }}>
        Pilih Icon
      </Text>
      <SimpleGrid columns={{ base: 6, sm: 9 }} gap={2}>
        {SAVINGS_ICONS.map((iconKey) => {
          const isSelected = value === iconKey;
          const IconComponent = ICON_MAP[iconKey];
          
          return (
            <Box
              key={iconKey}
              onClick={() => onChange(iconKey)}
              display="flex"
              alignItems="center"
              justifyContent="center"
              w={10}
              h={10}
              borderRadius="lg"
              cursor="pointer"
              transition="all 0.2s"
              bg={isSelected ? 'teal.50' : 'gray.50'}
              border="2px solid"
              borderColor={isSelected ? 'teal.500' : 'transparent'}
              _hover={{
                bg: isSelected ? 'teal.100' : 'gray.100',
                transform: 'scale(1.1)',
              }}
              _dark={{
                bg: isSelected ? 'teal.900' : 'gray.700',
                _hover: {
                  bg: isSelected ? 'teal.800' : 'gray.600',
                },
              }}
              role="button"
              aria-label={`Pilih icon ${iconKey}`}
              aria-pressed={isSelected}
            >
              <Icon boxSize={5} color={isSelected ? 'teal.600' : 'gray.600'} _dark={{ color: isSelected ? 'teal.300' : 'gray.300' }}>
                <IconComponent />
              </Icon>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
