"use client";

import { Box, Text, VStack, HStack, Flex, Progress } from "@chakra-ui/react";
import { LuArrowRight, LuWallet } from "react-icons/lu";
import Link from "next/link";
import { useBudgetStore } from "@/stores/budgetStore";
import { getIconByValue } from "@/constants/budgetIcons";
import { formatCurrency } from "@/lib/utils/currency";
import { createElement, useMemo } from "react";

export function BudgetOverview() {
  // Select RAW state arrays (not function references).
  // Selecting `state.getCurrentPeriod` (a function) would never trigger re-renders
  // because the function reference is stable even when the underlying data changes.
  const budgetPeriods = useBudgetStore((state) => state.budgetPeriods);
  const budgetCategories = useBudgetStore((state) => state.budgetCategories);

  // Derive current period and its categories from raw state
  const { currentPeriod, currentCategories } = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const period =
      budgetPeriods.find(
        (p) => p.month === currentMonth && p.year === currentYear
      ) || null;

    const categories = period
      ? [...budgetCategories]
          .filter((c) => c.budgetPeriodId === period.id)
          .sort((a, b) => {
            const progressA =
              a.allocatedAmount > 0
                ? (a.spentAmount / a.allocatedAmount) * 100
                : 0;
            const progressB =
              b.allocatedAmount > 0
                ? (b.spentAmount / b.allocatedAmount) * 100
                : 0;
            return progressB - progressA;
          })
          .slice(0, 4)
      : [];

    return { currentPeriod: period, currentCategories: categories };
  }, [budgetPeriods, budgetCategories]);

  const getProgressColor = (percentage: number) => {
    if (percentage > 100) return "red";
    if (percentage >= 80) return "orange";
    if (percentage >= 60) return "yellow";
    return "teal";
  };

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
      {currentCategories.length === 0 ? (
        <Flex
          direction="column"
          align="center"
          justify="center"
          py={10}
          px={5}
          gap={2}
        >
          <Box
            p={3}
            bg="gray.100"
            borderRadius="full"
            _dark={{ bg: "gray.700" }}
          >
            <LuWallet size={24} color="gray" />
          </Box>
          <Text
            fontSize="sm"
            color="gray.500"
            textAlign="center"
            _dark={{ color: "gray.400" }}
          >
            Belum ada budget bulan ini.
          </Text>
          <Text fontSize="xs" color="gray.400" textAlign="center">
            Buat budget bulananmu!
          </Text>
        </Flex>
      ) : (
        <VStack gap={0} align="stretch" py={2}>
          {currentCategories.map((item, index) => {
            const percentage =
              item.allocatedAmount > 0
                ? Math.round(
                    (item.spentAmount / item.allocatedAmount) * 100
                  )
                : 0;
            const isOverBudget = percentage > 100;
            const isNearLimit = percentage >= 80 && percentage <= 100;
            const remaining = item.allocatedAmount - item.spentAmount;
            const colorScheme = getProgressColor(percentage);

            // Resolve Lucide icon from iconValue
            const IconComponent = getIconByValue(item.iconValue);

            return (
              <Box
                key={item.id}
                px={5}
                py={3.5}
                borderBottom={
                  index < currentCategories.length - 1
                    ? "1px solid"
                    : "none"
                }
                borderColor="gray.100"
                _dark={{ borderColor: "gray.700" }}
              >
                <Flex justify="space-between" align="center" mb={2}>
                  <HStack gap={2.5}>
                    <Box
                      p={1.5}
                      bg={`${colorScheme}.50`}
                      color={`${colorScheme}.600`}
                      borderRadius="md"
                      _dark={{
                        bg: `${colorScheme}.900/50`,
                        color: `${colorScheme}.300`,
                      }}
                    >
                      {IconComponent
                        ? createElement(IconComponent, { size: 16 })
                        : <LuWallet size={16} />}
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
                    color={
                      isOverBudget
                        ? "red.500"
                        : isNearLimit
                        ? "orange.500"
                        : "gray.600"
                    }
                    _dark={{
                      color: isOverBudget
                        ? "red.400"
                        : isNearLimit
                        ? "orange.400"
                        : "gray.400",
                    }}
                  >
                    {percentage}%
                  </Text>
                </Flex>

                <Progress.Root
                  value={Math.min(percentage, 100)}
                  size="xs"
                  colorPalette={colorScheme}
                >
                  <Progress.Track
                    bg="gray.100"
                    borderRadius="full"
                    _dark={{ bg: "gray.700" }}
                  >
                    <Progress.Range borderRadius="full" />
                  </Progress.Track>
                </Progress.Root>

                <Flex justify="space-between" mt={2}>
                  <Text fontSize="xs" color="gray.500">
                    {formatCurrency(item.spentAmount)} terpakai
                  </Text>
                  <Text
                    fontSize="xs"
                    color={remaining < 0 ? "red.500" : "gray.500"}
                  >
                    {remaining < 0 ? "Lebih " : "Sisa "}
                    {formatCurrency(Math.abs(remaining))}
                  </Text>
                </Flex>
              </Box>
            );
          })}
        </VStack>
      )}
    </Box>
  );
}
