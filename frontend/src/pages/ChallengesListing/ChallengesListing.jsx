import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  CardBody,
  Heading,
  Stack,
  Text,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";

// Countdown function remains the same
const getCountdown = (endDate) => {
  // ... (previous implementation)
};

export const ChallengesListing = () => {
  const [filter, setFilter] = useState("active");
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/questions/getAllQuestions"
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    setFilteredQuestions(
      questions.filter(
        (question) =>
          filter === "active"
            ? !question.isArchived
            : filter === "archived"
            ? question.isArchived
            : true // For "upcoming", show all non-archived questions
      )
    );
  }, [filter, questions]);

  // Separate questions by difficulty
  const easyQuestions = filteredQuestions.filter(
    (question) => question.difficulty === "easy"
  );
  const mediumQuestions = filteredQuestions.filter(
    (question) => question.difficulty === "medium"
  );
  const hardQuestions = filteredQuestions.filter(
    (question) => question.difficulty === "hard"
  );

  const handleViewDetails = (questionId) => {
    navigate(`/ide/${questionId}`);
  };

  const renderQuestions = (questions, difficultyColor) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {questions.map((question) => (
        <Card
          key={question._id}
          borderRadius="lg"
          shadow="md"
          overflow="hidden"
          maxWidth="full"
        >
          <Box height="4px" bg={difficultyColor} borderRadius="full"></Box>
          <CardBody>
            <Heading size="sm" mb={2} fontWeight="semibold">
              {question.name}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Ends in: {getCountdown(question.endDate)}
            </Text>
            <Button
              size="sm"
              variant="outline"
              colorScheme="blue"
              mt={4}
              onClick={() => handleViewDetails(question._id)}
            >
              View Details
            </Button>
          </CardBody>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      {/* Title */}
      <Heading
        as="h1"
        size="lg"
        mb={4}
        className="text-left text-2xl font-bold"
      >
        Contests
      </Heading>

      {/* Breadcrumb */}
      <Breadcrumb fontWeight="medium" fontSize="sm" mb={4}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">Contests</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Filter Buttons */}
      <Stack direction="row" spacing={4} mb={6} className="justify-start">
        <Button
          colorScheme={filter === "active" ? "blue" : "gray"}
          size="sm"
          onClick={() => setFilter("active")}
        >
          Active Contests
        </Button>
        <Button
          colorScheme={filter === "upcoming" ? "blue" : "gray"}
          size="sm"
          onClick={() => setFilter("upcoming")}
        >
          Upcoming Contests
        </Button>
        <Button
          colorScheme={filter === "archived" ? "blue" : "gray"}
          size="sm"
          onClick={() => setFilter("archived")}
        >
          Archived Contests
        </Button>
      </Stack>

      {/* Easy Questions */}
      {easyQuestions.length > 0 && (
        <>
          <Heading size="md" className="text-lg font-semibold mb-4">
            Easy Challenges
          </Heading>
          {renderQuestions(easyQuestions, "green.400")}
        </>
      )}

      {/* Medium Questions */}
      {mediumQuestions.length > 0 && (
        <>
          <Heading size="md" className="text-lg font-semibold mt-8 mb-4">
            Medium Challenges
          </Heading>
          {renderQuestions(mediumQuestions, "blue.400")}
        </>
      )}

      {/* Hard Questions */}
      {hardQuestions.length > 0 && (
        <>
          <Heading size="md" className="text-lg font-semibold mt-8 mb-4">
            Hard Challenges
          </Heading>
          {renderQuestions(hardQuestions, "red.400")}
        </>
      )}
    </div>
  );
};

export default ChallengesListing;
