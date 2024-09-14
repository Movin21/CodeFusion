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
  { code: '+1', flag: 'US', name: 'United States' },
  { code: '+1010', flag: 'GB', name: 'United Kingdom' },
  { code: '+91', flag: 'IN', name: 'India' },
  { code: '+106', flag: 'CN', name: 'China' },
  { code: '+101', flag: 'JP', name: 'Japan' },
  // Add more countries here
];

const SignupForm = () => {
  return (
    <Flex  bg="black" minHeight="100vh" alignItems="center" justifyContent="center"  >
      <Flex
        bg="white"
        maxWidth="900px"
        maxHeight="600px"
        width="100%" 
        borderRadius="xl" // Set border radius on the outer Flex
        overflow="hidden" // Ensure no overflow causes visible gaps
       
      
      >
        <Box flex="1" bg="#0B1518" color="white" p={10} display="flex" flexDirection="column"  >
          <Heading mb={2} fontSize="lg" className="font-poppins">Design with us</Heading>
          <Text mb={10} fontSize="xs" className="font-poppins">Access to thousands of design resources and templates</Text>
          <GeometricDesign />
        </Box> 
        <Box flex="1" p={10}   >
          <VStack spacing={2} align="stretch" >
            <Heading size="xs" mb={3} className="font-poppins">Sign up now</Heading>
            <Flex gap={2} >
              <FormControl>
                <FormLabel fontSize="xs" className="font-poppins">First name</FormLabel>
                <Input size="xs" placeholder="First name" className="font-poppins" />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="xs" className="font-poppins">Last name</FormLabel>
                <Input size="xs" placeholder="Last name" className="font-poppins" />
              </FormControl>
            </Flex>
            <FormControl>
              <FormLabel fontSize="xs" className="font-poppins">Email address</FormLabel>
              <Input size="xs" type="email" placeholder="Email address" className="font-poppins" />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="xs" className="font-poppins">Phone number</FormLabel>
              <Flex>
                <Select size="xs" maxWidth="90px" mr={2} className="font-poppins">
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code} >
                      {country.flag} {country.code}
                    </option>
                  ))}
                </Select>
                <Input size="xs" type="tel" placeholder="Phone number" className="font-poppins" />
              </Flex>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="xs" className="font-poppins">Password</FormLabel>
              <Input size="xs" type="password" placeholder="Password"  className="font-poppins"/>
              <Text fontSize="xs" color="gray.500" mt={1} className="font-poppins">
                Use 10 or more characters with a mix of letters, numbers & symbols
              </Text>
            </FormControl>
            <Checkbox size="xs" fontSize="xs" className="font-poppins">
              By creating an account, I agree to your Terms of use and Privacy Policy
            </Checkbox>
            <Checkbox size="xs" fontSize="xs" className="font-poppins">
              By creating an account, I am also consenting to receive xsS messages and emails, including product new feature updates, events, and marketing promotions.
            </Checkbox>
            <Button colorScheme="gray" size="xs" width="100%" className="font-poppins">
              Sign up
            </Button>
            <Text textAlign="center" fontSize="xs" className="font-poppins">
              Already have an account? <Link color="blue.500" className="font-poppins">Log in</Link>
            </Text>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default SignupForm;
