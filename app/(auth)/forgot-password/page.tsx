"use client";

import { VStack, Text, HStack, Separator, Box, Link as ChakraLink } from "@chakra-ui/react";
import { useState } from "react";
import { LuMail, LuKeyRound, LuArrowLeft, LuCircleCheck } from "react-icons/lu";
import Link from "next/link";
import {
  AuthCard,
  AuthHeader,
  FormInput,
  SubmitButton,
} from "@/components/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Forgot Password:", { email });
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <AuthCard>
        <VStack gap={6} py={4}>
          <Box
            p={4}
            bg="green.50"
            borderRadius="full"
            color="green.500"
            _dark={{
              bg: "green.900",
              color: "green.200",
            }}
          >
            <LuCircleCheck size={40} />
          </Box>
          
          <VStack gap={2} textAlign="center">
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="gray.900"
              _dark={{ color: "white" }}
            >
              Email Terkirim!
            </Text>
            <Text
              fontSize="sm"
              color="gray.600"
              _dark={{ color: "gray.400" }}
              maxW="xs"
            >
              Kami telah mengirim instruksi untuk mereset password ke{" "}
              <Text as="span" fontWeight="medium" color="teal.600" _dark={{ color: "teal.400" }}>
                {email}
              </Text>
            </Text>
          </VStack>

          <VStack gap={3} w="full">
            <Text
              fontSize="xs"
              color="gray.500"
              textAlign="center"
            >
              Tidak menerima email? Periksa folder spam atau
            </Text>
            <SubmitButton
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setEmail("");
              }}
            >
              Kirim Ulang
            </SubmitButton>
          </VStack>

          <ChakraLink
            asChild
            color="teal.600"
            fontSize="sm"
            fontWeight="medium"
            _hover={{ color: "teal.500" }}
            _dark={{ color: "teal.400" }}
          >
            <Link href="/login">
              <HStack gap={2}>
                <LuArrowLeft size={16} />
                <Text>Kembali ke halaman login</Text>
              </HStack>
            </Link>
          </ChakraLink>
        </VStack>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <AuthHeader
        icon={<LuKeyRound size={28} />}
        title="Lupa Password?"
        subtitle="Masukkan email Anda untuk mereset password"
      />

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
          <Text fontSize="xs" color="gray.500" flexShrink={0}>
            atau
          </Text>
          <Separator flex={1} />
        </HStack>

        <ChakraLink
          asChild
          color="teal.600"
          fontSize="sm"
          fontWeight="medium"
          _hover={{ color: "teal.500" }}
          _dark={{ color: "teal.400" }}
        >
          <Link href="/login">
            <HStack gap={2}>
              <LuArrowLeft size={16} />
              <Text>Kembali ke halaman login</Text>
            </HStack>
          </Link>
        </ChakraLink>
      </VStack>
    </AuthCard>
  );
}
