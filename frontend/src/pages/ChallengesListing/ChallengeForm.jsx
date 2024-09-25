import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Textarea,
  VStack,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

const ChallengeSubmissionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const {
    isOpen: isSuccessOpen,
    onOpen: onSuccessOpen,
    onClose: onSuccessClose,
  } = useDisclosure();
  const {
    isOpen: isErrorOpen,
    onOpen: onErrorOpen,
    onClose: onErrorClose,
  } = useDisclosure();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const endDateTime = new Date(data.endDate + "T" + data.endTime);
      const endDateInMilliseconds = endDateTime.getTime();

      const submissionData = {
        ...data,
        endDate: endDateInMilliseconds,
        isArchived: false,
      };
      delete submissionData.endTime;

      const response = await axios.post(
        "http://localhost:5000/questions/createQuestion",
        submissionData
      );

      console.log("Challenge added successfully:", response.data);
      onSuccessOpen();

      setTimeout(() => {
        navigate("/challenge-listing");
      }, 10000);
    } catch (error) {
      console.error("Error adding challenge:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred while adding the challenge."
      );
      onErrorOpen();
    }
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString().split("T")[0];
  };

  return (
    <div>
      <Box bg="#0f0a19" minH="100vh" py={10} px={5}>
        <Heading as="h1" size="xl" textAlign="center" mb={4} color="white">
          Add Your Coding Challenge Here!
        </Heading>
        <Text textAlign="center" mb={8} color="gray.300">
          Use this form to create a new coding challenge. Provide all necessary
          details to set up an engaging and clear challenge for participants.
        </Text>
        <Box
          maxWidth="md"
          margin="auto"
          mt={8}
          className="bg-gray-800 p-8 rounded-md shadow-lg border-2 border-gray-600" // Using Tailwind classes
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4} align="stretch">
              <FormControl isInvalid={errors.name} isRequired>
                <FormLabel htmlFor="name" color="white">
                  Challenge Name
                </FormLabel>
                <Input
                  id="name"
                  {...register("name", {
                    required: "Challenge name is required",
                  })}
                  color="white" // Input text color white
                  borderColor="white" // Input border color white
                />
                <FormErrorMessage color="red.300">
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.endDate} isRequired>
                <FormLabel htmlFor="endDate" color="white">
                  End Date
                </FormLabel>
                <Input
                  id="endDate"
                  type="date"
                  min={getCurrentDate()}
                  {...register("endDate", {
                    required: "End date is required",
                    validate: (value) =>
                      new Date(value) > new Date() ||
                      "End date must be in the future",
                  })}
                  color="white"
                  borderColor="white" // Input border color white
                />
                <FormErrorMessage color="red.300">
                  {errors.endDate && errors.endDate.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.endTime} isRequired>
                <FormLabel htmlFor="endTime" color="white">
                  End Time
                </FormLabel>
                <Input
                  id="endTime"
                  type="time"
                  {...register("endTime", { required: "End time is required" })}
                  color="white"
                  borderColor="white" // Input border color white
                />
                <FormErrorMessage color="red.300">
                  {errors.endTime && errors.endTime.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.difficulty} isRequired>
                <FormLabel htmlFor="difficulty" color="white">
                  Difficulty
                </FormLabel>
                <Select
                  id="difficulty"
                  {...register("difficulty", {
                    required: "Difficulty is required",
                  })}
                  color="white"
                  borderColor="white" // Select border color white
                >
                  <option value="easy" style={{ color: "white" }}>
                    Easy
                  </option>
                  <option value="medium" style={{ color: "white" }}>
                    Medium
                  </option>
                  <option value="hard" style={{ color: "white" }}>
                    Hard
                  </option>
                </Select>
                <FormErrorMessage color="red.300">
                  {errors.difficulty && errors.difficulty.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.description} isRequired>
                <FormLabel htmlFor="description" color="white">
                  Description
                </FormLabel>
                <Textarea
                  id="description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  color="white"
                  borderColor="white" // Textarea border color white
                />
                <FormErrorMessage color="red.300">
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.constraints} isRequired>
                <FormLabel htmlFor="constraints" color="white">
                  Constraints
                </FormLabel>
                <Textarea
                  id="constraints"
                  {...register("constraints", {
                    required: "Constraints are required",
                  })}
                  color="white"
                  borderColor="white" // Textarea border color white
                />
                <FormErrorMessage color="red.300">
                  {errors.constraints && errors.constraints.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                width="full"
                bg="
#1A202C"
                color="white"
                _hover={{ bg: "#537D9E", color: "white" }} // Change background on hover
              >
                Submit Challenge
              </Button>
            </VStack>
          </form>
        </Box>

        <Modal isOpen={isSuccessOpen} onClose={onSuccessClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color="green.400">Success</ModalHeader>
            <ModalBody color="black">
              Challenge added successfully! You will be redirected to the
              challenge listing page in 10 seconds.
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-primary hover:bg-primary-dark text-white"
                mr={3}
                onClick={() => navigate("/ChallengesListing")}
              >
                Go to Challenge Listing
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isErrorOpen} onClose={onErrorClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color="red.400">Error</ModalHeader>
            <ModalBody color="white">{errorMessage}</ModalBody>
            <ModalFooter>
              <Button
                className="bg-red-500 hover:bg-red-700 text-white"
                mr={3}
                onClick={onErrorClose}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </div>
  );
};

export default ChallengeSubmissionForm;
