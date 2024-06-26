'use client'

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from '@chakra-ui/react'
import React, { useState ,useEffect} from "react";

import { useAuth } from "../ContextAPI/Authentication";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useNavigate } from 'react-router-dom';
export default function SplitScreen() {
    const { login } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { isLoggedin } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    useEffect(()=>{
      if (isLoggedin()) {
          enqueueSnackbar('Already logged in', { variant: 'warning' }); // Using enqueueSnackbar to show error message
          navigate('/dashboard');
      }
    }, [isLoggedin, enqueueSnackbar, navigate]); // Corrected useEffect dependencies
  
    const handleLogin = async () => {
      // Validate username and password as needed
      try {
        await login({ email, password });
      } catch (error) {
        // Handle login error
        console.error("Login failed:", error.message);
        enqueueSnackbar(error.message, { variant: "error" });
      }
    };
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email}
                onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password}
                onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              {/* <Checkbox>Remember me</Checkbox> */}
              <Text color={'blue.500'}><Link
              to={"/signup"}
              style={{ color: "blue", textDecoration: "underline" }}
            >
              {" "}
              Don't Have An Account ! Create Now
            </Link></Text>
            </Stack>
            <Button colorScheme={'blue'} variant={'solid'}    onClick={handleLogin}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
  )
}