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

const getCountdown = (endDate) => {
  const now = new Date().getTime();
  const end = new Date(endDate).getTime();
  const timeLeft = end - now;

  if (timeLeft <= 0) {
    return "Expired";
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  let countdownString = "";
  if (days > 0) countdownString += `${days}d `;
  if (hours > 0) countdownString += `${hours}h `;
  if (minutes > 0) countdownString += `${minutes}m `;
  if (seconds > 0) countdownString += `${seconds}s`;

  return countdownString.trim();
};

const QuestionCard = ({ question, difficultyColor, onViewDetails, filter }) => {
  const [countdown, setCountdown] = useState(getCountdown(question.endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown(question.endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [question.endDate]);

  const isExpired = countdown === "Expired";

  return (
    <Card
      key={question._id}
      borderRadius="lg"
      shadow="md"
      overflow="hidden"
      maxWidth="full"
      bg="#1a1a2e"
    >
      <Box height="4px" bg={difficultyColor} borderRadius="full"></Box>
      <CardBody>
        <Heading size="sm" mb={2} fontWeight="semibold" color="white">
          {question.name}
        </Heading>
        <Text fontSize="sm" color={isExpired ? "red.300" : "gray.300"}>
          {isExpired ? "Contest Ended" : `Ends in: ${countdown}`}
        </Text>
        <Button
          size="sm"
          variant="outline"
          colorScheme="whiteAlpha"
          mt={4}
          onClick={() => onViewDetails(question._id)}
          isDisabled={isExpired || filter === "archived"}
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
      questions.filter((question) =>
        filter === "active"
          ? !question.isArchived
          : filter === "archived"
            ? question.isArchived
            : true
      )
    );
  }, [filter, questions]);

  const questionsByDifficulty = {
    easy: {
      questions: filteredQuestions.filter((q) => q.difficulty === "easy"),
      color: "green.400",
      title: "Easy Challenges",
    },
    medium: {
      questions: filteredQuestions.filter((q) => q.difficulty === "medium"),
      color: "blue.400",
      title: "Medium Challenges",
    },
    hard: {
      questions: filteredQuestions.filter((q) => q.difficulty === "hard"),
      color: "red.400",
      title: "Hard Challenges",
    },
  };

  const handleViewDetails = (questionId) => {
    navigate(`/ide/${questionId}`);
  };

  const renderQuestionSection = (difficulty) => {
    const { questions, color, title } = questionsByDifficulty[difficulty];

    if (questions.length === 0) return null;

    return (
      <div key={difficulty}>
        <Heading
          size="md"
          className="text-lg font-semibold mb-4 mt-8"
          color="white"
        >
          {title}
        </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {questions.map((question) => (
            <QuestionCard
              key={question._id}
              question={question}
              difficultyColor={color}
              onViewDetails={handleViewDetails}
              filter={filter}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#0f0a19] min-h-screen">
      <div className="container mx-auto p-4">
        <Heading
          as="h1"
          size="lg"
          mb={4}
          className="text-left text-2xl font-bold text-white"
        >
          Contests
        </Heading>

        <Breadcrumb fontWeight="medium" fontSize="sm" mb={4} color={"white"}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" color="white">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#" color="white">
              Contests
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Stack direction="row" spacing={4} mb={6} className="justify-start">
          <Stack direction="row" spacing={4} mb={6} className="justify-start">
            <Button
              backgroundColor={filter === "active" ? "#527D9F" : "transparent"} // Custom color for active button
              variant={filter === "active" ? "solid" : "outline"} // Solid variant for active button
              size="sm"
              px={6}
              py={2}
              borderRadius="md"
              borderColor={filter === "active" ? undefined : "gray.400"} // Gray border for inactive button
              color={filter === "active" ? "white" : "white"} // Text color is always white
              _hover={
                filter === "active"
                  ? {
                      backgroundColor: "#527D9F", // Keep the same color on hover for active button
                      color: "white", // Keep text color white
                    }
                  : {
                      backgroundColor: "gray.100", // Light gray for inactive hover
                      color: "black", // Change text color to black on hover
                    }
              } // Hover effect
              onClick={() => setFilter("active")}
            >
              Active Contests
            </Button>

            <Button
              backgroundColor={
                filter === "archived" ? "#527D9F" : "transparent"
              } // Custom color for active button
              variant={filter === "archived" ? "solid" : "outline"} // Solid variant for archived button
              size="sm"
              px={6}
              py={2}
              borderRadius="md"
              borderColor={filter === "archived" ? undefined : "gray.400"} // Gray border for inactive button
              color={filter === "archived" ? "white" : "white"} // Text color is always white
              _hover={
                filter === "archived"
                  ? {
                      backgroundColor: "#527D9F", // Keep the same color on hover for archived button
                      color: "white", // Keep text color white
                    }
                  : {
                      backgroundColor: "gray.100", // Light gray for inactive hover
                      color: "black", // Change text color to black on hover
                    }
              } // Hover effect
              onClick={() => setFilter("archived")}
            >
              Archived Contests
            </Button>
          </Stack>
        </Stack>

        {Object.keys(questionsByDifficulty).map(renderQuestionSection)}
      </div>
    </div>
  );
};

export default ChallengesListing;
