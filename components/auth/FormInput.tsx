"use client";

import { Input, Text, VStack, Box, InputGroup } from "@chakra-ui/react";
import { ReactNode, useState } from "react";

interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  leftIcon?: ReactNode;
  rightElement?: ReactNode;
  error?: string;
  required?: boolean;
}

export function FormInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  leftIcon,
  rightElement,
  error,
  required = false,
}: FormInputProps) {
  return (
    <VStack gap={2} align="stretch" w="full">
      <Text
        fontSize="sm"
        fontWeight="medium"
        color="gray.700"
        _dark={{ color: "gray.300" }}
      >
        {label}
        {required && (
          <Text as="span" color="red.500" ml={1}>
            *
          </Text>
        )}
      </Text>
      <Box position="relative">
        {leftIcon && (
          <Box
            position="absolute"
            left={3}
            top="50%"
            transform="translateY(-50%)"
            color="gray.400"
            zIndex={1}
          >
            {leftIcon}
          </Box>
        )}
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          pl={leftIcon ? 10 : 4}
          pr={rightElement ? 12 : 4}
          h={12}
          fontSize="sm"
          bg="gray.50"
          border="1px solid"
          borderColor={error ? "red.500" : "gray.200"}
          borderRadius="lg"
          _dark={{
            bg: "gray.700",
            borderColor: error ? "red.500" : "gray.600",
            color: "white",
          }}
          _hover={{
            borderColor: error ? "red.500" : "teal.400",
          }}
          _focus={{
            borderColor: error ? "red.500" : "teal.500",
            boxShadow: error
              ? "0 0 0 1px var(--chakra-colors-red-500)"
              : "0 0 0 1px var(--chakra-colors-teal-500)",
            bg: { base: "white", _dark: "gray.600" },
          }}
          _placeholder={{
            color: "gray.400",
          }}
        />
        {rightElement && (
          <Box
            position="absolute"
            right={3}
            top="50%"
            transform="translateY(-50%)"
            zIndex={1}
          >
            {rightElement}
          </Box>
        )}
      </Box>
      {error && (
        <Text fontSize="xs" color="red.500">
          {error}
        </Text>
      )}
    </VStack>
  );
}
