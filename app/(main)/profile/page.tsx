"use client";

import {
  Box,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Button,
  Avatar,
  Input,
  Separator,
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
    <Box>
      <Header title="Profile" />

      <Box p={{ base: 4, md: 6 }}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
          {/* Profile Card */}
          <Box
            bg="white"
            borderRadius="2xl"
            p={6}
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.100"
            _dark={{ bg: "gray.800", borderColor: "gray.700" }}
          >
            {/* Profile Header */}
            <VStack gap={4} mb={6}>
              <Box position="relative">
                <Avatar.Root size="2xl">
                  <Avatar.Fallback 
                    name="John Doe" 
                    bg="teal.500" 
                    color="white"
                    fontSize="2xl"
                  />
                </Avatar.Root>
                <Box
                  position="absolute"
                  bottom={0}
                  right={0}
                  bg="teal.500"
                  color="white"
                  p={2}
                  borderRadius="full"
                  cursor="pointer"
                  _hover={{ bg: "teal.600" }}
                >
                  <LuPencil size={14} />
                </Box>
              </Box>
              <VStack gap={0}>
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  color="gray.800"
                  _dark={{ color: "white" }}
                >
                  John Doe
                </Text>
                <Text fontSize="sm" color="gray.500">
                  @johndoe
                </Text>
              </VStack>
              <HStack gap={6}>
                <VStack gap={0}>
                  <Text fontWeight="bold" color="gray.800" _dark={{ color: "white" }}>
                    12
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Tabungan
                  </Text>
                </VStack>
                <Separator orientation="vertical" h={10} />
                <VStack gap={0}>
                  <Text fontWeight="bold" color="gray.800" _dark={{ color: "white" }}>
                    8
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Budget
                  </Text>
                </VStack>
                <Separator orientation="vertical" h={10} />
                <VStack gap={0}>
                  <Text fontWeight="bold" color="gray.800" _dark={{ color: "white" }}>
                    156
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Transaksi
                  </Text>
                </VStack>
              </HStack>
            </VStack>

            <Separator mb={6} />

            {/* Profile Info */}
            <VStack gap={4} align="stretch">
              <HStack justify="space-between">
                <Text fontWeight="semibold" color="gray.800" _dark={{ color: "white" }}>
                  Informasi Pribadi
                </Text>
                <Button variant="ghost" size="sm" colorPalette="teal">
                  <LuPencil size={14} />
                  Edit
                </Button>
              </HStack>

              {profileData.map((field, index) => (
                <HStack
                  key={index}
                  p={4}
                  bg="gray.50"
                  borderRadius="xl"
                  _dark={{ bg: "gray.700" }}
                >
                  <Box
                    p={2}
                    bg="teal.50"
                    color="teal.500"
                    borderRadius="lg"
                    _dark={{ bg: "teal.900", color: "teal.200" }}
                  >
                    <field.icon size={18} />
                  </Box>
                  <VStack align="flex-start" gap={0} flex={1}>
                    <Text fontSize="xs" color="gray.500">
                      {field.label}
                    </Text>
                    <Text fontSize="sm" fontWeight="medium" color="gray.800" _dark={{ color: "white" }}>
                      {field.value}
                    </Text>
                  </VStack>
                </HStack>
              ))}
            </VStack>
          </Box>

          {/* Settings Card */}
          <VStack gap={6} align="stretch">
            <Box
              bg="white"
              borderRadius="2xl"
              p={6}
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.100"
              _dark={{ bg: "gray.800", borderColor: "gray.700" }}
            >
              <Text
                fontWeight="semibold"
                color="gray.800"
                _dark={{ color: "white" }}
                mb={4}
              >
                Pengaturan
              </Text>

              <VStack gap={2} align="stretch">
                {settingsItems.map((item, index) => (
                  <HStack
                    key={index}
                    p={4}
                    borderRadius="xl"
                    cursor="pointer"
                    transition="all 0.2s ease"
                    _hover={{ bg: "gray.50" }}
                    _dark={{ _hover: { bg: "gray.700" } }}
                  >
                    <Box
                      p={2}
                      bg={`${item.color}.50`}
                      color={`${item.color}.500`}
                      borderRadius="lg"
                      _dark={{
                        bg: `${item.color}.900`,
                        color: `${item.color}.200`,
                      }}
                    >
                      <item.icon size={20} />
                    </Box>
                    <VStack align="flex-start" gap={0} flex={1}>
                      <Text
                        fontSize="sm"
                        fontWeight="medium"
                        color="gray.800"
                        _dark={{ color: "white" }}
                      >
                        {item.label}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {item.description}
                      </Text>
                    </VStack>
                    <LuChevronRight size={18} color="gray" />
                  </HStack>
                ))}
              </VStack>
            </Box>

            {/* Member Since */}
            <Box
              bg="white"
              borderRadius="2xl"
              p={6}
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.100"
              _dark={{ bg: "gray.800", borderColor: "gray.700" }}
            >
              <Text
                fontWeight="semibold"
                color="gray.800"
                _dark={{ color: "white" }}
                mb={4}
              >
                Keanggotaan
              </Text>
              <Box
                p={4}
                bg="linear-gradient(135deg, #319795 0%, #2C7A7B 100%)"
                borderRadius="xl"
                color="white"
              >
                <Text fontSize="sm" opacity={0.9}>
                  Member sejak
                </Text>
                <Text fontSize="lg" fontWeight="bold">
                  Januari 2024
                </Text>
                <Text fontSize="xs" opacity={0.8} mt={2}>
                  Akun aktif • 1 bulan
                </Text>
              </Box>
            </Box>

            {/* Logout Button */}
            <Button
              variant="outline"
              colorPalette="red"
              size="lg"
              borderRadius="xl"
              w="full"
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
