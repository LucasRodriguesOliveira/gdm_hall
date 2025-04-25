'use client';

import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  Portal,
  Stack,
} from '@chakra-ui/react';
import { useColorMode, useColorModeValue } from '../ui/color-mode';
import { LuLogOut, LuMoon, LuSun } from 'react-icons/lu';
import { useCallback } from 'react';
import { useAuth } from '../../hooks/use-auth.hook';
import { toaster } from '../ui/toaster';
import { useRouter } from 'next/navigation';

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleMenuSelect = useCallback(async (option: string) => {
    if (option === 'logout') {
      await logout();
      toaster.success({
        title: 'Logged out',
        description: 'See you later, alligator'
      });
      router.push('/login');
    }
  }, [logout, router]);

  return (
    <Box bg={useColorModeValue('green.600', 'green.800')} px={4} shadow={'sm'}>
      <Flex p={4} alignItems={'center'} justifyContent={'space-between'}>
        <Heading>GDM BE Test Project</Heading>

        <Flex alignItems={'center'}>
          <Stack direction={'row'} gap={7}>
            <Button onClick={toggleColorMode} rounded={'full'} p={0}>
              {colorMode === 'light' ? <LuMoon /> : <LuSun />}
            </Button>

            <Menu.Root onSelect={({ value }) => handleMenuSelect(value)}>
              <Menu.Trigger asChild>
                <Button
                  variant={'ghost'}
                  rounded={'full'}
                  cursor={'pointer'}
                  p={0}
                >
                  <Avatar.Root colorPalette={'white'}>
                    <Avatar.Fallback name={user!.name} />
                  </Avatar.Root>
                </Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="logout" justifyContent={'space-between'}>
                      Logout
                      <LuLogOut />
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
