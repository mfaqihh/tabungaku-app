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
  Progress,
} from "@chakra-ui/react";
import { Header } from "@/components/layout";
import {
  LuPlus,
  LuPiggyBank,
  LuTarget,
  LuTrendingUp,
  LuPencil,
  LuTrash2,
  LuEye,
  LuSearch,
} from "react-icons/lu";

interface SavingsAccount {
  id: string;
  name: string;
  balance: number;
  target: number;
  type: "regular" | "goal";
  icon: string;
  lastUpdate: string;
}

const savingsAccounts: SavingsAccount[] = [
  {
    id: "1",
    name: "Dana Darurat",
    balance: 18500000,
    target: 30000000,
    type: "goal",
    icon: "🛡️",
    lastUpdate: "2024-02-07",
  },
  {
    id: "2",
    name: "Tabungan Utama",
    balance: 5200000,
    target: 0,
    type: "regular",
    icon: "💰",
    lastUpdate: "2024-02-06",
  },
  {
    id: "3",
    name: "Liburan Bali",
    balance: 4200000,
    target: 10000000,
    type: "goal",
    icon: "✈️",
    lastUpdate: "2024-02-05",
  },
  {
    id: "4",
    name: "Gadget Baru",
    balance: 3750000,
    target: 5000000,
    type: "goal",
    icon: "📱",
    lastUpdate: "2024-02-04",
  },
  {
    id: "5",
    name: "Investasi",
    balance: 8500000,
    target: 0,
    type: "regular",
    icon: "📈",
    lastUpdate: "2024-02-03",
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

export default function TabunganPage() {
  const totalBalance = savingsAccounts.reduce((acc, account) => acc + account.balance, 0);
  const goalAccounts = savingsAccounts.filter((a) => a.type === "goal");
  const regularAccounts = savingsAccounts.filter((a) => a.type === "regular");

  return (
    <Box>
      <Header title="Tabungan" />

      <Box p={{ base: 4, md: 6 }}>
        {/* Summary Cards */}
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={6}>
          {/* Total Balance Card */}
          <Box
            bg="linear-gradient(135deg, #319795 0%, #2C7A7B 100%)"
            borderRadius="2xl"
            p={6}
            color="white"
          >
            <HStack justify="space-between" mb={4}>
              <Text fontSize="sm" opacity={0.9}>
                Total Tabungan
              </Text>
              <Box p={2} bg="whiteAlpha.200" borderRadius="lg">
                <LuPiggyBank size={20} />
              </Box>
            </HStack>
            <Text fontSize="2xl" fontWeight="bold">
              {formatCurrency(totalBalance)}
            </Text>
            <Text fontSize="xs" opacity={0.8} mt={1}>
              {savingsAccounts.length} akun tabungan
            </Text>
          </Box>

          {/* Goal Savings */}
          <Box
            bg="white"
            borderRadius="2xl"
            p={6}
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.100"
            _dark={{ bg: "gray.800", borderColor: "gray.700" }}
          >
            <HStack justify="space-between" mb={4}>
              <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
                Tabungan Berjangka
              </Text>
              <Box
                p={2}
                bg="purple.50"
                color="purple.500"
                borderRadius="lg"
                _dark={{ bg: "purple.900", color: "purple.200" }}
              >
                <LuTarget size={20} />
              </Box>
            </HStack>
            <Text fontSize="2xl" fontWeight="bold" color="gray.800" _dark={{ color: "white" }}>
              {goalAccounts.length}
            </Text>
            <Text fontSize="xs" color="gray.500" mt={1}>
              Target aktif
            </Text>
          </Box>

          {/* Regular Savings */}
          <Box
            bg="white"
            borderRadius="2xl"
            p={6}
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.100"
            _dark={{ bg: "gray.800", borderColor: "gray.700" }}
          >
            <HStack justify="space-between" mb={4}>
              <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
                Tabungan Reguler
              </Text>
              <Box
                p={2}
                bg="blue.50"
                color="blue.500"
                borderRadius="lg"
                _dark={{ bg: "blue.900", color: "blue.200" }}
              >
                <LuTrendingUp size={20} />
              </Box>
            </HStack>
            <Text fontSize="2xl" fontWeight="bold" color="gray.800" _dark={{ color: "white" }}>
              {regularAccounts.length}
            </Text>
            <Text fontSize="xs" color="gray.500" mt={1}>
              Akun tabungan
            </Text>
          </Box>
        </SimpleGrid>

        {/* Actions Bar */}
        <HStack justify="space-between" mb={4} flexWrap="wrap" gap={4}>
          <HStack gap={2}>
            <Box position="relative" maxW="300px">
              <Box
                position="absolute"
                left={3}
                top="50%"
                transform="translateY(-50%)"
                color="gray.400"
              >
                <LuSearch size={18} />
              </Box>
              <Input
                placeholder="Cari tabungan..."
                pl={10}
                bg="white"
                borderRadius="lg"
                _dark={{ bg: "gray.800" }}
              />
            </Box>
          </HStack>
          <Button
            colorPalette="teal"
            size="sm"
            borderRadius="lg"
          >
            <LuPlus size={16} />
            Tambah Tabungan
          </Button>
        </HStack>

        {/* Savings Table */}
        <Box
          bg="white"
          borderRadius="2xl"
          boxShadow="sm"
          border="1px solid"
          borderColor="gray.100"
          overflow="hidden"
          _dark={{ bg: "gray.800", borderColor: "gray.700" }}
        >
          <Table.Root size="md">
            <Table.Header>
              <Table.Row bg="gray.50" _dark={{ bg: "gray.700" }}>
                <Table.ColumnHeader fontWeight="semibold" color="gray.600" _dark={{ color: "gray.300" }}>
                  Nama Tabungan
                </Table.ColumnHeader>
                <Table.ColumnHeader fontWeight="semibold" color="gray.600" _dark={{ color: "gray.300" }}>
                  Tipe
                </Table.ColumnHeader>
                <Table.ColumnHeader fontWeight="semibold" color="gray.600" _dark={{ color: "gray.300" }}>
                  Saldo
                </Table.ColumnHeader>
                <Table.ColumnHeader fontWeight="semibold" color="gray.600" _dark={{ color: "gray.300" }}>
                  Progress
                </Table.ColumnHeader>
                <Table.ColumnHeader fontWeight="semibold" color="gray.600" _dark={{ color: "gray.300" }}>
                  Update Terakhir
                </Table.ColumnHeader>
                <Table.ColumnHeader fontWeight="semibold" color="gray.600" _dark={{ color: "gray.300" }} textAlign="center">
                  Aksi
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {savingsAccounts.map((account) => {
                const progress = account.target > 0
                  ? Math.round((account.balance / account.target) * 100)
                  : null;

                return (
                  <Table.Row
                    key={account.id}
                    _hover={{ bg: "gray.50" }}
                    _dark={{ _hover: { bg: "gray.700" } }}
                  >
                    <Table.Cell>
                      <HStack gap={3}>
                        <Text fontSize="xl">{account.icon}</Text>
                        <Text fontWeight="medium" color="gray.800" _dark={{ color: "white" }}>
                          {account.name}
                        </Text>
                      </HStack>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge
                        colorPalette={account.type === "goal" ? "purple" : "blue"}
                        variant="subtle"
                        size="sm"
                      >
                        {account.type === "goal" ? "Berjangka" : "Reguler"}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Text fontWeight="semibold" color="gray.800" _dark={{ color: "white" }}>
                        {formatCurrency(account.balance)}
                      </Text>
                    </Table.Cell>
                    <Table.Cell>
                      {progress !== null ? (
                        <VStack align="stretch" gap={1} maxW="150px">
                          <Progress.Root value={progress} size="sm" colorPalette="teal">
                            <Progress.Track>
                              <Progress.Range />
                            </Progress.Track>
                          </Progress.Root>
                          <Text fontSize="xs" color="gray.500">
                            {progress}% dari {formatCurrency(account.target)}
                          </Text>
                        </VStack>
                      ) : (
                        <Text fontSize="sm" color="gray.400">-</Text>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <Text fontSize="sm" color="gray.500">
                        {formatDate(account.lastUpdate)}
                      </Text>
                    </Table.Cell>
                    <Table.Cell>
                      <HStack justify="center" gap={1}>
                        <IconButton
                          aria-label="View"
                          variant="ghost"
                          size="sm"
                          colorPalette="gray"
                        >
                          <LuEye size={16} />
                        </IconButton>
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
                );
              })}
            </Table.Body>
          </Table.Root>
        </Box>
      </Box>
    </Box>
  );
}
