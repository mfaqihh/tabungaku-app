"use client";

import { useState, useEffect } from "react";
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
  Skeleton,
} from "@chakra-ui/react";
import { Header } from "@/components/layout";
import { AddSavingsModal, SavingsCard } from "@/components/tabungan";
import { useSavingsStore } from "@/stores/savingsStore";
import { formatCurrency } from "@/lib/utils/currency";
import { formatDateShort } from "@/lib/utils/formatDate";
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
  LuLayoutGrid,
  LuList,
  LuPackageOpen,
} from "react-icons/lu";
import { toaster } from "@/components/ui/toaster";
import { TOAST_MESSAGES } from "@/constants/toastMessages";

// View mode: table atau card
type ViewMode = "table" | "card";

// Skeleton loader for cards
function SavingsCardSkeleton() {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.200"
      overflow="hidden"
      _dark={{ bg: "gray.800", borderColor: "gray.700" }}
    >
      <Skeleton h={1} />
      <Box p={5}>
        <Flex justify="space-between" mb={4}>
          <HStack gap={3}>
            <Skeleton h={10} w={10} borderRadius="lg" />
            <VStack align="start" gap={1}>
              <Skeleton h={4} w="120px" borderRadius="md" />
              <Skeleton h={3} w="80px" borderRadius="md" />
            </VStack>
          </HStack>
        </Flex>
        <VStack align="stretch" gap={2} mb={4}>
          <Flex justify="space-between">
            <Skeleton h={6} w="140px" borderRadius="md" />
            <Skeleton h={4} w="100px" borderRadius="md" />
          </Flex>
          <Skeleton h={2} w="full" borderRadius="full" />
          <Flex justify="space-between">
            <Skeleton h={3} w="80px" borderRadius="md" />
            <Skeleton h={3} w="100px" borderRadius="md" />
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
}

// Skeleton for summary cards
function SummaryCardSkeleton() {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      p={5}
      border="1px solid"
      borderColor="gray.200"
      _dark={{ bg: "gray.800", borderColor: "gray.700" }}
    >
      <Flex justify="space-between" align="flex-start" mb={3}>
        <Skeleton h={3} w="100px" borderRadius="md" />
        <Skeleton h={9} w={9} borderRadius="lg" />
      </Flex>
      <Skeleton h={7} w="150px" borderRadius="md" mb={1} />
      <Skeleton h={3} w="80px" borderRadius="md" />
    </Box>
  );
}

export default function TabunganPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [searchQuery, setSearchQuery] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Get data dari Zustand store
  const savingsGoals = useSavingsStore((state) => state.savingsGoals);
  const deleteSavings = useSavingsStore((state) => state.deleteSavings);
  
  // Handle hydration untuk localStorage
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  // Filter berdasarkan search query
  const filteredSavings = savingsGoals.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Statistik
  const totalBalance = savingsGoals.reduce((acc, s) => acc + s.currentAmount, 0);
  const berjangkaCount = savingsGoals.filter((s) => s.type === "berjangka").length;
  const regulerCount = savingsGoals.filter((s) => s.type === "reguler").length;
  
  // Handle delete with toast
  const handleDelete = (id: string) => {
    const savings = savingsGoals.find((s) => s.id === id);
    if (confirm("Yakin ingin menghapus tabungan ini?")) {
      deleteSavings(id);
      toaster.create({
        title: TOAST_MESSAGES.savings.deleted.title,
        description: TOAST_MESSAGES.savings.deleted.description(savings?.name || 'Tabungan'),
        type: 'success',
        duration: 3000,
      });
    }
  };
  
  return (
    <Box minH="100vh">
      <Header title="Tabungan" />

      <Box p={{ base: 4, md: 6 }} maxW="1600px" mx="auto">
        {/* Summary Cards */}
        {!isHydrated ? (
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={6}>
            <Box bg="teal.600" borderRadius="xl" p={5}>
              <Flex justify="space-between" align="flex-start" mb={3}>
                <Skeleton h={3} w="100px" borderRadius="md" />
                <Skeleton h={9} w={9} borderRadius="lg" />
              </Flex>
              <Skeleton h={7} w="150px" borderRadius="md" mb={1} />
              <Skeleton h={3} w="80px" borderRadius="md" />
            </Box>
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
          </SimpleGrid>
        ) : (
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
                <Text>{savingsGoals.length} akun tabungan</Text>
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
              <Text fontSize="2xl" fontWeight="bold" color="gray.900" _dark={{ color: "white" }}>
                {berjangkaCount}
              </Text>
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
              <Text fontSize="2xl" fontWeight="bold" color="gray.900" _dark={{ color: "white" }}>
                {regulerCount}
              </Text>
              <Text fontSize="xs" color="gray.500" mt={1}>Akun tabungan</Text>
            </Box>
          </SimpleGrid>
        )}

        {/* Toolbar */}
        <Flex justify="space-between" align="center" mb={4} gap={4} flexWrap="wrap">
          <HStack gap={3}>
            <Box position="relative" w={{ base: "full", sm: "280px" }}>
              <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" color="gray.400" pointerEvents="none">
                <LuSearch size={16} />
              </Box>
              <Input 
                placeholder="Cari tabungan..." 
                pl={9} 
                size="sm" 
                bg="white" 
                borderRadius="lg" 
                borderColor="gray.200" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                _dark={{ bg: "gray.800", borderColor: "gray.700" }}
                _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px var(--chakra-colors-teal-500)" }}
              />
            </Box>
            
            {/* View mode toggle */}
            <HStack gap={1} bg="gray.100" p={1} borderRadius="lg" _dark={{ bg: "gray.700" }}>
              <IconButton
                aria-label="Card view"
                size="sm"
                variant={viewMode === "card" ? "solid" : "ghost"}
                colorPalette={viewMode === "card" ? "teal" : "gray"}
                onClick={() => setViewMode("card")}
                borderRadius="md"
              >
                <LuLayoutGrid size={16} />
              </IconButton>
              <IconButton
                aria-label="Table view"
                size="sm"
                variant={viewMode === "table" ? "solid" : "ghost"}
                colorPalette={viewMode === "table" ? "teal" : "gray"}
                onClick={() => setViewMode("table")}
                borderRadius="md"
              >
                <LuList size={16} />
              </IconButton>
            </HStack>
          </HStack>
          
          <Button
            colorPalette="teal"
            size="sm"
            borderRadius="lg"
            onClick={() => setIsModalOpen(true)}
            _hover={{ transform: "translateY(-1px)", boxShadow: "md" }}
            transition="all 0.2s"
          >
            <LuPlus size={16} />
            Tambah Tabungan
          </Button>
        </Flex>

        {/* Content */}
        {!isHydrated ? (
          /* Skeleton Loading State */
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
            {[...Array(6)].map((_, i) => (
              <SavingsCardSkeleton key={i} />
            ))}
          </SimpleGrid>
        ) : filteredSavings.length === 0 ? (
          /* Empty State */
          <Box 
            textAlign="center" 
            py={16} 
            bg="white" 
            borderRadius="2xl" 
            border="1px dashed" 
            borderColor="gray.200"
            _dark={{ bg: "gray.800", borderColor: "gray.700" }}
          >
            <Box
              w={16}
              h={16}
              mx="auto"
              mb={4}
              borderRadius="full"
              bg="teal.50"
              _dark={{ bg: "teal.900" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {searchQuery ? (
                <LuSearch size={32} color="var(--chakra-colors-teal-500)" />
              ) : (
                <LuPackageOpen size={32} color="var(--chakra-colors-teal-500)" />
              )}
            </Box>
            <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={2} _dark={{ color: "gray.300" }}>
              {searchQuery ? "Tidak ada tabungan ditemukan" : "Belum ada tabungan"}
            </Text>
            <Text fontSize="sm" color="gray.500" mb={6} maxW="350px" mx="auto">
              {searchQuery ? `Tidak ada hasil untuk "${searchQuery}". Coba kata kunci lain.` : "Mulai buat target tabunganmu sekarang dan kelola keuanganmu dengan lebih baik!"}
            </Text>
            {!searchQuery && (
              <Button
                colorPalette="teal"
                onClick={() => setIsModalOpen(true)}
                borderRadius="lg"
                _hover={{ transform: "translateY(-1px)", boxShadow: "md" }}
                transition="all 0.2s"
              >
                <LuPlus size={16} />
                Buat Tabungan Pertama
              </Button>
            )}
          </Box>
        ) : viewMode === "card" ? (
          /* Card View */
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
            {filteredSavings.map((savings) => (
              <SavingsCard
                key={savings.id}
                savings={savings}
                onDelete={handleDelete}
              />
            ))}
          </SimpleGrid>
        ) : (
          /* Table View */
          <Box bg="white" borderRadius="xl" border="1px solid" borderColor="gray.200" _dark={{ bg: "gray.800", borderColor: "gray.700" }}>
            <Box overflowX="auto" css={{ WebkitOverflowScrolling: "touch" }}>
              <Table.Root size="md" style={{ minWidth: "800px" }}>
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
                  {filteredSavings.map((savings, index) => {
                    const progress = Math.round((savings.currentAmount / savings.targetAmount) * 100);
                    return (
                      <Table.Row
                        key={savings.id}
                        borderBottom={index < filteredSavings.length - 1 ? "1px solid" : "none"}
                        borderColor="gray.100"
                        _hover={{ bg: "gray.50" }}
                        _dark={{ borderColor: "gray.700", _hover: { bg: "gray.700" } }}
                        transition="background 0.15s ease"
                      >
                        <Table.Cell py={4} px={5}>
                          <HStack gap={3}>
                            <Box p={2} bg={`${savings.color}20`} borderRadius="lg" fontSize="lg">{savings.icon}</Box>
                            <Text fontWeight="medium" fontSize="sm" color="gray.900" _dark={{ color: "white" }}>{savings.name}</Text>
                          </HStack>
                        </Table.Cell>
                        <Table.Cell py={4} px={5}>
                          <Badge colorPalette={savings.type === "berjangka" ? "purple" : "blue"} variant="subtle" size="sm" borderRadius="md">{savings.type === "berjangka" ? "Berjangka" : "Reguler"}</Badge>
                        </Table.Cell>
                        <Table.Cell py={4} px={5}>
                          <Text fontWeight="semibold" fontSize="sm" color="gray.900" _dark={{ color: "white" }}>{formatCurrency(savings.currentAmount)}</Text>
                        </Table.Cell>
                        <Table.Cell py={4} px={5}>
                          <VStack align="stretch" gap={1} maxW="140px">
                            <Progress.Root value={progress} size="xs" colorPalette="teal">
                              <Progress.Track bg="gray.100" borderRadius="full" _dark={{ bg: "gray.700" }}>
                                <Progress.Range borderRadius="full" bg={savings.color} />
                              </Progress.Track>
                            </Progress.Root>
                            <Text fontSize="xs" color="gray.500">{progress}% dari {formatCurrency(savings.targetAmount)}</Text>
                          </VStack>
                        </Table.Cell>
                        <Table.Cell py={4} px={5}>
                          <Text fontSize="sm" color="gray.500">{formatDateShort(savings.updatedAt)}</Text>
                        </Table.Cell>
                        <Table.Cell py={4} px={5}>
                          <HStack justify="flex-end" gap={0.5}>
                            <IconButton aria-label="View" variant="ghost" size="sm" color="gray.500" _hover={{ color: "gray.700", bg: "gray.100" }} _dark={{ _hover: { color: "white", bg: "gray.700" } }}><LuEye size={16} /></IconButton>
                            <IconButton aria-label="Edit" variant="ghost" size="sm" color="gray.500" _hover={{ color: "blue.600", bg: "blue.50" }} _dark={{ _hover: { color: "blue.400", bg: "blue.900" } }}><LuPencil size={16} /></IconButton>
                            <IconButton aria-label="Delete" variant="ghost" size="sm" color="gray.500" onClick={() => handleDelete(savings.id)} _hover={{ color: "red.600", bg: "red.50" }} _dark={{ _hover: { color: "red.400", bg: "red.900" } }}><LuTrash2 size={16} /></IconButton>
                          </HStack>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Root>
            </Box>
          </Box>
        )}
      </Box>
      
      {/* Modal */}
      <AddSavingsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Box>
  );
}
