"use client";

import { Box, Text, VStack, HStack, Badge, Flex } from "@chakra-ui/react";
import { LuArrowUpRight, LuArrowDownLeft, LuArrowRight } from "react-icons/lu";
import Link from "next/link";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

const recentTransactions: Transaction[] = [
  {
    id: "1",
    description: "Gaji Bulanan",
    amount: 8500000,
    type: "income",
    category: "Pendapatan",
    date: "Hari ini",
  },
  {
    id: "2",
    description: "Belanja Bulanan",
    amount: 1250000,
    type: "expense",
    category: "Kebutuhan",
    date: "Hari ini",
  },
  {
    id: "3",
    description: "Tagihan Listrik",
    amount: 450000,
    type: "expense",
    category: "Tagihan",
    date: "Kemarin",
  },
  {
    id: "4",
    description: "Freelance Project",
    amount: 2000000,
    type: "income",
    category: "Pendapatan",
    date: "Kemarin",
  },
  {
    id: "5",
    description: "Makan Siang",
    amount: 75000,
    type: "expense",
    category: "Makanan",
    date: "2 hari lalu",
  },
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function RecentTransactions() {
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
      <VStack gap={0} align="stretch">
        {recentTransactions.map((transaction, index) => (
          <Flex
            key={transaction.id}
            justify="space-between"
            align="center"
            px={5}
            py={3.5}
            borderBottom={index < recentTransactions.length - 1 ? "1px solid" : "none"}
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
                bg={transaction.type === "income" ? "green.50" : "red.50"}
                color={transaction.type === "income" ? "green.600" : "red.600"}
                _dark={{
                  bg: transaction.type === "income" ? "green.900/50" : "red.900/50",
                  color: transaction.type === "income" ? "green.400" : "red.400",
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
                >
                  {transaction.description}
                </Text>
                <HStack gap={2}>
                  <Text fontSize="xs" color="gray.500">
                    {transaction.category}
                  </Text>
                  <Text fontSize="xs" color="gray.400">
                    •
                  </Text>
                  <Text fontSize="xs" color="gray.400">
                    {transaction.date}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            <Text
              fontSize="sm"
              fontWeight="semibold"
              color={transaction.type === "income" ? "green.600" : "gray.900"}
              _dark={{
                color: transaction.type === "income" ? "green.400" : "white",
              }}
            >
              {transaction.type === "income" ? "+" : "-"}
              {formatCurrency(transaction.amount)}
            </Text>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
}
