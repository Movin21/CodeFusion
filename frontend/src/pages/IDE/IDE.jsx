import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Tag,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor"; // Assuming you already have a CodeEditor component

const IDE = () => {
  const { id } = useParams(); // Get the id from the URL
  const [challengeData, setChallengeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallengeData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/questions/getQuestion/${id}`
        );
        setChallengeData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching challenge data:", err);
        setError("Failed to load challenge data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchChallengeData();
  }, [id]);

  // Function to convert milliseconds to a readable date string
  const formatDate = (milliseconds) => {
    const date = new Date(milliseconds);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <Box
        minH="100vh"
        bg="#0f0a19"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        minH="100vh"
        bg="#0f0a19"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="xl">{error}</Text>
      </Box>
    );
  }

  if (!challengeData) {
    return null;
  }

  return (
    <Box minH="100vh" bg="#0f0a19" color="white">
      <Box maxW="1200px" margin="auto" p={8}>
        <VStack align="stretch" spacing={8}>
          {/* Challenge Header */}
          <Box>
            <Heading as="h1" size="xl" mb={2}>
              {challengeData.name}
            </Heading>
            <HStack spacing={4}>
              <Tag
                size="md"
                variant="solid"
                colorScheme={
                  challengeData.difficulty === "easy"
                    ? "green"
                    : challengeData.difficulty === "medium"
                      ? "yellow"
                      : "red"
                }
              >
                {challengeData.difficulty.charAt(0).toUpperCase() +
                  challengeData.difficulty.slice(1)}
              </Tag>
              <Text fontSize="sm">Max Score: 100</Text>
              <Text fontSize="sm">
                Ends: {formatDate(challengeData.endDate)}
              </Text>
            </HStack>
          </Box>
          <Divider />
          {/* Challenge Description */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              Problem
            </Heading>
            <Text fontSize="md" whiteSpace="pre-wrap">
              {challengeData.description}
            </Text>
          </Box>
          {/* Constraints */}
          <Box>
            <Heading as="h3" size="md" mb={2}>
              Constraints
            </Heading>
            <Text fontSize="md" whiteSpace="pre-wrap">
              {challengeData.constraints}
            </Text>
          </Box>
          <Divider />

          <Box>
            <Heading as="h3" size="lg" mb={4}>
              Solution
            </Heading>
            <CodeEditor />
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default IDE;
