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
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();// Initialize the useNavigate hook
  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center" position="relative" bg="black">
      <Box 
        borderWidth={1}
        px={3}
        width="full"
        maxWidth="400px" // Smaller width
        textAlign="center"
        boxShadow="md" // Reduced shadow size
        bg="white"
        mt="10px" // Adjusted margin top
        height="auto" // Adjust height
        p={6}
        borderRadius="2xl"
        
      >
        <Box p={2}>
        <Flex justify="center" align="center" > {/* Reduced margin bottom */}
              <Image
                src="/assets/logo.png"
                alt="Logo"
                height="110px" // Adjust the size of the logo
                width="110px"
              />
            </Flex>
          <VStack spacing={3} align="stretch"> {/* Reduced spacing */}
            {/* Image and Sign In text */}
            <Text fontSize="sm" fontWeight="bold" className='font-poppins' mb={3}>Sign In to Continue</Text> {/* Smaller font size */}
            
            <FormControl>
              <FormLabel fontSize="xs" className='font-poppins'>Email or mobile phone number</FormLabel> {/* Smaller font size */}
              <Input placeholder="Enter your email or phone" fontSize="xs" className='font-poppins' borderRadius={5}/>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="xs" className='font-poppins'>Your password</FormLabel> {/* Smaller font size */}
              <InputGroup>
                <Input
                  type={show ? 'text' : 'password'}
                  placeholder="Enter your password"
                  fontSize="xs"
                  className='font-poppins'
                  borderRadius={5}
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
              fontSize="xs"
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
            onClick={() => navigate('/signup')}
          >
            Create an account
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginScreen;
