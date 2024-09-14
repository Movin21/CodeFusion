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
  <Box as="svg" width="100%" height="100%" viewBox="0 0 300 300">
    <circle cx="30" cy="30" r="20" stroke="white" strokeWidth="2" fill="none" />
    <path d="M50 50 L200 50 L150 200 L50 150 Z" stroke="white" strokeWidth="2" fill="none" />
    <path d="M100 100 L250 100 L200 250" stroke="white" strokeWidth="2" fill="none" />
    <circle cx="270" cy="270" r="20" stroke="white" strokeWidth="2" fill="none" />
    <circle cx="230" cy="230" r="2" fill="white" />
    <circle cx="250" cy="230" r="2" fill="white" />
    <circle cx="270" cy="230" r="2" fill="white" />
    <rect x="20" y="270" width="10" height="10" fill="white" />
    <rect x="40" y="270" width="10" height="10" fill="white" />
    <rect x="60" y="270" width="10" height="10" fill="white" />
    <rect x="80" y="270" width="10" height="10" fill="white" />
  </Box>
);

const countryCodes = [
  { code: '+1', flag: 'US', name: 'United States' },
  { code: '+44', flag: 'GB', name: 'United Kingdom' },
  { code: '+91', flag: 'IN', name: 'India' },
  { code: '+86', flag: 'CN', name: 'China' },
  { code: '+81', flag: 'JP', name: 'Japan' },
  // Add more countries here
];

const SignupForm = () => {
  return (
    <Flex bg="black" minHeight="40vh" alignItems="center" justifyContent="center" >
      <Flex
        maxWidth="1000px"
        width="100%"
        height="575px"
        bg="black"
        borderRadius="xl"
        overflow="hidden"
      >
        {/* Left Side */}
        <Box flex="1" color="white" p={6} position="relative">
          <VStack align="flex-start" spacing={2} mb={4}>
            <Heading fontSize="2xl" className="font-poppins">Design with us</Heading>
            <Text fontSize="xs" className="font-poppins">Access to thousands of design resources and templates</Text>
          </VStack>
          <Box position="absolute" bottom="0" left="0" width="100%" height="70%" >
            <GeometricDesign />
          </Box>
        </Box>

        {/* Right Side */}
        <Box flex="1" bg="white" p={6} borderRadius="2xl" ml={20} mt={4}  mb={4}>
          <VStack spacing={3} align="stretch">
            <Heading size="xs" mb={1} className="font-poppins">Sign up now</Heading>
            <Flex gap={2}>
              <FormControl>
                <FormLabel fontSize="xs" className="font-poppins">First name</FormLabel>
                <Input size="xs" placeholder="First name" className="font-poppins" />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="xs" className="font-poppins">Last name</FormLabel>
                <Input size="xs" placeholder="Last name" className="font-poppins"/>
              </FormControl>
            </Flex>
            <FormControl>
              <FormLabel fontSize="xs" className="font-poppins">Email address</FormLabel>
              <Input size="xs" type="email" placeholder="Email address" className="font-poppins" />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="xs" className="font-poppins">Phone number</FormLabel>
              <Flex>
                <Select size="xs" maxWidth="100px" mr={2} className="font-poppins">
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code}
                    </option>
                  ))}
                </Select>
                <Input size="xs" type="tel" placeholder="Phone number" className="font-poppins" />
              </Flex>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="xs" className="font-poppins">Password</FormLabel>
              <Input size="xs" type="password" placeholder="Password" className="font-poppins" />
              <Text fontSize="2xs" color="gray.500" mt={1} className="font-poppins">
                Use 8 or more characters with a mix of letters, numbers & symbols
              </Text>
            </FormControl>
            <Checkbox size="sm" className="font-poppins">
              <Text fontSize="2xs">By creating an account, I agree to your Terms of use and Privacy Policy</Text>
            </Checkbox>
            <Checkbox size="sm" className="font-poppins">
              <Text fontSize="2xs">By creating an account, I am also consenting to receive xsS messages and emails, including product new feature updates, events, and marketing promotions.</Text>
            </Checkbox>
            <Button size="xs" colorScheme="gray" width="100%" className="font-poppins" p={4} mt={3}>
              Sign up
            </Button>
            <Text textAlign="center" fontSize="xs" className="font-poppins" p={5}>
              Already have an account? <Link color="blue.500" className="font-poppins">Log in</Link>
            </Text>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default SignupForm;