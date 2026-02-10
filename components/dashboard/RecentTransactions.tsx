"use client";

import { Box, Text, VStack, HStack, Flex } from "@chakra-ui/react";
import { LuArrowUpRight, LuArrowDownLeft, LuArrowRight } from "react-icons/lu";
import Link from "next/link";
import { useTransactionStore } from "@/stores/transactionStore";
import { formatCurrency } from "@/lib/utils/currency";
import { useMemo } from "react";

export function RecentTransactions() {
  // Select RAW state (not a function reference).
  // Selecting a function like `state.getRecentTransactions` would never trigger
  // re-renders when data changes because the function reference is stable.
  const transactions = useTransactionStore((state) => state.transactions);

  // Derive the 5 most recent transactions from raw state
  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort(
        (a, b) =>
          new Date(b.transactionDate).getTime() -
          new Date(a.transactionDate).getTime()
      )
      .slice(0, 5);
  }, [transactions]);

  const getRelativeDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Compare date portions only
    const dateOnly = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const todayOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const yesterdayOnly = new Date(
      yesterday.getFullYear(),
      yesterday.getMonth(),
      yesterday.getDate()
    );

    if (dateOnly.getTime() === todayOnly.getTime()) return "Hari ini";
    if (dateOnly.getTime() === yesterdayOnly.getTime()) return "Kemarin";

    const diffDays = Math.floor(
      (todayOnly.getTime() - dateOnly.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diffDays < 7) return `${diffDays} hari lalu`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu lalu`;

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    });
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
          Transaksi Terbaru
        </Text>
        <Link href="/transaksi">
          <HStack
            gap={1}
            color="teal.600"
            fontSize="xs"
            fontWeight="medium"
            cursor="pointer"
            _hover={{ color: "teal.700" }}
            _dark={{ color: "teal.400", _hover: { color: "teal.300" } }}
          >
            <Text>Lihat Semua</Text>
            <LuArrowRight size={14} />
          </HStack>
        </Link>
      </Flex>

      {/* Transaction List */}
      {recentTransactions.length === 0 ? (
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
            <LuArrowUpRight size={24} color="gray" />
          </Box>
          <Text
            fontSize="sm"
            color="gray.500"
            textAlign="center"
            _dark={{ color: "gray.400" }}
          >
            Belum ada transaksi.
          </Text>
          <Text fontSize="xs" color="gray.400" textAlign="center">
            Mulai catat keuanganmu!
          </Text>
        </Flex>
      ) : (
        <VStack gap={0} align="stretch">
          {recentTransactions.map((transaction, index) => (
            <Flex
              key={transaction.id}
              justify="space-between"
              align="center"
              px={5}
              py={3.5}
              borderBottom={
                index < recentTransactions.length - 1 ? "1px solid" : "none"
              }
              borderColor="gray.100"
              transition="background 0.15s ease"
              _hover={{ bg: "gray.50" }}
              _dark={{
                borderColor: "gray.700",
                _hover: { bg: "gray.700/50" },
              }}
            >
              <HStack gap={3}>
                <Box
                  p={2}
                  borderRadius="lg"
                  bg={
                    transaction.type === "income" ? "green.50" : "red.50"
                  }
                  color={
                    transaction.type === "income" ? "green.600" : "red.600"
                  }
                  _dark={{
                    bg:
                      transaction.type === "income"
                        ? "green.900/50"
                        : "red.900/50",
                    color:
                      transaction.type === "income"
                        ? "green.400"
                        : "red.400",
                  }}
                >
                  {transaction.type === "income" ? (
                    <LuArrowDownLeft size={16} />
                  ) : (
                    <LuArrowUpRight size={16} />
                  )}
                </Box>
                <VStack align="flex-start" gap={0.5}>
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    color="gray.900"
                    _dark={{ color: "white" }}
                    lineClamp={1}
                  >
                    {transaction.description}
                  </Text>
                  <HStack gap={2}>
                    <Text fontSize="xs" color="gray.500">
                      {transaction.categoryName}
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      •
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      {getRelativeDate(transaction.transactionDate)}
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color={
                  transaction.type === "income" ? "green.600" : "gray.900"
                }
                whiteSpace="nowrap"
                _dark={{
                  color:
                    transaction.type === "income" ? "green.400" : "white",
                }}
              >
                {transaction.type === "income" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </Text>
            </Flex>
          ))}
        </VStack>
      )}
    </Box>
  );
}
