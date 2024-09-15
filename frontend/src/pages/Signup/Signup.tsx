import React from "react";
import { useState } from "react";
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
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const GeometricDesign = () => (
  <Box as="svg" width="100%" height="100%" viewBox="0 0 300 300">
    <circle cx="30" cy="30" r="20" stroke="white" strokeWidth="2" fill="none" />
    <path
      d="M50 50 L200 50 L150 200 L50 150 Z"
      stroke="white"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M100 100 L250 100 L200 250"
      stroke="white"
      strokeWidth="2"
      fill="none"
    />
    <circle
      cx="270"
      cy="270"
      r="20"
      stroke="white"
      strokeWidth="2"
      fill="none"
    />
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
  {
    code: "+94",
    flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Flag_of_Sri_Lanka.svg/800px-Flag_of_Sri_Lanka.svg.png",
    name: "Sri Lanka",
  },
  {
    code: "+64",
    flag: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg",
    name: "New Zealand",
  },
  {
    code: "+44",
    flag: "https://cdn.britannica.com/25/4825-004-F1975B92/Flag-United-Kingdom.jpg",
    name: "United Kingdom",
  },
  {
    code: "+61",
    flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/1200px-Flag_of_Australia_%28converted%29.svg.png",
    name: "Australia",
  },
];

const SignupForm = () => {
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <Flex
      bg="black"
      minHeight="40vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        maxWidth="1000px"
        width="100%"
        height="600px"
        bg="black"
        borderRadius="xl"
        overflow="hidden"
      >
        {/* Left Side */}
        <Box flex="1" color="white" p={6} position="relative">
          <VStack align="flex-start" spacing={2} mb={4}>
            <Heading fontSize="2xl" className="font-poppins">
              Elevate Your Coding Skills Together
            </Heading>
            <Text fontSize="xs" className="font-poppins">
              Reach Your Coding Goals with 1,000+ Challenges
            </Text>
          </VStack>
          <Box
            position="absolute"
            bottom="0"
            left="0"
            width="100%"
            height="70%"
          >
            <GeometricDesign />
          </Box>
        </Box>

        {/* Right Side */}
        <Box flex="1" bg="white" p={6} borderRadius="2xl" ml={20} mt={4} mb={4}>
          <VStack spacing={3} align="stretch">
            <Heading size="sm" mb={1} className="font-poppins">
            Register for Your Account 
            </Heading>
            <Flex gap={2} mt={2}>
              <FormControl>
                <FormLabel fontSize="xs" className="font-poppins" >
                  First name
                </FormLabel>
                <Input
                  size="xs"
                  placeholder="Jhon"
                  className="font-poppins"
                  borderRadius={5}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="xs" className="font-poppins">
                  Last name
                </FormLabel>
                <Input
                  size="xs"
                  placeholder="Doe"
                  className="font-poppins"
                  borderRadius={5}
                />
              </FormControl>
            </Flex>
            <FormControl>
              <FormLabel fontSize="xs" className="font-poppins">
                Email address
              </FormLabel>
              <Input
                size="xs"
                type="email"
                placeholder="JhonDoe@email.com"
                className="font-poppins"
                borderRadius={5}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="xs" className="font-poppins">
                Phone number
              </FormLabel>
              <Flex>
                <Menu>
                  <MenuButton
                    as={Button}
                    size="xs"
                    maxWidth="100px"
                    mr={2}
                    rightIcon={<ChevronDownIcon />}
                    className="font-poppins"
                    display="flex"
                    alignItems="center"
                  >
                    <img
                      src={selectedCountry.flag}
                      alt={selectedCountry.name}
                      style={{ width: 20, height: 15, marginRight: 8 }}
                    />
                  </MenuButton>

                  <MenuList
                    maxHeight="150px"
                    overflowY="auto"
                    minWidth="100px"
                    padding={1}
                    fontSize="xs"
                  >
                    {countryCodes.map((country) => (
                      <MenuItem
                        key={country.code}
                        onClick={() => setSelectedCountry(country)}
                      >
                        <img
                          src={country.flag}
                          alt={country.name}
                          style={{ width: 20, height: 15, marginRight: 8 }}
                        />
                        {country.name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>

                <Input
                  size="xs"
                  type="tel"
                  value={`${selectedCountry.code} ${phoneNumber}`}
                  onChange={(e) =>
                    setPhoneNumber(
                      e.target.value.replace(selectedCountry.code, "").trim()
                    )
                  }
                  placeholder="Phone number"
                  className="font-poppins"
                  borderRadius={5}
                />
              </Flex>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="xs" className="font-poppins">
                Password
              </FormLabel>
              <Input
                size="xs"
                type="password"
                placeholder="Password"
                className="font-poppins"
                borderRadius={5}
              />
              <FormLabel fontSize="xs" className="font-poppins" mt={3}>
                Confirm Password
              </FormLabel>
              <Input
                size="xs"
                type="password"
                placeholder="Password"
                className="font-poppins"
                borderRadius={5}
              />
              <Text
                fontSize="2xs"
                color="gray.500"
                mt={1}
                className="font-poppins"
              >
                Use 8 or more characters with a mix of letters, numbers &
                symbols
              </Text>
            </FormControl>
            <Checkbox size="sm" className="font-poppins">
              <Text fontSize="2xs">
                By creating an account, I agree to your Terms of use and Privacy
                Policy
              </Text>
            </Checkbox>
            <Checkbox size="sm" className="font-poppins">
              <Text fontSize="2xs">
              By creating an account, I agree to receive updates on new coding challenges, platform enhancements, and coding tips
              </Text>
            </Checkbox>
            <Button
              size="xs"
              colorScheme="gray"
              width="100%"
              className="font-poppins"
              p={4}
              mt={3}
            >
              Sign up
            </Button>
            <Text
              textAlign="center"
              fontSize="xs"
              className="font-poppins"
              p={2}
              mb={2}
            >
              Already have an account?{" "}
              <Link color="blue.500" className="font-poppins">
                Log in
              </Link>
            </Text>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default SignupForm;
