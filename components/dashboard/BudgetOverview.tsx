"use client";

import { Box, Text, VStack, HStack, Progress, Flex } from "@chakra-ui/react";
import { LuArrowRight, LuShoppingCart, LuCar, LuGamepad2, LuFileText } from "react-icons/lu";
import Link from "next/link";
import { ReactNode } from "react";

interface BudgetItem {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  color: string;
  icon: ReactNode;
}

const budgetItems: BudgetItem[] = [
  { id: "1", name: "Kebutuhan Pokok", allocated: 3000000, spent: 2100000, color: "teal", icon: <LuShoppingCart size={16} /> },
  { id: "2", name: "Transportasi", allocated: 1000000, spent: 750000, color: "blue", icon: <LuCar size={16} /> },
  { id: "3", name: "Hiburan", allocated: 500000, spent: 480000, color: "purple", icon: <LuGamepad2 size={16} /> },
  { id: "4", name: "Tagihan", allocated: 1500000, spent: 1200000, color: "orange", icon: <LuFileText size={16} /> },
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function BudgetOverview() {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.200"
      _dark={{
        bg: "gray.800",
        borderColor: "gray.700",
      }}
    >
      {/* Header */}
      <Flex
        justify="space-between"
        align="center"
        px={5}
        py={4}
        borderBottom="1px solid"
        borderColor="gray.100"
        _dark={{ borderColor: "gray.700" }}
      >
        <Text
          fontSize="sm"
          fontWeight="semibold"
          color="gray.900"
          _dark={{ color: "white" }}
        >
          Budget Bulan Ini
        </Text>
        <Link href="/budget">
          <HStack
            gap={1}
            color="teal.600"
            fontSize="xs"
            fontWeight="medium"
            cursor="pointer"
            _hover={{ color: "teal.700" }}
            _dark={{ color: "teal.400", _hover: { color: "teal.300" } }}
          >
            <Text>Kelola Budget</Text>
            <LuArrowRight size={14} />
          </HStack>
        </Link>
      </Flex>

      {/* Budget List */}
      <VStack gap={0} align="stretch" py={2}>
        {budgetItems.map((item, index) => {
          const percentage = Math.round((item.spent / item.allocated) * 100);
          const isOverBudget = percentage > 100;
          const isNearLimit = percentage >= 80 && percentage <= 100;
          const remaining = item.allocated - item.spent;

          return (
            <Box
              key={item.id}
              px={5}
              py={3.5}
              borderBottom={index < budgetItems.length - 1 ? "1px solid" : "none"}
              borderColor="gray.100"
              _dark={{ borderColor: "gray.700" }}
            >
              <Flex justify="space-between" align="center" mb={2}>
                <HStack gap={2.5}>
                  <Box
                    p={1.5}
                    bg={`${item.color}.50`}
                    color={`${item.color}.600`}
                    borderRadius="md"
                    _dark={{ bg: `${item.color}.900/50`, color: `${item.color}.300` }}
                  >
                    {item.icon}
                  </Box>
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    color="gray.900"
                    _dark={{ color: "white" }}
                  >
                    {item.name}
                  </Text>
                </HStack>
                <Text
                  fontSize="xs"
                  fontWeight="semibold"
                  color={isOverBudget ? "red.500" : isNearLimit ? "orange.500" : "gray.600"}
                  _dark={{ color: isOverBudget ? "red.400" : isNearLimit ? "orange.400" : "gray.400" }}
                >
                  {percentage}%
                </Text>
              </Flex>
              
              <Progress.Root
                value={Math.min(percentage, 100)}
                size="xs"
                colorPalette={isOverBudget ? "red" : isNearLimit ? "orange" : item.color}
              >
                <Progress.Track bg="gray.100" borderRadius="full" _dark={{ bg: "gray.700" }}>
                  <Progress.Range borderRadius="full" />
                </Progress.Track>
              </Progress.Root>

              <Flex justify="space-between" mt={2}>
                <Text fontSize="xs" color="gray.500">
                  {formatCurrency(item.spent)} terpakai
                </Text>
                <Text fontSize="xs" color={remaining < 0 ? "red.500" : "gray.500"}>
                  {remaining < 0 ? "Lebih " : "Sisa "}
                  {formatCurrency(Math.abs(remaining))}
                </Text>
              </Flex>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
}
