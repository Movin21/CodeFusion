import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  Text,
  VStack,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

// ... (keep the GeometricDesign and countryCodes as they were)
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
const signupSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
  confirmPassword: z.string(),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  agreeUpdates: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    console.log(data);
    // Handle form submission here
  };
   
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(selectedCountry.code, "").trim();
    setPhoneNumber(value);
    setValue("phoneNumber", `${selectedCountry.code} ${value}`, { shouldValidate: true });
  };
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
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
        height="660px"
        bg="black"
        borderRadius="xl"
        overflow="hidden"
      >
        {/* Left Side */}
        {/* ... (keep the left side as it was) */}
        <Box flex="1" color="white" p={6} position="relative" mb={88}>
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
          <VStack spacing={3} align="stretch" as="form" onSubmit={handleSubmit(onSubmit)}>
            <Heading size="sm" mb={1} className="font-poppins">
              Register for Your Account 
            </Heading>
            <Flex gap={2} mt={2}>
              <FormControl isInvalid={!!errors.firstName}>
                <FormLabel fontSize="xs" className="font-poppins">
                  First name
                </FormLabel>
                <Input
                  size="xs"
                  placeholder="John"
                  className="font-poppins"
                  borderRadius={5}
                  {...register("firstName")}
                />
                <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.lastName}>
                <FormLabel fontSize="xs" className="font-poppins">
                  Last name
                </FormLabel>
                <Input
                  size="xs"
                  placeholder="Doe"
                  className="font-poppins"
                  borderRadius={5}
                  {...register("lastName")}
                />
                <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
              </FormControl>
            </Flex>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel fontSize="xs" className="font-poppins">
                Email address
              </FormLabel>
              <Input
                size="xs"
                type="email"
                placeholder="JohnDoe@email.com"
                className="font-poppins"
                borderRadius={5}
                {...register("email")}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.phoneNumber}>
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
                onClick={() => {
                  setSelectedCountry(country);
                  setValue("phoneNumber", `${country.code} ${phoneNumber}`, { shouldValidate: true });
                }}
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
          onChange={handlePhoneChange}
          placeholder="Phone number"
          className="font-poppins"
          borderRadius={5}
        />
      </Flex>
      <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
    </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel fontSize="xs" className="font-poppins">
                Password
              </FormLabel>
              <InputGroup>
              <Input
                size="xs"
                type={show ? 'text' : 'password'}
                placeholder="Password"
                className="font-poppins"
                borderRadius={5}
                {...register("password")}
               
              />
               <InputRightElement width="4rem"> {/* Smaller width */}
                  <IconButton
                    h="1.0rem" // Smaller button height
                    size="xs"
                    onClick={handleClick}
                    aria-label={show ? 'Hide password' : 'Show password'}
                    icon={show ? <ViewOffIcon /> : <ViewIcon />}
                    mb={4}
                  />
                </InputRightElement>
                </InputGroup>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.confirmPassword}>
              <FormLabel fontSize="xs" className="font-poppins" mt={3}>
                Confirm Password
              </FormLabel>
              <InputGroup>
              <Input
                type={show ? 'text' : 'password'}
                size="xs"
                placeholder="Confirm Password"
                className="font-poppins"
                borderRadius={5}
                {...register("confirmPassword")}
              />
                  <InputRightElement width="4rem"> {/* Smaller width */}
                  <IconButton
                    h="1.0rem" // Smaller button height
                    size="xs"
                    onClick={handleClick}
                    aria-label={show ? 'Hide password' : 'Show password'}
                    icon={show ? <ViewOffIcon /> : <ViewIcon />}
                    mb={4}
                  />
                </InputRightElement>

              </InputGroup>
              <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
            </FormControl>
            <Text
              fontSize="2xs"
              color="gray.500"
              mt={1}
              className="font-poppins"
            >
              Use 8 or more characters with a mix of letters, numbers &
              symbols
            </Text>
            <FormControl isInvalid={!!errors.agreeTerms}>
              <Checkbox size="sm" className="font-poppins" {...register("agreeTerms")}>
                <Text fontSize="2xs">
                  By creating an account, I agree to your Terms of use and Privacy
                  Policy
                </Text>
              </Checkbox>
              <FormErrorMessage>{errors.agreeTerms?.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <Checkbox size="sm" className="font-poppins" {...register("agreeUpdates")}>
                <Text fontSize="2xs">
                  By creating an account, I agree to receive updates on new coding challenges, platform enhancements, and coding tips
                </Text>
              </Checkbox>
            </FormControl>
            <Button
              size="xs"
              colorScheme="gray"
              width="100%"
              className="font-poppins"
              p={4}
              mt={3}
              type="submit"
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
              <Link color="blue.500" className="font-poppins" onClick={() => navigate('/login')}>
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