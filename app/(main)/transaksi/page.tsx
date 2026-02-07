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
    <Box>
      <Header title="Transaksi" />

      <Box p={{ base: 4, md: 6 }}>
        {/* Summary Cards */}
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={6}>
          <Box
            bg="white"
            borderRadius="2xl"
            p={6}
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.100"
            _dark={{ bg: "gray.800", borderColor: "gray.700" }}
          >
            <HStack justify="space-between" mb={3}>
              <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
                Total Pemasukan
              </Text>
              <Box
                p={2}
                bg="green.50"
                color="green.500"
                borderRadius="lg"
                _dark={{ bg: "green.900", color: "green.200" }}
              >
                <LuArrowDownLeft size={18} />
              </Box>
            </HStack>
            <Text fontSize="xl" fontWeight="bold" color="green.500">
              {formatCurrency(totalIncome)}
            </Text>
          </Box>

          <Box
            bg="white"
            borderRadius="2xl"
            p={6}
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.100"
            _dark={{ bg: "gray.800", borderColor: "gray.700" }}
          >
            <HStack justify="space-between" mb={3}>
              <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
                Total Pengeluaran
              </Text>
              <Box
                p={2}
                bg="red.50"
                color="red.500"
                borderRadius="lg"
                _dark={{ bg: "red.900", color: "red.200" }}
              >
                <LuArrowUpRight size={18} />
              </Box>
            </HStack>
            <Text fontSize="xl" fontWeight="bold" color="red.500">
              {formatCurrency(totalExpense)}
            </Text>
          </Box>

          <Box
            bg="linear-gradient(135deg, #319795 0%, #2C7A7B 100%)"
            borderRadius="2xl"
            p={6}
            color="white"
          >
            <HStack justify="space-between" mb={3}>
              <Text fontSize="sm" opacity={0.9}>
                Saldo Bersih
              </Text>
            </HStack>
            <Text fontSize="xl" fontWeight="bold">
              {formatCurrency(balance)}
            </Text>
          </Box>
        </SimpleGrid>

        {/* Tabs & Actions */}
        <Box
          bg="white"
          borderRadius="2xl"
          boxShadow="sm"
          border="1px solid"
          borderColor="gray.100"
          overflow="hidden"
          _dark={{ bg: "gray.800", borderColor: "gray.700" }}
        >
          <Tabs.Root defaultValue="all" variant="line">
            <Box
              px={6}
              pt={4}
              borderBottom="1px solid"
              borderColor="gray.100"
              _dark={{ borderColor: "gray.700" }}
            >
              <HStack justify="space-between" flexWrap="wrap" gap={4}>
                <Tabs.List border="none">
                  <Tabs.Trigger
                    value="all"
                    px={4}
                    py={2}
                    fontSize="sm"
                    fontWeight="medium"
                    _selected={{ color: "teal.500", borderColor: "teal.500" }}
                  >
                    Semua
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="income"
                    px={4}
                    py={2}
                    fontSize="sm"
                    fontWeight="medium"
                    _selected={{ color: "green.500", borderColor: "green.500" }}
                  >
                    Pemasukan
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="expense"
                    px={4}
                    py={2}
                    fontSize="sm"
                    fontWeight="medium"
                    _selected={{ color: "red.500", borderColor: "red.500" }}
                  >
                    Pengeluaran
                  </Tabs.Trigger>
                </Tabs.List>

                <HStack gap={2}>
                  <Box position="relative" maxW="250px">
                    <Box
                      position="absolute"
                      left={3}
                      top="50%"
                      transform="translateY(-50%)"
                      color="gray.400"
                    >
                      <LuSearch size={16} />
                    </Box>
                    <Input
                      placeholder="Cari transaksi..."
                      pl={9}
                      size="sm"
                      borderRadius="lg"
                      bg="gray.50"
                      _dark={{ bg: "gray.700" }}
                    />
                  </Box>
                  <IconButton aria-label="Filter" variant="outline" size="sm">
                    <LuFilter size={16} />
                  </IconButton>
                  <IconButton aria-label="Export" variant="outline" size="sm">
                    <LuDownload size={16} />
                  </IconButton>
                  <Button colorPalette="teal" size="sm" borderRadius="lg">
                    <LuPlus size={16} />
                    Tambah
                  </Button>
                </HStack>
              </HStack>
            </Box>

            <Tabs.Content value="all" p={0}>
              <TransactionTable transactions={transactions} />
            </Tabs.Content>
            <Tabs.Content value="income" p={0}>
              <TransactionTable
                transactions={transactions.filter((t) => t.type === "income")}
              />
            </Tabs.Content>
            <Tabs.Content value="expense" p={0}>
              <TransactionTable
                transactions={transactions.filter((t) => t.type === "expense")}
              />
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Box>
    </Box>
  );
}

function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  return (
    <Table.Root size="md">
      <Table.Header>
        <Table.Row bg="gray.50" _dark={{ bg: "gray.700" }}>
          <Table.ColumnHeader fontWeight="semibold" color="gray.600" _dark={{ color: "gray.300" }}>
            Deskripsi
          </Table.ColumnHeader>
          <Table.ColumnHeader fontWeight="semibold" color="gray.600" _dark={{ color: "gray.300" }}>
            Kategori
          </Table.ColumnHeader>
          <Table.ColumnHeader fontWeight="semibold" color="gray.600" _dark={{ color: "gray.300" }}>
            Jumlah
          </Table.ColumnHeader>
          <Table.ColumnHeader fontWeight="semibold" color="gray.600" _dark={{ color: "gray.300" }}>
            Tanggal
          </Table.ColumnHeader>
          <Table.ColumnHeader fontWeight="semibold" color="gray.600" _dark={{ color: "gray.300" }} textAlign="center">
            Aksi
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {transactions.map((transaction) => (
          <Table.Row
            key={transaction.id}
            _hover={{ bg: "gray.50" }}
            _dark={{ _hover: { bg: "gray.700" } }}
          >
            <Table.Cell>
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
                    <LuArrowDownLeft size={16} />
                  ) : (
                    <LuArrowUpRight size={16} />
                  )}
                </Box>
                <VStack align="flex-start" gap={0}>
                  <Text fontWeight="medium" fontSize="sm" color="gray.800" _dark={{ color: "white" }}>
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
            <Table.Cell>
              <VStack align="flex-start" gap={1}>
                <Badge
                  size="sm"
                  variant="subtle"
                  colorPalette={transaction.type === "income" ? "green" : "gray"}
                >
                  {transaction.category}
                </Badge>
                {transaction.budget && (
                  <Text fontSize="xs" color="gray.500">
                    Budget: {transaction.budget}
                  </Text>
                )}
              </VStack>
            </Table.Cell>
            <Table.Cell>
              <Text
                fontWeight="semibold"
                fontSize="sm"
                color={transaction.type === "income" ? "green.500" : "red.500"}
              >
                {transaction.type === "income" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </Text>
            </Table.Cell>
            <Table.Cell>
              <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
                {formatDate(transaction.date)}
              </Text>
            </Table.Cell>
            <Table.Cell>
              <HStack justify="center" gap={1}>
                <IconButton
                  aria-label="Edit"
                  variant="ghost"
                  size="sm"
                  colorPalette="blue"
                >
                  <LuPencil size={16} />
                </IconButton>
                <IconButton
                  aria-label="Delete"
                  variant="ghost"
                  size="sm"
                  colorPalette="red"
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
