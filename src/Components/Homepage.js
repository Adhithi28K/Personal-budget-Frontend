'use client'
import { useEffect } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,Heading,
  Stack,
} from '@chakra-ui/react'
import { FaMoneyBillAlt } from "react-icons/fa";
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import { ToastContainer } from "react-toastify";
import AddExpense from './AddExpense';
import AddBudget from './AddBudget'
import Dashboard from './Dashboard';
import Visulization from './Visulization';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes,
    useNavigate,
  } from "react-router-dom";
  import { useAuth } from "../ContextAPI/Authentication";
  import {
      FiHome,
      FiTrendingUp,
      FiCompass,
      FiStar,
      FiSettings,
      FiMenu,
    } from 'react-icons/fi'
    const tokenRefreshTime=30_000;

const Links = [
    {
        name: 'Homepage',
        link: 'homepage'
      },
    {
      name: 'Dashboard',
      link: 'dashboard'
    },{
      name: 'Add Budget',
      link: 'budget'
    },
    {
        name:'Add Expense',
        link:'expense'
    }
];
const NavLink = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  const { user,isLoggedin, logout, refreshToken } = useAuth();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isLoggedin()) {
        refreshToken();
      }
    }, tokenRefreshTime);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [isLoggedin, refreshToken]);
  const { children } = props
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}>
      {children}
    </Box>
  )
}

export default function WithAction() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isLoggedin, logout, refreshToken } = useAuth();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
          <Box>
  <Heading as="h2" size="lg" fontFamily="monospace" fontWeight="bold" color="#E56061">
    {/* <FaMoneyBillAlt style={{ marginRight: "0.5rem" }} /> */}
    Expense Tracker
  </Heading>
</Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((obj) => (
                <Link to={'/'+obj.link} >
                <NavLink key={obj.name}>{obj.name}</NavLink></Link>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {/* <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              leftIcon={<AddIcon />}>
              Action
            </Button> */}
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
              <Link to={'/budget'}><MenuItem>Add Budget</MenuItem></Link>
                <Link to={'/Expense'}><MenuItem>Add Expense</MenuItem></Link>
                <MenuDivider />
                <MenuItem  onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>
        <Routes>
          <Route path="/expense" element={<AddExpense />} />
          <Route path="/budget" element={<AddBudget />} />
          <Route path="/dashboard" element={<Visulization />} />
          <Route path="/homepage" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} /> 

        </Routes>
        <ToastContainer />
        </Box>
    </>
  )
}