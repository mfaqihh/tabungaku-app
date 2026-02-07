/**
 * CurrencyInput - Input dengan auto-format Rupiah
 * Features:
 * - Auto-format dengan separator ribuan (Rp 1.000.000)
 * - Handle paste values
 * - Hanya menerima input angka
 */

'use client';

import { Input, Text, Box } from '@chakra-ui/react';
import { useState, useCallback, useEffect, ChangeEvent } from 'react';
import { formatNumber, parseCurrency } from '@/lib/utils/currency';

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function CurrencyInput({
  value,
  onChange,
  placeholder = '0',
  isDisabled = false,
  isInvalid = false,
  size = 'md',
}: CurrencyInputProps) {
  // State untuk display value (dengan format)
  const [displayValue, setDisplayValue] = useState<string>('');
  
  // Sync display value ketika value prop berubah dari luar
  useEffect(() => {
    if (value > 0) {
      setDisplayValue(formatNumber(value));
    } else {
      setDisplayValue('');
    }
  }, [value]);
  
  // Handle perubahan input
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    
    // Parse ke number
    const numericValue = parseCurrency(rawValue);
    
    // Update display dengan format
    if (numericValue > 0) {
      setDisplayValue(formatNumber(numericValue));
    } else {
      setDisplayValue('');
    }
    
    // Callback dengan nilai number
    onChange(numericValue);
  }, [onChange]);
  
  // Handle paste
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const numericValue = parseCurrency(pastedText);
    
    if (numericValue > 0) {
      setDisplayValue(formatNumber(numericValue));
      onChange(numericValue);
    }
  }, [onChange]);
  
  return (
    <Box position="relative">
      <Box
        position="absolute"
        left={3}
        top="50%"
        transform="translateY(-50%)"
        zIndex={1}
        pointerEvents="none"
      >
        <Text
          fontSize={size === 'sm' ? 'sm' : 'md'}
          color="gray.500"
          fontWeight="medium"
          _dark={{ color: 'gray.400' }}
        >
          Rp
        </Text>
      </Box>
      <Input
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={handleChange}
        onPaste={handlePaste}
        placeholder={placeholder}
        disabled={isDisabled}
        pl={10}
        size={size}
        borderRadius="lg"
        bg="white"
        borderColor={isInvalid ? 'red.500' : 'gray.200'}
        _dark={{
          bg: 'gray.700',
          borderColor: isInvalid ? 'red.500' : 'gray.600',
        }}
        _hover={{
          borderColor: isInvalid ? 'red.500' : 'gray.300',
        }}
        _focus={{
          borderColor: isInvalid ? 'red.500' : 'teal.500',
          boxShadow: isInvalid ? '0 0 0 1px red' : '0 0 0 1px teal',
        }}
      />
    </Box>
  );
}
