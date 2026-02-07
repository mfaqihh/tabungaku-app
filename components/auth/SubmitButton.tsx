"use client";

import { Button } from "@chakra-ui/react";
import { ReactNode } from "react";

interface SubmitButtonProps {
  children: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export function SubmitButton({
  children,
  isLoading = false,
  loadingText = "Memproses...",
  onClick,
  type = "submit",
}: SubmitButtonProps) {
  return (
    <Button
      type={type}
      w="full"
      h={12}
      bg="teal.500"
      color="white"
      fontSize="sm"
      fontWeight="semibold"
      borderRadius="lg"
      loading={isLoading}
      loadingText={loadingText}
      onClick={onClick}
      _hover={{
        bg: "teal.600",
        transform: "translateY(-1px)",
        boxShadow: "lg",
      }}
      _active={{
        bg: "teal.700",
        transform: "translateY(0)",
      }}
      transition="all 0.2s ease"
    >
      {children}
    </Button>
  );
}
