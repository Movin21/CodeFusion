import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';

const GeometricDesign = () => (
  <Box as="svg" width="100%" height="300px" viewBox="0 0 300 300">
    <circle cx="30" cy="30" r="20" stroke="white" strokeWidth="2" fill="none" />
    <path d="M50 50 L200 50 L150 200 L50 150 Z" stroke="white" strokeWidth="2" fill="none" />
    <path d="M100 100 L250 100 L200 250" stroke="white" strokeWidth="2" fill="none" />
    <circle cx="270" cy="270" r="20" stroke="white" strokeWidth="2" fill="none" />
    <circle cx="230" cy="230" r="2" fill="white" />
    <circle cx="250" cy="230" r="2" fill="white" />
    <circle cx="270" cy="230" r="2" fill="white" />
    <rect x="20" y="270" width="10" height="10" fill="white" />
    <rect x="100" y="270" width="10" height="10" fill="white" />
    <rect x="60" y="270" width="10" height="10" fill="white" />
    <rect x="100" y="270" width="10" height="10" fill="white" />
  </Box>
);

const countryCodes = [
  { code: '+1', flag: '🇺🇸', name: 'United States' },
  { code: '+1010', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+106', flag: '🇨🇳', name: 'China' },
  { code: '+101', flag: '🇯🇵', name: 'Japan' },
  // Add more countries here
];

const SignupForm = () => {
  return (
    <Flex bg="black" minHeight="100vh" alignItems="center" justifyContent="center" >
      <Flex
        bg="white"
        borderTopLeftRadius="lg"
        borderTopRightRadius="md"
        borderBottomLeftRadius="md"
        borderBottomRightRadius="lg"
        overflow="hidden"
        maxWidth="900px"
        maxHeight="600px"
        width="100%"
      >
        <Box flex="1" bg="black" color="white" p={10} display="flex" flexDirection="column">
          <Heading mb={2} fontSize="lg">Design with us</Heading>
          <Text mb={10} fontSize="xs">Access to thousands of design resources and templates</Text>
          <GeometricDesign />
        </Box>
        <Box flex="1" p={10}>
          <VStack spacing={2} align="stretch">
            <Heading size="xs" mb={3}>Sign up now</Heading>
            <Flex gap={2}>
              <FormControl>
                <FormLabel fontSize="xs">First name</FormLabel>
                <Input size="xs" placeholder="First name" />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="xs">Last name</FormLabel>
                <Input size="xs" placeholder="Last name" />
              </FormControl>
            </Flex>
            <FormControl>
              <FormLabel fontSize="xs">Email address</FormLabel>
              <Input size="xs" type="email" placeholder="Email address" />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="xs">Phone number</FormLabel>
              <Flex>
                <Select size="xs" maxWidth="90px" mr={2}>
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code}
                    </option>
                  ))}
                </Select>
                <Input size="xs" type="tel" placeholder="Phone number" />
              </Flex>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="xs">Password</FormLabel>
              <Input size="xs" type="password" placeholder="Password" />
              <Text fontSize="xs" color="gray.500" mt={1}>
                Use 10 or more characters with a mix of letters, numbers & symbols
              </Text>
            </FormControl>
            <Checkbox size="xs" fontSize="xs">
              By creating an account, I agree to your Terms of use and Privacy Policy
            </Checkbox>
            <Checkbox size="xs" fontSize="xs">
              By creating an account, I am also consenting to receive xsS messages and emails, including product new feature updates, events, and marketing promotions.
            </Checkbox>
            <Button colorScheme="gray" size="xs" width="100%">
              Sign up
            </Button>
            <Text textAlign="center" fontSize="xs">
              Already have an account? <Link color="blue.500">Log in</Link>
            </Text>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default SignupForm;
