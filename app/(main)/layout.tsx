"use client";

import { Box, Flex } from "@chakra-ui/react";
import { SidebarProvider } from "@/contexts";
import { Sidebar } from "@/components/layout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Flex minH="100vh" bg="gray.50" _dark={{ bg: "gray.900" }}>
        <Sidebar />
        <Box flex={1} minW={0}>
          {children}
        </Box>
      </Flex>
    </SidebarProvider>
  );
}
