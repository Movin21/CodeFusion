import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define the login schema using Zod
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email  is required" })
    .refine(
      (value) => {
        // Simple email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Simple phone regex (assumes a 10-digit number)
        const phoneRegex = /^\d{10}$/;
        return emailRegex.test(value) || phoneRegex.test(value);
      },
      { message: "Invalid email or phone number format" }
    ),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginScreen = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/login",
        data
      );

      if (response.data.token) {
        // Store the token in localStorage
        localStorage.setItem("token", response.data.token);

        // Check the user's role
        const userRole = response.data.role;

        // Show success message
        toast({
          title: "Login successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // Redirect based on user role
        if (userRole === "student") {
          navigate("/studentprofile");
        } else if (userRole === "mentor") {
          navigate("/profile");
        } else {
          // Handle unexpected role
          console.error("Unexpected user role:", userRole);
          navigate("/login"); // Fallback navigation
        }
      }
    } catch (error) {
      // Show error message
      toast({
        title: "Login failed",
        description:
          error.response?.data?.error || "An error occurred during login",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex
      minHeight="100vh"
      width="full"
      align="center"
      justifyContent="center"
      position="relative"
      bg="black"
    >
      <Box
        borderWidth={1}
        px={3}
        width="full"
        maxWidth="400px"
        textAlign="center"
        boxShadow="md"
        bg="white"
        mt="10px"
        height="auto"
        p={6}
        borderRadius="2xl"
      >
        <Box p={2}>
          <Flex justify="center" align="center">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              height="110px"
              width="110px"
            />
          </Flex>
          <VStack
            spacing={3}
            align="stretch"
            as="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Text
              fontSize="sm"
              fontWeight="bold"
              className="font-poppins"
              mb={3}
            >
              Sign In to Continue
            </Text>

            <FormControl isInvalid={!!errors.email}>
              <FormLabel fontSize="xs" className="font-poppins">
                Email or mobile phone number
              </FormLabel>
              <Input
                {...register("email")}
                placeholder="Enter your email or phone"
                fontSize="xs"
                className="font-poppins"
                borderRadius={5}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel fontSize="xs" className="font-poppins">
                Your password
              </FormLabel>
              <InputGroup>
                <Input
                  {...register("password")}
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  fontSize="xs"
                  className="font-poppins"
                  borderRadius={5}
                />
                <InputRightElement width="4rem">
                  <IconButton
                    h="1.5rem"
                    size="xs"
                    onClick={handleClick}
                    aria-label={show ? "Hide password" : "Show password"}
                    icon={show ? <ViewOffIcon /> : <ViewIcon />}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              borderRadius="lg"
              bg="gray.100"
              width="full"
              py={4}
              className="font-poppins"
              fontSize="xs"
              isLoading={isSubmitting}
            >
              Log in
            </Button>

            <Text fontSize="xs" className="font-poppins">
              By continuing, you agree to the{" "}
              <Link color="blue.500">Terms of use</Link> and{" "}
              <Link color="blue.500">Privacy Policy</Link>.
            </Text>

            <Flex
              justify="space-between"
              fontSize="xs"
              className="font-poppins"
            >
              <Link>Other issue with sign in</Link>
              <Link>Forget your password</Link>
            </Flex>
          </VStack>
        </Box>

        <Box mt={4} borderTopWidth={1} pt={4} pb={4}>
          <Text fontSize="xs" className="font-poppins">
            New to our community
          </Text>
          <Button
            mt={3}
            width="full"
            variant="outline"
            className="font-poppins"
            fontSize="2xs"
            onClick={() => navigate("/signup")}
          >
            Create an account
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginScreen;
