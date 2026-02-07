"use client";

import { VStack, Text, Link as ChakraLink, HStack, Separator, Box } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { LuMail, LuLock, LuLogIn, LuEye, LuEyeOff } from "react-icons/lu";
import {
  AuthCard,
  AuthHeader,
  FormInput,
  SubmitButton,
  AuthLink,
} from "@/components/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Login:", { email, password });
    setIsLoading(false);
  };

  return (
    <AuthCard>
      <AuthHeader
        icon={<LuLogIn size={28} />}
        title="Selamat Datang"
        subtitle="Masuk ke akun Tabunganku Anda"
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

          <VStack gap={2} align="stretch" w="full">
            <FormInput
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<LuLock size={18} />}
              rightElement={
                <Box
                  as="button"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  color="gray.400"
                  _hover={{ color: "gray.600" }}
                  cursor="pointer"
                >
                  {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                </Box>
              }
              required
            />
            <HStack justify="flex-end">
              <ChakraLink
                asChild
                fontSize="sm"
                color="teal.600"
                _hover={{ color: "teal.500", textDecoration: "underline" }}
                _dark={{ color: "teal.400" }}
              >
                <Link href="/forgot-password">Lupa password?</Link>
              </ChakraLink>
            </HStack>
          </VStack>

          <SubmitButton isLoading={isLoading} loadingText="Masuk...">
            Masuk
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

        <AuthLink
          text="Belum punya akun?"
          linkText="Daftar sekarang"
          href="/register"
        />
      </VStack>
    </AuthCard>
  );
}
