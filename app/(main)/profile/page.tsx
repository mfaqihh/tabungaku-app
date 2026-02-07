"use client";

import {
  Box,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Button,
  Avatar,
  Separator,
  Flex,
} from "@chakra-ui/react";
import { Header } from "@/components/layout";
import {
  LuUser,
  LuMail,
  LuPhone,
  LuMapPin,
  LuPencil,
  LuShield,
  LuBell,
  LuPalette,
  LuLogOut,
  LuChevronRight,
  LuCalendar,
  LuCreditCard,
} from "react-icons/lu";

interface ProfileField {
  label: string;
  value: string;
  icon: React.ElementType;
}

const profileData: ProfileField[] = [
  { label: "Nama Lengkap", value: "John Doe", icon: LuUser },
  { label: "Email", value: "john.doe@email.com", icon: LuMail },
  { label: "No. Telepon", value: "+62 812 3456 7890", icon: LuPhone },
  { label: "Alamat", value: "Jakarta, Indonesia", icon: LuMapPin },
];

interface SettingItem {
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const settingsItems: SettingItem[] = [
  {
    label: "Keamanan",
    description: "Password, autentikasi dua faktor",
    icon: LuShield,
    color: "blue",
  },
  {
    label: "Notifikasi",
    description: "Atur preferensi notifikasi",
    icon: LuBell,
    color: "orange",
  },
  {
    label: "Tampilan",
    description: "Tema, bahasa, mata uang",
    icon: LuPalette,
    color: "purple",
  },
];

export default function ProfilePage() {
  return (
    <Box minH="100vh">
      <Header title="Profile" />

      <Box p={{ base: 4, md: 6 }} maxW="1600px" mx="auto">
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
          {/* Profile Card */}
          <Box
            bg="white"
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.200"
            overflow="hidden"
            _dark={{ bg: "gray.800", borderColor: "gray.700" }}
          >
            {/* Profile Header */}
            <Box
              bg="teal.600"
              px={6}
              pt={8}
              pb={12}
              position="relative"
            >
              <Flex justify="flex-end">
                <Button
                  size="xs"
                  variant="ghost"
                  color="white"
                  _hover={{ bg: "whiteAlpha.200" }}
                >
                  <LuPencil size={14} />
                  Edit
                </Button>
              </Flex>
            </Box>
            
            <VStack gap={4} px={6} pb={6} mt={-10}>
              <Avatar.Root size="2xl" borderWidth={4} borderColor="white" _dark={{ borderColor: "gray.800" }}>
                <Avatar.Fallback 
                  name="John Doe" 
                  bg="teal.500" 
                  color="white"
                  fontSize="2xl"
                  fontWeight="bold"
                />
              </Avatar.Root>
              
              <VStack gap={0.5}>
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="gray.900"
                  _dark={{ color: "white" }}
                >
                  John Doe
                </Text>
                <Text fontSize="sm" color="gray.500">
                  @johndoe
                </Text>
              </VStack>

              <HStack gap={8} py={2}>
                <VStack gap={0}>
                  <Text fontWeight="bold" fontSize="lg" color="gray.900" _dark={{ color: "white" }}>
                    5
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Tabungan
                  </Text>
                </VStack>
                <Separator orientation="vertical" h={10} />
                <VStack gap={0}>
                  <Text fontWeight="bold" fontSize="lg" color="gray.900" _dark={{ color: "white" }}>
                    8
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Budget
                  </Text>
                </VStack>
                <Separator orientation="vertical" h={10} />
                <VStack gap={0}>
                  <Text fontWeight="bold" fontSize="lg" color="gray.900" _dark={{ color: "white" }}>
                    156
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Transaksi
                  </Text>
                </VStack>
              </HStack>
            </VStack>

            <Separator />

            {/* Profile Info */}
            <VStack gap={0} align="stretch" p={5}>
              <Flex justify="space-between" align="center" mb={4}>
                <Text fontSize="sm" fontWeight="semibold" color="gray.900" _dark={{ color: "white" }}>
                  Informasi Pribadi
                </Text>
                <Button variant="ghost" size="xs" colorPalette="teal">
                  <LuPencil size={12} />
                  Edit
                </Button>
              </Flex>

              <VStack gap={2} align="stretch">
                {profileData.map((field, index) => (
                  <Flex
                    key={index}
                    align="center"
                    gap={3}
                    p={3}
                    bg="gray.50"
                    borderRadius="lg"
                    _dark={{ bg: "gray.700" }}
                  >
                    <Box
                      p={2}
                      bg="teal.50"
                      color="teal.600"
                      borderRadius="lg"
                      _dark={{ bg: "teal.900/50", color: "teal.300" }}
                    >
                      <field.icon size={16} />
                    </Box>
                    <VStack align="flex-start" gap={0} flex={1}>
                      <Text fontSize="xs" color="gray.500">
                        {field.label}
                      </Text>
                      <Text fontSize="sm" fontWeight="medium" color="gray.900" _dark={{ color: "white" }}>
                        {field.value}
                      </Text>
                    </VStack>
                  </Flex>
                ))}
              </VStack>
            </VStack>
          </Box>

          {/* Right Column */}
          <VStack gap={6} align="stretch">
            {/* Settings Card */}
            <Box
              bg="white"
              borderRadius="xl"
              border="1px solid"
              borderColor="gray.200"
              overflow="hidden"
              _dark={{ bg: "gray.800", borderColor: "gray.700" }}
            >
              <Box px={5} py={4} borderBottom="1px solid" borderColor="gray.100" _dark={{ borderColor: "gray.700" }}>
                <Text fontSize="sm" fontWeight="semibold" color="gray.900" _dark={{ color: "white" }}>
                  Pengaturan
                </Text>
              </Box>

              <VStack gap={0} align="stretch">
                {settingsItems.map((item, index) => (
                  <Flex
                    key={index}
                    align="center"
                    gap={3}
                    px={5}
                    py={3.5}
                    cursor="pointer"
                    transition="background 0.15s ease"
                    borderBottom={index < settingsItems.length - 1 ? "1px solid" : "none"}
                    borderColor="gray.100"
                    _hover={{ bg: "gray.50" }}
                    _dark={{ borderColor: "gray.700", _hover: { bg: "gray.700/50" } }}
                  >
                    <Box
                      p={2}
                      bg={`${item.color}.50`}
                      color={`${item.color}.600`}
                      borderRadius="lg"
                      _dark={{
                        bg: `${item.color}.900/50`,
                        color: `${item.color}.300`,
                      }}
                    >
                      <item.icon size={18} />
                    </Box>
                    <VStack align="flex-start" gap={0} flex={1}>
                      <Text
                        fontSize="sm"
                        fontWeight="medium"
                        color="gray.900"
                        _dark={{ color: "white" }}
                      >
                        {item.label}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {item.description}
                      </Text>
                    </VStack>
                    <Box color="gray.400">
                      <LuChevronRight size={16} />
                    </Box>
                  </Flex>
                ))}
              </VStack>
            </Box>

            {/* Membership Card */}
            <Box
              bg="white"
              borderRadius="xl"
              border="1px solid"
              borderColor="gray.200"
              overflow="hidden"
              _dark={{ bg: "gray.800", borderColor: "gray.700" }}
            >
              <Box px={5} py={4} borderBottom="1px solid" borderColor="gray.100" _dark={{ borderColor: "gray.700" }}>
                <Text fontSize="sm" fontWeight="semibold" color="gray.900" _dark={{ color: "white" }}>
                  Keanggotaan
                </Text>
              </Box>

              <Box p={5}>
                <Box
                  p={4}
                  bg="teal.600"
                  borderRadius="lg"
                  color="white"
                >
                  <Flex justify="space-between" align="flex-start" mb={3}>
                    <VStack align="flex-start" gap={0.5}>
                      <Text fontSize="xs" opacity={0.85} textTransform="uppercase" letterSpacing="wide">
                        Member sejak
                      </Text>
                      <Text fontSize="lg" fontWeight="bold">
                        Januari 2024
                      </Text>
                    </VStack>
                    <Box p={2} bg="whiteAlpha.200" borderRadius="lg">
                      <LuCreditCard size={18} />
                    </Box>
                  </Flex>
                  <Flex align="center" gap={2} fontSize="xs" opacity={0.85}>
                    <LuCalendar size={12} />
                    <Text>Akun aktif • 1 bulan</Text>
                  </Flex>
                </Box>
              </Box>
            </Box>

            {/* Logout Button */}
            <Button
              variant="outline"
              colorPalette="red"
              size="lg"
              borderRadius="xl"
              w="full"
              borderColor="red.200"
              color="red.600"
              _hover={{ bg: "red.50", borderColor: "red.300" }}
              _dark={{ borderColor: "red.800", color: "red.400", _hover: { bg: "red.900/30" } }}
            >
              <LuLogOut size={18} />
              Keluar dari Akun
            </Button>
          </VStack>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
