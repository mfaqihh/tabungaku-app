"use client";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
  Avatar,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { LuMenu, LuBell, LuChevronDown } from "react-icons/lu";
import { useSidebar } from "@/contexts";
import { ColorModeButton } from "@/components/ui/color-mode";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { toggleMobile } = useSidebar();

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={30}
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      _dark={{
        bg: "gray.800",
        borderColor: "gray.700",
      }}
    >
      <Flex h="70px" align="center" justify="space-between" px={{ base: 4, md: 6 }}>
        {/* Left side */}
        <HStack gap={4}>
          <IconButton
            aria-label="Open menu"
            display={{ base: "flex", lg: "none" }}
            onClick={toggleMobile}
            variant="ghost"
            size="sm"
          >
            <LuMenu size={20} />
          </IconButton>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="bold"
            color="gray.800"
            _dark={{ color: "white" }}
          >
            {title}
          </Text>
        </HStack>

        {/* Right side */}
        <HStack gap={2}>
          <ColorModeButton />
          
          <IconButton
            aria-label="Notifications"
            variant="ghost"
            size="sm"
            position="relative"
          >
            <LuBell size={20} />
            <Box
              position="absolute"
              top={1}
              right={1}
              w={2}
              h={2}
              bg="red.500"
              borderRadius="full"
            />
          </IconButton>

          <Menu.Root>
            <Menu.Trigger asChild>
              <HStack
                as="button"
                gap={2}
                p={2}
                borderRadius="lg"
                _hover={{ bg: "gray.100" }}
                _dark={{ _hover: { bg: "gray.700" } }}
              >
                <Avatar.Root size="sm">
                  <Avatar.Fallback name="User" bg="teal.500" color="white" />
                </Avatar.Root>
                <Box display={{ base: "none", md: "block" }} textAlign="left">
                  <Text fontSize="sm" fontWeight="medium" color="gray.800" _dark={{ color: "white" }}>
                    John Doe
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    john@email.com
                  </Text>
                </Box>
                <LuChevronDown size={16} />
              </HStack>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content
                  bg="white"
                  borderRadius="xl"
                  boxShadow="lg"
                  py={2}
                  minW="180px"
                  _dark={{ bg: "gray.800" }}
                >
                  <Menu.Item value="profile" px={4} py={2} cursor="pointer">
                    <Text fontSize="sm">Profile</Text>
                  </Menu.Item>
                  <Menu.Item value="settings" px={4} py={2} cursor="pointer">
                    <Text fontSize="sm">Settings</Text>
                  </Menu.Item>
                  <Menu.Separator my={1} />
                  <Menu.Item value="logout" px={4} py={2} cursor="pointer" color="red.500">
                    <Text fontSize="sm">Logout</Text>
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </HStack>
      </Flex>
    </Box>
  );
}
