import React, { useState, useEffect } from "react";
import axios from "axios";
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

// Countdown function
const getCountdown = (endDate) => {
  if (!endDate) return "No end date";

  const now = new Date();
  const timeRemaining = new Date(endDate) - now;
  if (timeRemaining < 0) return "Ended";

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

const ChallengeCard = ({ question }) => {
  const [countdown, setCountdown] = useState(getCountdown(question.endDate));

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(question.endDate));
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [question.endDate]);

  return (
    <Card borderRadius="lg" shadow="md" overflow="hidden" maxWidth="full">
      <Box height="4px" bg="blue.400" borderRadius="full"></Box>
      <CardBody>
        <Heading size="sm" mb={2} fontWeight="semibold">
          {question.name}
        </Heading>
        <Text fontSize="sm" color="gray.500">
          Ends in: {countdown}
        </Text>
        <Button
          size="sm"
          variant="outline"
          colorScheme="blue"
          mt={4}
          onClick={() => alert(`Viewing details of ${question.name}`)}
        >
          View Details
        </Button>
      </CardBody>
    </Card>
  );
};

export const ChallengesListing = () => {
  const [filter, setFilter] = useState("active");
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

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

  const renderQuestionCards = (questions) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {questions.map((question) => (
        <ChallengeCard key={question._id} question={question} />
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
          {renderQuestionCards(easyQuestions)}
        </>
      )}

      {/* Medium Questions */}
      {mediumQuestions.length > 0 && (
        <>
          <Heading size="md" className="text-lg font-semibold mt-8 mb-4">
            Medium Challenges
          </Heading>
          {renderQuestionCards(mediumQuestions)}
        </>
      )}

      {/* Hard Questions */}
      {hardQuestions.length > 0 && (
        <>
          <Heading size="md" className="text-lg font-semibold mt-8 mb-4">
            Hard Challenges
          </Heading>
          {renderQuestionCards(hardQuestions)}
        </>
      )}
    </div>
  );
};

export default ChallengesListing;
