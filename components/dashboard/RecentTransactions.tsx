"use client";

import { Box, Text, VStack, HStack, Badge, Flex } from "@chakra-ui/react";
import { LuArrowUpRight, LuArrowDownLeft } from "react-icons/lu";

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
      borderRadius="2xl"
      p={6}
      boxShadow="sm"
      border="1px solid"
      borderColor="gray.100"
      _dark={{
        bg: "gray.800",
        borderColor: "gray.700",
      }}
    >
      <HStack justify="space-between" mb={5}>
        <Text
          fontSize="lg"
          fontWeight="semibold"
          color="gray.800"
          _dark={{ color: "white" }}
        >
          Transaksi Terbaru
        </Text>
        <Text
          fontSize="sm"
          color="teal.500"
          fontWeight="medium"
          cursor="pointer"
          _hover={{ color: "teal.600" }}
        >
          Lihat Semua
        </Text>
      </HStack>

      <VStack gap={4} align="stretch">
        {recentTransactions.map((transaction) => (
          <Flex
            key={transaction.id}
            justify="space-between"
            align="center"
            py={3}
            borderBottom="1px solid"
            borderColor="gray.100"
            _last={{ borderBottom: "none" }}
            _dark={{ borderColor: "gray.700" }}
          >
            <HStack gap={3}>
              <Box
                p={2}
                borderRadius="lg"
                bg={transaction.type === "income" ? "green.50" : "red.50"}
                color={transaction.type === "income" ? "green.500" : "red.500"}
                _dark={{
                  bg: transaction.type === "income" ? "green.900" : "red.900",
                  color: transaction.type === "income" ? "green.200" : "red.200",
                }}
              >
                {transaction.type === "income" ? (
                  <LuArrowDownLeft size={18} />
                ) : (
                  <LuArrowUpRight size={18} />
                )}
              </Box>
              <VStack align="flex-start" gap={0}>
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  color="gray.800"
                  _dark={{ color: "white" }}
                >
                  {transaction.description}
                </Text>
                <HStack gap={2}>
                  <Badge
                    size="sm"
                    variant="subtle"
                    colorPalette={transaction.type === "income" ? "green" : "gray"}
                    fontSize="xs"
                  >
                    {transaction.category}
                  </Badge>
                  <Text fontSize="xs" color="gray.500">
                    {transaction.date}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            <Text
              fontSize="sm"
              fontWeight="semibold"
              color={transaction.type === "income" ? "green.500" : "red.500"}
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
