"use client";

import {
  Box,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Button,
  Table,
  Badge,
  IconButton,
  Input,
  Tabs,
  Flex,
} from "@chakra-ui/react";
import { Header } from "@/components/layout";
import {
  LuPlus,
  LuArrowUpRight,
  LuArrowDownLeft,
  LuPencil,
  LuTrash2,
  LuSearch,
  LuFilter,
  LuDownload,
  LuTrendingUp,
  LuTrendingDown,
  LuWallet,
} from "react-icons/lu";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  budget?: string;
  date: string;
  note?: string;
}

const transactions: Transaction[] = [
  {
    id: "1",
    description: "Gaji Bulanan",
    amount: 8500000,
    type: "income",
    category: "Pendapatan",
    date: "2024-02-07",
    note: "Gaji bulan Februari",
  },
  {
    id: "2",
    description: "Belanja Bulanan",
    amount: 1250000,
    type: "expense",
    category: "Kebutuhan Pokok",
    budget: "Kebutuhan Pokok",
    date: "2024-02-07",
  },
  {
    id: "3",
    description: "Tagihan Listrik",
    amount: 450000,
    type: "expense",
    category: "Tagihan",
    budget: "Tagihan & Utilitas",
    date: "2024-02-06",
  },
  {
    id: "4",
    description: "Freelance Project",
    amount: 2000000,
    type: "income",
    category: "Pendapatan",
    date: "2024-02-06",
    note: "Project website client A",
  },
  {
    id: "5",
    description: "Makan Siang",
    amount: 75000,
    type: "expense",
    category: "Makanan",
    budget: "Makanan & Minuman",
    date: "2024-02-05",
  },
  {
    id: "6",
    description: "Bensin",
    amount: 200000,
    type: "expense",
    category: "Transportasi",
    budget: "Transportasi",
    date: "2024-02-05",
  },
  {
    id: "7",
    description: "Netflix",
    amount: 186000,
    type: "expense",
    category: "Hiburan",
    budget: "Hiburan",
    date: "2024-02-04",
  },
  {
    id: "8",
    description: "Dividen Saham",
    amount: 350000,
    type: "income",
    category: "Investasi",
    date: "2024-02-03",
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

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function TransaksiPage() {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <Box minH="100vh">
      <Header title="Transaksi" />

      <Box p={{ base: 4, md: 6 }} maxW="1600px" mx="auto">
        {/* Summary Cards */}
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={6}>
          <Box
            bg="white"
            borderRadius="xl"
            p={5}
            border="1px solid"
            borderColor="gray.200"
            _dark={{ bg: "gray.800", borderColor: "gray.700" }}
          >
            <Flex justify="space-between" align="flex-start" mb={3}>
              <Text fontSize="xs" fontWeight="medium" color="gray.500" textTransform="uppercase" letterSpacing="wide" _dark={{ color: "gray.400" }}>
                Total Pemasukan
              </Text>
              <Box
                p={2}
                bg="green.50"
                color="green.600"
                borderRadius="lg"
                _dark={{ bg: "green.900/50", color: "green.300" }}
              >
                <LuTrendingUp size={16} />
              </Box>
            </Flex>
            <Text fontSize="xl" fontWeight="bold" color="green.600" _dark={{ color: "green.400" }}>
              {formatCurrency(totalIncome)}
            </Text>
          </Box>

          <Box
            bg="white"
            borderRadius="xl"
            p={5}
            border="1px solid"
            borderColor="gray.200"
            _dark={{ bg: "gray.800", borderColor: "gray.700" }}
          >
            <Flex justify="space-between" align="flex-start" mb={3}>
              <Text fontSize="xs" fontWeight="medium" color="gray.500" textTransform="uppercase" letterSpacing="wide" _dark={{ color: "gray.400" }}>
                Total Pengeluaran
              </Text>
              <Box
                p={2}
                bg="red.50"
                color="red.600"
                borderRadius="lg"
                _dark={{ bg: "red.900/50", color: "red.300" }}
              >
                <LuTrendingDown size={16} />
              </Box>
            </Flex>
            <Text fontSize="xl" fontWeight="bold" color="red.600" _dark={{ color: "red.400" }}>
              {formatCurrency(totalExpense)}
            </Text>
          </Box>

          <Box
            bg="teal.600"
            borderRadius="xl"
            p={5}
            color="white"
          >
            <Flex justify="space-between" align="flex-start" mb={3}>
              <Text fontSize="xs" fontWeight="medium" opacity={0.9} textTransform="uppercase" letterSpacing="wide">
                Saldo Bersih
              </Text>
              <Box p={2} bg="whiteAlpha.200" borderRadius="lg">
                <LuWallet size={16} />
              </Box>
            </Flex>
            <Text fontSize="xl" fontWeight="bold">
              {formatCurrency(balance)}
            </Text>
          </Box>
        </SimpleGrid>

        {/* Tabs & Table */}
        <Box
          bg="white"
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.200"
          _dark={{ bg: "gray.800", borderColor: "gray.700" }}
        >
          <Tabs.Root defaultValue="all" variant="line">
            <Flex
              px={5}
              pt={4}
              pb={3}
              borderBottom="1px solid"
              borderColor="gray.100"
              justify="space-between"
              align="center"
              flexWrap="wrap"
              gap={4}
              _dark={{ borderColor: "gray.700" }}
            >
              <Tabs.List border="none" gap={1}>
                <Tabs.Trigger
                  value="all"
                  px={3}
                  py={1.5}
                  fontSize="sm"
                  fontWeight="medium"
                  borderRadius="md"
                  color="gray.500"
                  _selected={{ color: "teal.600", bg: "teal.50" }}
                  _dark={{ _selected: { color: "teal.300", bg: "teal.900/50" } }}
                >
                  Semua
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="income"
                  px={3}
                  py={1.5}
                  fontSize="sm"
                  fontWeight="medium"
                  borderRadius="md"
                  color="gray.500"
                  _selected={{ color: "green.600", bg: "green.50" }}
                  _dark={{ _selected: { color: "green.300", bg: "green.900/50" } }}
                >
                  Pemasukan
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="expense"
                  px={3}
                  py={1.5}
                  fontSize="sm"
                  fontWeight="medium"
                  borderRadius="md"
                  color="gray.500"
                  _selected={{ color: "red.600", bg: "red.50" }}
                  _dark={{ _selected: { color: "red.300", bg: "red.900/50" } }}
                >
                  Pengeluaran
                </Tabs.Trigger>
              </Tabs.List>

              <HStack gap={2}>
                <Box position="relative" w={{ base: "full", sm: "220px" }}>
                  <Box
                    position="absolute"
                    left={3}
                    top="50%"
                    transform="translateY(-50%)"
                    color="gray.400"
                    pointerEvents="none"
                  >
                    <LuSearch size={14} />
                  </Box>
                  <Input
                    placeholder="Cari transaksi..."
                    pl={8}
                    size="sm"
                    borderRadius="lg"
                    bg="gray.50"
                    borderColor="gray.200"
                    _dark={{ bg: "gray.700", borderColor: "gray.600" }}
                    _focus={{ borderColor: "teal.500", bg: "white" }}
                  />
                </Box>
                <IconButton
                  aria-label="Filter"
                  variant="outline"
                  size="sm"
                  borderRadius="lg"
                  borderColor="gray.200"
                  color="gray.500"
                  _hover={{ bg: "gray.50", borderColor: "gray.300" }}
                  _dark={{ borderColor: "gray.600", _hover: { bg: "gray.700" } }}
                >
                  <LuFilter size={14} />
                </IconButton>
                <IconButton
                  aria-label="Export"
                  variant="outline"
                  size="sm"
                  borderRadius="lg"
                  borderColor="gray.200"
                  color="gray.500"
                  _hover={{ bg: "gray.50", borderColor: "gray.300" }}
                  _dark={{ borderColor: "gray.600", _hover: { bg: "gray.700" } }}
                >
                  <LuDownload size={14} />
                </IconButton>
                <Button colorPalette="teal" size="sm" borderRadius="lg">
                  <LuPlus size={14} />
                  Tambah
                </Button>
              </HStack>
            </Flex>

            <Tabs.Content value="all" p={0}>
              <Box overflowX="auto" css={{ WebkitOverflowScrolling: "touch" }}>
                <TransactionTable transactions={transactions} />
              </Box>
            </Tabs.Content>
            <Tabs.Content value="income" p={0}>
              <Box overflowX="auto" css={{ WebkitOverflowScrolling: "touch" }}>
                <TransactionTable
                  transactions={transactions.filter((t) => t.type === "income")}
                />
              </Box>
            </Tabs.Content>
            <Tabs.Content value="expense" p={0}>
              <Box overflowX="auto" css={{ WebkitOverflowScrolling: "touch" }}>
                <TransactionTable
                  transactions={transactions.filter((t) => t.type === "expense")}
                />
              </Box>
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Box>
    </Box>
  );
}

function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  return (
    <Table.Root size="md" style={{ minWidth: "700px" }}>
      <Table.Header>
        <Table.Row bg="gray.50" _dark={{ bg: "gray.800" }}>
          <Table.ColumnHeader py={3.5} px={5} fontWeight="medium" fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wide" _dark={{ color: "gray.400" }}>
            Deskripsi
          </Table.ColumnHeader>
          <Table.ColumnHeader py={3.5} px={5} fontWeight="medium" fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wide" _dark={{ color: "gray.400" }}>
            Kategori
          </Table.ColumnHeader>
          <Table.ColumnHeader py={3.5} px={5} fontWeight="medium" fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wide" _dark={{ color: "gray.400" }}>
            Jumlah
          </Table.ColumnHeader>
          <Table.ColumnHeader py={3.5} px={5} fontWeight="medium" fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wide" _dark={{ color: "gray.400" }}>
            Tanggal
          </Table.ColumnHeader>
          <Table.ColumnHeader py={3.5} px={5} fontWeight="medium" fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wide" textAlign="right" _dark={{ color: "gray.400" }}>
            Aksi
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {transactions.map((transaction, index) => (
          <Table.Row
            key={transaction.id}
            borderBottom={index < transactions.length - 1 ? "1px solid" : "none"}
            borderColor="gray.100"
            transition="background 0.15s ease"
            _hover={{ bg: "gray.50" }}
            _dark={{ borderColor: "gray.700", _hover: { bg: "gray.700/50" } }}
          >
            <Table.Cell py={4} px={5}>
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
                <VStack align="flex-start" gap={0}>
                  <Text fontWeight="medium" fontSize="sm" color="gray.900" _dark={{ color: "white" }}>
                    {transaction.description}
                  </Text>
                  {transaction.note && (
                    <Text fontSize="xs" color="gray.500">
                      {transaction.note}
                    </Text>
                  )}
                </VStack>
              </HStack>
            </Table.Cell>
            <Table.Cell py={4} px={5}>
              <VStack align="flex-start" gap={1}>
                <Badge
                  size="sm"
                  variant="subtle"
                  colorPalette={transaction.type === "income" ? "green" : "gray"}
                  borderRadius="md"
                >
                  {transaction.category}
                </Badge>
                {transaction.budget && (
                  <Text fontSize="xs" color="gray.400">
                    {transaction.budget}
                  </Text>
                )}
              </VStack>
            </Table.Cell>
            <Table.Cell py={4} px={5}>
              <Text
                fontWeight="semibold"
                fontSize="sm"
                color={transaction.type === "income" ? "green.600" : "gray.900"}
                _dark={{
                  color: transaction.type === "income" ? "green.400" : "white",
                }}
              >
                {transaction.type === "income" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </Text>
            </Table.Cell>
            <Table.Cell py={4} px={5}>
              <Text fontSize="sm" color="gray.500">
                {formatDate(transaction.date)}
              </Text>
            </Table.Cell>
            <Table.Cell py={4} px={5}>
              <HStack justify="flex-end" gap={0.5}>
                <IconButton
                  aria-label="Edit"
                  variant="ghost"
                  size="sm"
                  color="gray.500"
                  _hover={{ color: "blue.600", bg: "blue.50" }}
                  _dark={{ _hover: { color: "blue.400", bg: "blue.900/50" } }}
                >
                  <LuPencil size={16} />
                </IconButton>
                <IconButton
                  aria-label="Delete"
                  variant="ghost"
                  size="sm"
                  color="gray.500"
                  _hover={{ color: "red.600", bg: "red.50" }}
                  _dark={{ _hover: { color: "red.400", bg: "red.900/50" } }}
                >
                  <LuTrash2 size={16} />
                </IconButton>
              </HStack>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
