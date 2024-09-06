import { useState } from "react";
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
} from "@chakra-ui/react";
import { executeCode } from "./api";
import { evaluateTestCases } from "./testCase";

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const question = "Write a function that returns the factorial of a number.";
  const code = `
function factorial(n) {
 
  }
  return n * factorial(n - 1);
}
`;

  const runCode = async () => {
    const userSourceCode = editorRef.current.getValue();
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
        onOpen(); // Open the modal when an error occurs
      } else if (!passedAllTestCases) {
        setIsError(true);
        onOpen();
        toast({
          title: "Something is Wrong!",
          description: "Your code failed some test cases!",
          status: "error",
          duration: 6000,
        });
      } else {
        toast({
          title: "Well Done!",
          description: "Your code passed all test cases!",
          status: "success",
          duration: 6000,
        });
        setIsError(false);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
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

      {/* Modal for error */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Wrong Answer!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              You have answered wrong to this question. Do you need to retry or
              get assistance from peers?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Retry
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                // Logic to get help from peers can be added here
                onClose();
              }}
            >
              Get Help from Peers
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Output;
