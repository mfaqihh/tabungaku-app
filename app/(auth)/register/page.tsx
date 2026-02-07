"use client";

import { VStack, Text, HStack, Separator, Box, Checkbox } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LuMail, LuLock, LuUser, LuEye, LuEyeOff, LuPiggyBank } from "react-icons/lu";
import { AuthCard, FormInput, SubmitButton, AuthLink } from "@/components/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (password.length < 8) newErrors.password = "Password minimal 8 karakter";
    if (password !== confirmPassword) newErrors.confirmPassword = "Password tidak cocok";
    if (!agreeTerms) newErrors.terms = "Anda harus menyetujui syarat dan ketentuan";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/login");
  };

  return (
    <AuthCard>
      {/* Header */}
      <VStack gap={2} textAlign="center">
        <Box display={{ base: "flex", lg: "none" }} p={3} bg="teal.50" borderRadius="xl" color="teal.600" mb={2} _dark={{ bg: "teal.900", color: "teal.300" }}>
          <LuPiggyBank size={32} />
        </Box>
        <Text fontSize="2xl" fontWeight="bold" color="gray.900" _dark={{ color: "white" }}>
          Buat Akun Baru
        </Text>
        <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
          Daftar untuk mulai mengelola tabungan Anda
        </Text>
      </VStack>

      <form onSubmit={handleSubmit}>
        <VStack gap={4}>
          <FormInput
            label="Nama Lengkap"
            type="text"
            placeholder="Masukkan nama lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<LuUser size={18} />}
            required
          />

          <FormInput
            label="Email"
            type="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<LuMail size={18} />}
            required
          />

          <FormInput
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Minimal 8 karakter"
            value={password}
            onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors({ ...errors, password: "" }); }}
            leftIcon={<LuLock size={18} />}
            rightElement={
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ color: "var(--chakra-colors-gray-400)", cursor: "pointer", background: "none", border: "none" }}>
                {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
              </button>
            }
            error={errors.password}
            required
          />

          <FormInput
            label="Konfirmasi Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Ulangi password"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" }); }}
            leftIcon={<LuLock size={18} />}
            rightElement={
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ color: "var(--chakra-colors-gray-400)", cursor: "pointer", background: "none", border: "none" }}>
                {showConfirmPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
              </button>
            }
            error={errors.confirmPassword}
            required
          />

          <VStack gap={2} align="stretch" w="full">
            <Checkbox.Root checked={agreeTerms} onCheckedChange={(e) => { setAgreeTerms(!!e.checked); if (errors.terms) setErrors({ ...errors, terms: "" }); }} colorPalette="teal">
              <Checkbox.HiddenInput />
              <Checkbox.Control borderRadius="md" />
              <Checkbox.Label>
                <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
                  Saya menyetujui <Text as="span" color="teal.600" fontWeight="medium" _dark={{ color: "teal.400" }}>Syarat dan Ketentuan</Text>
                </Text>
              </Checkbox.Label>
            </Checkbox.Root>
            {errors.terms && <Text fontSize="xs" color="red.500">{errors.terms}</Text>}
          </VStack>

          <SubmitButton isLoading={isLoading} loadingText="Mendaftar...">
            Daftar
          </SubmitButton>
        </VStack>
      </form>

      <VStack gap={4}>
        <HStack w="full" gap={4}>
          <Separator flex={1} />
          <Text fontSize="xs" color="gray.400" flexShrink={0}>atau</Text>
          <Separator flex={1} />
        </HStack>

        <AuthLink text="Sudah punya akun?" linkText="Masuk" href="/login" />
      </VStack>
    </AuthCard>
  );
}
