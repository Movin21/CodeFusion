import React, { useState, useEffect } from "react";
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

// Mock challenge data
const challenges = [
  // Active Challenges
  {
    id: 1,
    name: "Easy Challenge",
    endDate: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
    difficulty: "easy",
    status: "active",
  },
  ...Array(6)
    .fill()
    .map((_, i) => ({
      id: i + 2,
      name: `Medium Challenge ${i + 1}`,
      endDate: new Date(Date.now() + (i + 1) * 60 * 60 * 1000), // Varying time from now
      difficulty: "medium",
      status: "active",
    })),
  ...Array(12)
    .fill()
    .map((_, i) => ({
      id: i + 8,
      name: `Hard Challenge ${i + 1}`,
      endDate: new Date(Date.now() + (i + 2) * 60 * 60 * 1000), // Varying time from now
      difficulty: "hard",
      status: "active",
    })),
  // Upcoming Challenges
  ...Array(Math.floor(8) + 2)
    .fill()
    .map((_, i) => ({
      id: i + 20,
      name: `Upcoming Challenge ${i + 1}`,
      endDate: new Date(Date.now() + (i + 5) * 60 * 60 * 1000), // Varying future time
      difficulty: ["easy", "medium", "hard"][i % 3], // Rotate difficulty
      status: "upcoming",
    })),
  // Archived Challenges
  ...Array(Math.floor(5) + 1)
    .fill()
    .map((_, i) => ({
      id: i + 30,
      name: `Archived Challenge ${i + 2}`,
      endDate: new Date(Date.now() - (i + 1) * 60 * 60 * 1000), // Varying past time
      difficulty: ["easy", "medium", "hard"][i % 3], // Rotate difficulty
      status: "archived",
    })),
];

// Countdown function to calculate remaining time
const getCountdown = (endDate) => {
  const now = new Date();
  const timeRemaining = endDate - now;
  if (timeRemaining < 0) return "Ended";

  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return `${hours}h ${minutes}m ${seconds}s`;
};

export const ChallengesListing = () => {
  const [filter, setFilter] = useState("active");
  const [filteredChallenges, setFilteredChallenges] = useState([]);

  useEffect(() => {
    setFilteredChallenges(
      challenges.filter((challenge) => challenge.status === filter)
    );
  }, [filter]);

  // Separate challenges by difficulty
  const easyChallenges = filteredChallenges.filter(
    (challenge) => challenge.difficulty === "easy"
  );
  const mediumChallenges = filteredChallenges.filter(
    (challenge) => challenge.difficulty === "medium"
  );
  const hardChallenges = filteredChallenges.filter(
    (challenge) => challenge.difficulty === "hard"
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

      {/* Easy Challenges */}
      {easyChallenges.length > 0 && (
        <>
          <Heading size="md" className="text-lg font-semibold mb-4">
            Easy Challenges
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {easyChallenges.map((challenge) => (
              <Card
                key={challenge.id}
                borderRadius="lg"
                shadow="md"
                overflow="hidden"
                maxWidth="full" // Ensure cards don't overflow
              >
                <Box height="4px" bg="green.400" borderRadius="full"></Box>
                <CardBody>
                  <Heading size="sm" mb={2} fontWeight="semibold">
                    {challenge.name}
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    Ends in: {getCountdown(challenge.endDate)}
                  </Text>
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme="blue"
                    mt={4}
                    onClick={() =>
                      alert(`Viewing details of ${challenge.name}`)
                    }
                  >
                    View Details
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Medium Challenges */}
      {mediumChallenges.length > 0 && (
        <>
          <Heading size="md" className="text-lg font-semibold mt-8 mb-4">
            Medium Challenges
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediumChallenges.map((challenge) => (
              <Card
                key={challenge.id}
                borderRadius="lg"
                shadow="md"
                overflow="hidden"
                maxWidth="full" // Ensure cards don't overflow
              >
                <Box height="4px" bg="blue.400" borderRadius="full"></Box>
                <CardBody>
                  <Heading size="sm" mb={2} fontWeight="semibold">
                    {challenge.name}
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    Ends in: {getCountdown(challenge.endDate)}
                  </Text>
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme="blue"
                    mt={4}
                    onClick={() =>
                      alert(`Viewing details of ${challenge.name}`)
                    }
                  >
                    View Details
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Hard Challenges */}
      {hardChallenges.length > 0 && (
        <>
          <Heading size="md" className="text-lg font-semibold mt-8 mb-4">
            Hard Challenges
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hardChallenges.map((challenge) => (
              <Card
                key={challenge.id}
                borderRadius="lg"
                shadow="md"
                overflow="hidden"
                maxWidth="full" // Ensure cards don't overflow
              >
                <Box height="4px" bg="red.400" borderRadius="full"></Box>
                <CardBody>
                  <Heading size="sm" mb={2} fontWeight="semibold">
                    {challenge.name}
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    Ends in: {getCountdown(challenge.endDate)}
                  </Text>
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme="blue"
                    mt={4}
                    onClick={() =>
                      alert(`Viewing details of ${challenge.name}`)
                    }
                  >
                    View Details
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ChallengesListing;
