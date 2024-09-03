import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import { Text } from "@chakra-ui/react";

function IDE() {
  return (
    <>
      <Box borderWidth="1px" borderRadius="xl" m={5}>
        <Box w="100%" p={8} color="white" bg="#0f0a19" borderRadius="xl">
          <Text fontSize="3xl">Question:</Text>
          <Text fontSize="md" mt={3}>
            Write a function in Python that takes a list of numbers as input and
            returns the sum of all the even numbers in the list.
          </Text>
          <Text fontSize="xl" mt={4}>
            Example:
          </Text>
          <Text fontSize="md">
            If the input list is [1, 2, 3, 4, 5, 6], the function should return
            12 because 2 + 4 + 6 = 12.
          </Text>
        </Box>
      </Box>

      <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
        <CodeEditor />
      </Box>
    </>
  );
}

export default IDE;
