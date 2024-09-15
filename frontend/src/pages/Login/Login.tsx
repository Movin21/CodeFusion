import React from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Link,
  IconButton,
  InputGroup,
  InputRightElement,
  Image,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const LoginScreen = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center" position="relative" bg="black">
      {/* Background logo */}
      <Box position="absolute" top="-30px" left="50%" transform="translateX(-50%)" mt={10}>
        <Image
          borderRadius="full"
          boxSize="60px" // Smaller logo size
          src="/assets/logo.png"
          alt="Logo"
          bg="white"
        />
      </Box>

      <Box 
        borderWidth={1}
        px={3}
        width="full"
        maxWidth="400px" // Smaller width
        borderRadius={10} // Less border radius
        textAlign="center"
        boxShadow="md" // Reduced shadow size
        bg="white"
        mt="10px" // Adjusted margin top
        height="auto" // Adjust height
        p={6}
      >
        <Box p={3}>
          <VStack spacing={4} align="stretch"> {/* Reduced spacing */}
            <Box textAlign="center">
              <Text fontSize="lg" fontWeight="bold" className='font-poppins'>Sign in</Text> {/* Smaller font size */}
            </Box>
            
            <FormControl>
              <FormLabel fontSize="sm" className='font-poppins'>Email or mobile phone number</FormLabel> {/* Smaller font size */}
              <Input placeholder="Enter your email or phone" fontSize="xs" className='font-poppins'/>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" className='font-poppins'>Your password</FormLabel> {/* Smaller font size */}
              <InputGroup>
                <Input
                  type={show ? 'text' : 'password'}
                  placeholder="Enter your password"
                  fontSize="xs"
                  className='font-poppins'
                />
                <InputRightElement width="4rem"> {/* Smaller width */}
                  <IconButton
                    h="1.5rem" // Smaller button height
                    size="xs"
                    onClick={handleClick}
                    aria-label={show ? 'Hide password' : 'Show password'}
                    icon={show ? <ViewOffIcon /> : <ViewIcon />}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              borderRadius="lg" // Smaller border radius
              bg="gray.100"
              width="full"
              py={4} // Reduced padding
              className='font-poppins'
              fontSize="sm"
            >
              Log in
            </Button>

            <Text fontSize="xs" className='font-poppins'>
              By continuing, you agree to the{' '}
              <Link color="blue.500">Terms of use</Link> and{' '}
              <Link color="blue.500">Privacy Policy</Link>.
            </Text>

            <Flex justify="space-between" fontSize="xs" className='font-poppins'>
              <Link>Other issue with sign in</Link>
              <Link>Forget your password</Link>
            </Flex>
          </VStack>
        </Box>

        <Box mt={4} borderTopWidth={1} pt={4} pb={4}> {/* Adjusted margin and padding */}
          <Text fontSize="xs" className='font-poppins'>New to our community</Text> {/* Smaller font size */}
          <Button
            mt={3} // Adjusted margin
            width="full"
            variant="outline"
            className='font-poppins'
            fontSize="2xs"
          >
            Create an account
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginScreen;
