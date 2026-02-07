"use client";

import { Box, Flex, VStack, Text, HStack, Image } from "@chakra-ui/react";
import { LuPiggyBank, LuShield, LuTrendingUp, LuTarget } from "react-icons/lu";
import { ColorModeButton } from "@/components/ui/color-mode";

const features = [
  { icon: LuPiggyBank, text: "Kelola tabungan dengan mudah" },
  { icon: LuShield, text: "Data aman dan terenkripsi" },
  { icon: LuTrendingUp, text: "Pantau perkembangan keuangan" },
  { icon: LuTarget, text: "Capai target finansial Anda" },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex minH="100vh">
      {/* Left Panel - Hidden on mobile */}
      <Box
        display={{ base: "none", lg: "flex" }}
        w="45%"
        bg="teal.600"
        position="relative"
        overflow="hidden"
      >
        {/* Background Pattern */}
        <Box
          position="absolute"
          inset={0}
          opacity={0.1}
          bgImage="radial-gradient(circle at 25% 25%, white 2%, transparent 2%), radial-gradient(circle at 75% 75%, white 2%, transparent 2%)"
          bgSize="60px 60px"
        />
        
        {/* Gradient Overlay */}
        <Box
          position="absolute"
          inset={0}
          bgGradient="to-br"
          gradientFrom="teal.600"
          gradientVia="teal.700"
          gradientTo="teal.800"
          opacity={0.9}
        />

        {/* Content */}
        <Flex
          position="relative"
          direction="column"
          justify="center"
          align="flex-start"
          p={12}
          color="white"
          w="full"
        >
          {/* Logo */}
          <HStack gap={3} mb={12}>
            <Box p={2.5} bg="whiteAlpha.200" borderRadius="xl">
              <LuPiggyBank size={28} />
            </Box>
            <Text fontSize="2xl" fontWeight="bold">
              Tabunganku
            </Text>
          </HStack>

          {/* Tagline */}
          <VStack align="flex-start" gap={4} mb={12}>
            <Text fontSize="4xl" fontWeight="bold" lineHeight="shorter">
              Mulai Kelola Keuangan Anda dengan Mudah
            </Text>
            <Text fontSize="lg" opacity={0.9} maxW="md">
              Aplikasi manajemen tabungan yang membantu Anda mencapai tujuan finansial dengan cara yang sederhana dan efektif.
            </Text>
          </VStack>

          {/* Features */}
          <VStack align="flex-start" gap={4}>
            {features.map((feature, index) => (
              <HStack key={index} gap={3}>
                <Box p={2} bg="whiteAlpha.200" borderRadius="lg">
                  <feature.icon size={18} />
                </Box>
                <Text fontSize="sm" fontWeight="medium">
                  {feature.text}
                </Text>
              </HStack>
            ))}
          </VStack>

          {/* Footer */}
          <Text
            position="absolute"
            bottom={8}
            left={12}
            fontSize="sm"
            opacity={0.7}
          >
            © 2024 Tabunganku. All rights reserved.
          </Text>
        </Flex>
      </Box>

      {/* Right Panel - Form */}
      <Flex
        flex={1}
        direction="column"
        bg="gray.50"
        _dark={{ bg: "gray.900" }}
      >
        {/* Header with theme toggle */}
        <Flex justify="flex-end" p={4}>
          <ColorModeButton />
        </Flex>

        {/* Form Container */}
        <Flex
          flex={1}
          align="center"
          justify="center"
          px={{ base: 4, md: 8 }}
          py={8}
        >
          <Box w="full" maxW="md">
            {children}
          </Box>
        </Flex>

        {/* Mobile Footer */}
        <Text
          display={{ base: "block", lg: "none" }}
          textAlign="center"
          fontSize="xs"
          color="gray.500"
          pb={6}
        >
          © 2024 Tabunganku. All rights reserved.
        </Text>
      </Flex>
    </Flex>
  );
}
