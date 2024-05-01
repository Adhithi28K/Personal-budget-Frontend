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
  Image,HStack,Box
} from '@chakra-ui/react'
import React, { useState ,useEffect} from "react";

import { useAuth } from '../ContextAPI/Authentication';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Link,} from 'react-router-dom'
export default function SplitScreen() {
    const { signup } = useAuth();
    const [Name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const handleSignup = async () => {
    // Validate username, password, and email as needed
    try {
      console.log(Name,password,email)
      await signup({ Name, password, email });
    } catch (error) {
      // Handle signup error
      console.error('Signup failed:', error.message);
    }
  };
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Create a new account.</Heading>
         
                <FormControl id="firstName" isRequired>
                  <FormLabel>User Name</FormLabel>
                  <Input type="text" value={Name} onChange={(e)=>setName(e.target.value)} />
                </FormControl>
      
           
          
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
              <Text color={'blue.500'}><Link
              to={"/login"}
              style={{ color: "blue", textDecoration: "underline" }}
            >
             Already have an account {" "}
              Login!
            </Link></Text>
            </Stack>
            <Button colorScheme={'blue'} variant={'solid'}    onClick={handleSignup}>
              Create Account
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