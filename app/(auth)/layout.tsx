import { Box, Flex } from "@chakra-ui/react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
      py={12}
      px={4}
    >
      <Box w="full" maxW="md">
        {children}
      </Box>
    </Flex>
  );
}
