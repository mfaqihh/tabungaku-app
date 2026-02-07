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
  Flex,
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
  LuArrowUpRight,
  LuShield,
  LuCoins,
  LuPlane,
  LuSmartphone,
  LuChartLine,
} from "react-icons/lu";
import { ReactNode } from "react";

interface SavingsAccount {
  id: string;
  name: string;
  balance: number;
  target: number;
  type: "regular" | "goal";
  icon: ReactNode;
  lastUpdate: string;
}

const savingsAccounts: SavingsAccount[] = [
  {
    id: "1",
    name: "Dana Darurat",
    balance: 18500000,
    target: 30000000,
    type: "goal",
    icon: <LuShield size={18} />,
    lastUpdate: "2024-02-07",
  },
  {
    id: "2",
    name: "Tabungan Utama",
    balance: 5200000,
    target: 0,
    type: "regular",
    icon: <LuCoins size={18} />,
    lastUpdate: "2024-02-06",
  },
  {
    id: "3",
    name: "Liburan Bali",
    balance: 4200000,
    target: 10000000,
    type: "goal",
    icon: <LuPlane size={18} />,
    lastUpdate: "2024-02-05",
  },
  {
    id: "4",
    name: "Gadget Baru",
    balance: 3750000,
    target: 5000000,
    type: "goal",
    icon: <LuSmartphone size={18} />,
    lastUpdate: "2024-02-04",
  },
  {
    id: "5",
    name: "Investasi",
    balance: 8500000,
    target: 0,
    type: "regular",
    icon: <LuChartLine size={18} />,
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
    <Box minH="100vh">
      <Header title="Tabungan" />

      <Box p={{ base: 4, md: 6 }} maxW="1600px" mx="auto">
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={6}>
          <Box bg="teal.600" borderRadius="xl" p={5} color="white">
            <Flex justify="space-between" align="flex-start" mb={3}>
              <Text fontSize="xs" fontWeight="medium" opacity={0.9} textTransform="uppercase" letterSpacing="wide">
                Total Tabungan
              </Text>
              <Box p={2} bg="whiteAlpha.200" borderRadius="lg">
                <LuPiggyBank size={18} />
              </Box>
            </Flex>
            <Text fontSize="2xl" fontWeight="bold" mb={1}>
              {formatCurrency(totalBalance)}
            </Text>
            <HStack gap={1} fontSize="xs" opacity={0.85}>
              <LuArrowUpRight size={14} />
              <Text>{savingsAccounts.length} akun tabungan</Text>
            </HStack>
          </Box>

          <Box bg="white" borderRadius="xl" p={5} border="1px solid" borderColor="gray.200" _dark={{ bg: "gray.800", borderColor: "gray.700" }}>
            <Flex justify="space-between" align="flex-start" mb={3}>
              <Text fontSize="xs" fontWeight="medium" color="gray.500" textTransform="uppercase" letterSpacing="wide" _dark={{ color: "gray.400" }}>
                Tabungan Berjangka
              </Text>
              <Box p={2} bg="purple.50" color="purple.600" borderRadius="lg" _dark={{ bg: "purple.900", color: "purple.300" }}>
                <LuTarget size={18} />
              </Box>
            </Flex>
            <Text fontSize="2xl" fontWeight="bold" color="gray.900" _dark={{ color: "white" }}>{goalAccounts.length}</Text>
            <Text fontSize="xs" color="gray.500" mt={1}>Target aktif</Text>
          </Box>

          <Box bg="white" borderRadius="xl" p={5} border="1px solid" borderColor="gray.200" _dark={{ bg: "gray.800", borderColor: "gray.700" }}>
            <Flex justify="space-between" align="flex-start" mb={3}>
              <Text fontSize="xs" fontWeight="medium" color="gray.500" textTransform="uppercase" letterSpacing="wide" _dark={{ color: "gray.400" }}>
                Tabungan Reguler
              </Text>
              <Box p={2} bg="blue.50" color="blue.600" borderRadius="lg" _dark={{ bg: "blue.900", color: "blue.300" }}>
                <LuTrendingUp size={18} />
              </Box>
            </Flex>
            <Text fontSize="2xl" fontWeight="bold" color="gray.900" _dark={{ color: "white" }}>{regularAccounts.length}</Text>
            <Text fontSize="xs" color="gray.500" mt={1}>Akun tabungan</Text>
          </Box>
        </SimpleGrid>

        <Flex justify="space-between" align="center" mb={4} gap={4} flexWrap="wrap">
          <Box position="relative" w={{ base: "full", sm: "280px" }}>
            <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" color="gray.400" pointerEvents="none">
              <LuSearch size={16} />
            </Box>
            <Input placeholder="Cari tabungan..." pl={9} size="sm" bg="white" borderRadius="lg" borderColor="gray.200" _dark={{ bg: "gray.800", borderColor: "gray.700" }} />
          </Box>
          <Button colorPalette="teal" size="sm" borderRadius="lg">
            <LuPlus size={16} />
            Tambah Tabungan
          </Button>
        </Flex>

        <Box bg="white" borderRadius="xl" border="1px solid" borderColor="gray.200" overflow="hidden" _dark={{ bg: "gray.800", borderColor: "gray.700" }}>
          <Table.Root size="md">
            <Table.Header>
              <Table.Row bg="gray.50" _dark={{ bg: "gray.800" }}>
                <Table.ColumnHeader py={3.5} px={5} fontWeight="medium" fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wide" _dark={{ color: "gray.400" }}>Nama Tabungan</Table.ColumnHeader>
                <Table.ColumnHeader py={3.5} px={5} fontWeight="medium" fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wide" _dark={{ color: "gray.400" }}>Tipe</Table.ColumnHeader>
                <Table.ColumnHeader py={3.5} px={5} fontWeight="medium" fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wide" _dark={{ color: "gray.400" }}>Saldo</Table.ColumnHeader>
                <Table.ColumnHeader py={3.5} px={5} fontWeight="medium" fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wide" _dark={{ color: "gray.400" }}>Progress</Table.ColumnHeader>
                <Table.ColumnHeader py={3.5} px={5} fontWeight="medium" fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wide" _dark={{ color: "gray.400" }}>Update Terakhir</Table.ColumnHeader>
                <Table.ColumnHeader py={3.5} px={5} fontWeight="medium" fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wide" textAlign="right" _dark={{ color: "gray.400" }}>Aksi</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {savingsAccounts.map((account, index) => {
                const progress = account.target > 0 ? Math.round((account.balance / account.target) * 100) : null;
                return (
                  <Table.Row key={account.id} borderBottom={index < savingsAccounts.length - 1 ? "1px solid" : "none"} borderColor="gray.100" _hover={{ bg: "gray.50" }} _dark={{ borderColor: "gray.700", _hover: { bg: "gray.700" } }}>
                    <Table.Cell py={4} px={5}>
                      <HStack gap={3}>
                        <Box p={2} bg="teal.50" color="teal.600" borderRadius="lg" _dark={{ bg: "teal.900", color: "teal.300" }}>{account.icon}</Box>
                        <Text fontWeight="medium" fontSize="sm" color="gray.900" _dark={{ color: "white" }}>{account.name}</Text>
                      </HStack>
                    </Table.Cell>
                    <Table.Cell py={4} px={5}>
                      <Badge colorPalette={account.type === "goal" ? "purple" : "blue"} variant="subtle" size="sm" borderRadius="md">{account.type === "goal" ? "Berjangka" : "Reguler"}</Badge>
                    </Table.Cell>
                    <Table.Cell py={4} px={5}>
                      <Text fontWeight="semibold" fontSize="sm" color="gray.900" _dark={{ color: "white" }}>{formatCurrency(account.balance)}</Text>
                    </Table.Cell>
                    <Table.Cell py={4} px={5}>
                      {progress !== null ? (
                        <VStack align="stretch" gap={1} maxW="140px">
                          <Progress.Root value={progress} size="xs" colorPalette="teal">
                            <Progress.Track bg="gray.100" borderRadius="full" _dark={{ bg: "gray.700" }}>
                              <Progress.Range borderRadius="full" />
                            </Progress.Track>
                          </Progress.Root>
                          <Text fontSize="xs" color="gray.500">{progress}% dari {formatCurrency(account.target)}</Text>
                        </VStack>
                      ) : <Text fontSize="xs" color="gray.400">—</Text>}
                    </Table.Cell>
                    <Table.Cell py={4} px={5}><Text fontSize="sm" color="gray.500">{formatDate(account.lastUpdate)}</Text></Table.Cell>
                    <Table.Cell py={4} px={5}>
                      <HStack justify="flex-end" gap={0.5}>
                        <IconButton aria-label="View" variant="ghost" size="sm" color="gray.500" _hover={{ color: "gray.700", bg: "gray.100" }} _dark={{ _hover: { color: "white", bg: "gray.700" } }}><LuEye size={16} /></IconButton>
                        <IconButton aria-label="Edit" variant="ghost" size="sm" color="gray.500" _hover={{ color: "blue.600", bg: "blue.50" }} _dark={{ _hover: { color: "blue.400", bg: "blue.900" } }}><LuPencil size={16} /></IconButton>
                        <IconButton aria-label="Delete" variant="ghost" size="sm" color="gray.500" _hover={{ color: "red.600", bg: "red.50" }} _dark={{ _hover: { color: "red.400", bg: "red.900" } }}><LuTrash2 size={16} /></IconButton>
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
