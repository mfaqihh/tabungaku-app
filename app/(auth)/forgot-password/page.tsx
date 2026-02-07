"use client";

import { VStack, Text, HStack, Separator, Box } from "@chakra-ui/react";
import { useState } from "react";
import { LuMail, LuPiggyBank, LuCircleCheck, LuArrowLeft } from "react-icons/lu";
import Link from "next/link";
import { AuthCard, FormInput, SubmitButton, AuthLink } from "@/components/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitted(true);
    setIsLoading(false);
  };

  if (isSubmitted) {
    return (
      <AuthCard>
        <VStack gap={6} py={4}>
          <Box p={4} bg="teal.50" borderRadius="full" color="teal.600" _dark={{ bg: "teal.900", color: "teal.300" }}>
            <LuCircleCheck size={48} />
          </Box>
          <VStack gap={2} textAlign="center">
            <Text fontSize="xl" fontWeight="bold" color="gray.900" _dark={{ color: "white" }}>
              Email Terkirim!
            </Text>
            <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }} lineHeight="tall">
              Kami telah mengirim instruksi untuk mereset password ke <Text as="span" fontWeight="semibold" color="gray.700" _dark={{ color: "gray.300" }}>{email}</Text>
            </Text>
          </VStack>

          <VStack gap={3} w="full">
            <Text fontSize="xs" color="gray.400" _dark={{ color: "gray.500" }} textAlign="center">
              Tidak menerima email? Periksa folder spam atau coba kirim ulang.
            </Text>
            <Link href="/login" style={{ width: "100%" }}>
              <Box as="button" w="full" display="flex" alignItems="center" justifyContent="center" gap={2} py={3} px={4} borderRadius="xl" bg="teal.500" color="white" fontWeight="semibold" _hover={{ bg: "teal.600" }} transition="all 0.2s">
                <LuArrowLeft size={18} />
                Kembali ke Login
              </Box>
            </Link>
          </VStack>
        </VStack>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      {/* Header */}
      <VStack gap={2} textAlign="center">
        <Box display={{ base: "flex", lg: "none" }} p={3} bg="teal.50" borderRadius="xl" color="teal.600" mb={2} _dark={{ bg: "teal.900", color: "teal.300" }}>
          <LuPiggyBank size={32} />
        </Box>
        <Text fontSize="2xl" fontWeight="bold" color="gray.900" _dark={{ color: "white" }}>
          Lupa Password?
        </Text>
        <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }} lineHeight="tall">
          Masukkan email Anda dan kami akan mengirimkan instruksi untuk mereset password
        </Text>
      </VStack>

      <form onSubmit={handleSubmit}>
        <VStack gap={5}>
          <FormInput
            label="Email"
            type="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<LuMail size={18} />}
            required
          />

          <SubmitButton isLoading={isLoading} loadingText="Mengirim...">
            Kirim Link Reset
          </SubmitButton>
        </VStack>
      </form>

      <VStack gap={4}>
        <HStack w="full" gap={4}>
          <Separator flex={1} />
          <Text fontSize="xs" color="gray.400" flexShrink={0}>atau</Text>
          <Separator flex={1} />
        </HStack>

        <AuthLink text="Ingat password Anda?" linkText="Masuk" href="/login" />
      </VStack>
    </AuthCard>
  );
}
