"use client";

import { Text, Link as ChakraLink, HStack } from "@chakra-ui/react";
import Link from "next/link";

interface AuthLinkProps {
  text: string;
  linkText: string;
  href: string;
}

export function AuthLink({ text, linkText, href }: AuthLinkProps) {
  return (
    <HStack justify="center" gap={1}>
      <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
        {text}
      </Text>
      <ChakraLink
        asChild
        color="teal.600"
        fontWeight="medium"
        fontSize="sm"
        _hover={{ color: "teal.500", textDecoration: "underline" }}
        _dark={{ color: "teal.400" }}
      >
        <Link href={href}>{linkText}</Link>
      </ChakraLink>
    </HStack>
  );
}
