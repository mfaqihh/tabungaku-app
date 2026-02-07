"use client";

import { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
  Avatar,
  Menu,
  Portal,
  Button,
  VStack,
} from "@chakra-ui/react";
import { LuMenu, LuBell, LuChevronDown, LuUser, LuSettings, LuLogOut, LuTriangleAlert } from "react-icons/lu";
import { useSidebar } from "@/contexts";
import { ColorModeButton } from "@/components/ui/color-mode";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { toggleMobile } = useSidebar();
  const router = useRouter();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    setShowLogoutDialog(false);
    router.push("/login");
  };

  return (
    <>
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
                    <Link href="/profile">
                      <Menu.Item value="profile" px={4} py={2.5} cursor="pointer">
                        <HStack gap={3}>
                          <LuUser size={16} />
                          <Text fontSize="sm">Profile</Text>
                        </HStack>
                      </Menu.Item>
                    </Link>
                    <Menu.Item value="settings" px={4} py={2.5} cursor="pointer">
                      <HStack gap={3}>
                        <LuSettings size={16} />
                        <Text fontSize="sm">Settings</Text>
                      </HStack>
                    </Menu.Item>
                    <Menu.Separator my={1} />
                    <Menu.Item
                      value="logout"
                      px={4}
                      py={2.5}
                      cursor="pointer"
                      color="red.500"
                      onClick={() => setShowLogoutDialog(true)}
                    >
                      <HStack gap={3}>
                        <LuLogOut size={16} />
                        <Text fontSize="sm">Logout</Text>
                      </HStack>
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          </HStack>
        </Flex>
      </Box>

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <Box
          position="fixed"
          inset={0}
          zIndex={100}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {/* Backdrop */}
          <Box
            position="absolute"
            inset={0}
            bg="blackAlpha.600"
            onClick={() => setShowLogoutDialog(false)}
          />
          
          {/* Dialog */}
          <Box
            position="relative"
            bg="white"
            borderRadius="2xl"
            p={6}
            mx={4}
            maxW="sm"
            w="full"
            boxShadow="2xl"
            _dark={{ bg: "gray.800" }}
          >
            <VStack gap={4} align="center">
              <Box
                p={3}
                bg="red.50"
                borderRadius="full"
                color="red.500"
                _dark={{ bg: "red.900", color: "red.300" }}
              >
                <LuTriangleAlert size={28} />
              </Box>
              
              <VStack gap={1} textAlign="center">
                <Text fontSize="lg" fontWeight="bold" color="gray.900" _dark={{ color: "white" }}>
                  Konfirmasi Logout
                </Text>
                <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
                  Apakah Anda yakin ingin keluar dari akun?
                </Text>
              </VStack>

              <HStack gap={3} w="full" pt={2}>
                <Button
                  flex={1}
                  variant="outline"
                  borderRadius="xl"
                  onClick={() => setShowLogoutDialog(false)}
                  _dark={{ borderColor: "gray.600" }}
                >
                  Batal
                </Button>
                <Button
                  flex={1}
                  colorPalette="red"
                  borderRadius="xl"
                  onClick={handleLogout}
                >
                  Ya, Keluar
                </Button>
              </HStack>
            </VStack>
          </Box>
        </Box>
      )}
    </>
  );
}
