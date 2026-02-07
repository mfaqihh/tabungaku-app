"use client";

import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LuLayoutDashboard,
  LuPiggyBank,
  LuWallet,
  LuArrowLeftRight,
  LuUser,
  LuChevronLeft,
  LuChevronRight,
  LuX,
  LuLogOut,
} from "react-icons/lu";
import { useSidebar } from "@/contexts";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LuLayoutDashboard },
  { label: "Tabungan", href: "/tabungan", icon: LuPiggyBank },
  { label: "Budget", href: "/budget", icon: LuWallet },
  { label: "Transaksi", href: "/transaksi", icon: LuArrowLeftRight },
  // { label: "Profile", href: "/profile", icon: LuUser },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, isMobileOpen, toggleCollapse, closeMobile } = useSidebar();

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <Box
          position="fixed"
          inset={0}
          bg="blackAlpha.600"
          zIndex={40}
          display={{ base: "block", lg: "none" }}
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <Box
        as="aside"
        position={{ base: "fixed", lg: "sticky" }}
        top={0}
        left={0}
        h="100vh"
        w={isCollapsed ? "80px" : "260px"}
        bg="white"
        borderRight="1px solid"
        borderColor="gray.200"
        transform={{
          base: isMobileOpen ? "translateX(0)" : "translateX(-100%)",
          lg: "translateX(0)",
        }}
        transition="all 0.3s ease"
        zIndex={50}
        display="flex"
        flexDirection="column"
        _dark={{
          bg: "gray.800",
          borderColor: "gray.700",
        }}
      >
        {/* Logo */}
        <Flex
          h="70px"
          align="center"
          justify={isCollapsed ? "center" : "space-between"}
          px={isCollapsed ? 2 : 5}
          borderBottom="1px solid"
          borderColor="gray.200"
          flexShrink={0}
          _dark={{ borderColor: "gray.700" }}
        >
          {!isCollapsed && (
            <HStack gap={2}>
              <Box
                w={8}
                h={8}
                bg="teal.500"
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <LuPiggyBank color="white" size={18} />
              </Box>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="gray.800"
                _dark={{ color: "white" }}
              >
                Tabunganku
              </Text>
            </HStack>
          )}

          {isCollapsed && (
            <Box
              w={10}
              h={10}
              bg="teal.500"
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <LuPiggyBank color="white" size={20} />
            </Box>
          )}

          {/* Mobile Close Button */}
          <IconButton
            aria-label="Close sidebar"
            display={{ base: "flex", lg: "none" }}
            onClick={closeMobile}
            variant="ghost"
            size="sm"
          >
            <LuX size={20} />
          </IconButton>
        </Flex>

        {/* Navigation */}
        <VStack
          as="nav"
          flex={1}
          gap={1}
          py={4}
          px={isCollapsed ? 2 : 3}
          align="stretch"
          overflowY="auto"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={closeMobile}>
                <Flex
                  align="center"
                  gap={3}
                  px={isCollapsed ? 0 : 4}
                  py={3}
                  borderRadius="xl"
                  justify={isCollapsed ? "center" : "flex-start"}
                  bg={isActive ? "teal.50" : "transparent"}
                  color={isActive ? "teal.600" : "gray.600"}
                  fontWeight={isActive ? "semibold" : "medium"}
                  transition="all 0.2s ease"
                  _hover={{
                    bg: isActive ? "teal.50" : "gray.100",
                    color: isActive ? "teal.600" : "gray.800",
                  }}
                  _dark={{
                    bg: isActive ? "teal.900" : "transparent",
                    color: isActive ? "teal.200" : "gray.400",
                    _hover: {
                      bg: isActive ? "teal.900" : "gray.700",
                      color: isActive ? "teal.200" : "white",
                    },
                  }}
                >
                  <Icon boxSize={5}>
                    <item.icon />
                  </Icon>
                  {!isCollapsed && (
                    <Text fontSize="sm">{item.label}</Text>
                  )}
                </Flex>
              </Link>
            );
          })}
        </VStack>

        {/* Collapse Toggle (Desktop only) */}
        <Box
          display={{ base: "none", lg: "block" }}
          p={3}
          borderTop="1px solid"
          borderColor="gray.200"
          _dark={{ borderColor: "gray.700" }}
        >
          <Flex
            as="button"
            onClick={toggleCollapse}
            align="center"
            gap={3}
            w="full"
            px={isCollapsed ? 0 : 4}
            py={3}
            borderRadius="xl"
            justify={isCollapsed ? "center" : "flex-start"}
            color="gray.600"
            transition="all 0.2s ease"
            _hover={{
              bg: "gray.100",
              color: "gray.800",
            }}
            _dark={{
              color: "gray.400",
              _hover: {
                bg: "gray.700",
                color: "white",
              },
            }}
          >
            <Icon boxSize={5}>
              {isCollapsed ? <LuChevronRight /> : <LuChevronLeft />}
            </Icon>
            {!isCollapsed && (
              <Text fontSize="sm" fontWeight="medium">
                Ciutkan Menu
              </Text>
            )}
          </Flex>
        </Box>

        {/* Logout */}
        <Box
          p={3}
          borderTop="1px solid"
          borderColor="gray.200"
          _dark={{ borderColor: "gray.700" }}
        >
          <Link href="/login">
            <Flex
              align="center"
              gap={3}
              px={isCollapsed ? 0 : 4}
              py={3}
              borderRadius="xl"
              justify={isCollapsed ? "center" : "flex-start"}
              color="red.500"
              transition="all 0.2s ease"
              _hover={{
                bg: "red.50",
              }}
              _dark={{
                _hover: {
                  bg: "red.900",
                },
              }}
            >
              <Icon boxSize={5}>
                <LuLogOut />
              </Icon>
              {!isCollapsed && (
                <Text fontSize="sm" fontWeight="medium">
                  Keluar
                </Text>
              )}
            </Flex>
          </Link>
        </Box>
      </Box>
    </>
  );
}
