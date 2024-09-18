import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Box,
  Button,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  VStack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FaExclamationTriangle, FaRedo, FaUsers } from "react-icons/fa";
import { executeCode } from "./api";
import { evaluateTestCases } from "./testCase";

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const {
    isOpen: isErrorOpen,
    onOpen: onErrorOpen,
    onClose: onErrorClose,
  } = useDisclosure();
  const {
    isOpen: isSuccessOpen,
    onOpen: onSuccessOpen,
    onClose: onSuccessClose,
  } = useDisclosure();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const question =
    "Write a function in Python that takes a list of numbers as input and returns the sum of all the even numbers in the list.";

  const runCode = async () => {
    const userSourceCode = editorRef.current.getValue();
    const code = userSourceCode;
    if (!userSourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, userSourceCode);
      const outputLines = result.output.split("\n");
      setOutput(outputLines);
      // Evaluate the test cases using the evaluateTestCases function
      const passedAllTestCases = await evaluateTestCases(question, code);
      if (result.stderr) {
        setIsError(true);
        onErrorOpen();
      } else if (!passedAllTestCases) {
        setIsError(true);
        onErrorOpen();
        showToast(
          "Test Case Failed",
          "Your code didn't pass all test cases. Please review and try again.",
          "error"
        );
      } else {
        setIsError(false);
        onSuccessOpen();
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        showToast(
          "Success!",
          "Great job! Your code passed all test cases.",
          "success"
        );
      }
    } catch (error) {
      console.log(error);
      showToast(
        "Error",
        error.message || "An error occurred while running your code.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position: "bottom",
      variant: "solid",
      containerStyle: {
        border: "1px solid",
        borderColor: status === "error" ? "red.500" : "green.500",
        borderRadius: "md",
        maxWidth: "400px",
        margin: "0 auto",
      },
    });
  };

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
      {/* Error Modal */}
      <Modal isOpen={isErrorOpen} onClose={onErrorClose}>
        <ModalOverlay />
        <ModalContent bg="#1e1e1e" color="white">
          <ModalHeader bg="#252525" borderTopRadius="md">
            <HStack>
              <Icon as={FaExclamationTriangle} color="red.500" />
              <Text>Oops! Wrong Answer</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <VStack spacing={4} align="stretch">
              <Text>
                Your code didn't pass all the test cases. Don't worry, it's all
                part of the learning process!
              </Text>
              <Text fontWeight="bold">What would you like to do next?</Text>
            </VStack>
          </ModalBody>
          <ModalFooter bg="#252525" borderBottomRadius="md">
            <HStack spacing={4}>
              <Button
                leftIcon={<FaRedo />}
                colorScheme="blue"
                onClick={onErrorClose}
              >
                Try Again
              </Button>
              <Button
                leftIcon={<FaUsers />}
                variant="outline"
                onClick={() => {
                  // Logic to get help from peers can be added here
                  onErrorClose();
                }}
              >
                Get Help from Peers
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Success Modal */}
      <Modal isOpen={isSuccessOpen} onClose={onSuccessClose}>
        <ModalOverlay />
        <ModalContent bg="#1e1e1e" color="white">
          <ModalHeader bg="#252525" borderTopRadius="md">
            <HStack>
              <Icon as={FaUsers} color="green.500" />
              <Text>Congratulations!</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <VStack spacing={4} align="stretch">
              <Text>
                You've successfully completed this challenge. Great job!
              </Text>
              <Text fontWeight="bold">What would you like to do next?</Text>
            </VStack>
          </ModalBody>
          <ModalFooter bg="#252525" borderBottomRadius="md">
            <HStack spacing={4}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  colorScheme="green"
                  onClick={() => {
                    // Logic to navigate to challenges page
                    console.log("Navigating to challenges page");
                    onSuccessClose();
                  }}
                >
                  Try a Different Challenge
                </Button>
              </motion.div>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Output;
