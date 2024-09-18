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
      // Convert end date and time to milliseconds
      const endDateTime = new Date(data.endDate + "T" + data.endTime);
      const endDateInMilliseconds = endDateTime.getTime();

      // Create a new object with all form data, replacing endDate and endTime with milliseconds
      const submissionData = {
        ...data,
        endDate: endDateInMilliseconds,
        isArchived: false, // Set isArchived to false for new challenges
      };
      delete submissionData.endTime; // Remove the separate time field

      // Send the data to your backend
      const response = await axios.post(
        "http://localhost:5000/questions/createQuestion",
        submissionData
      );

      console.log("Challenge added successfully:", response.data);
      onSuccessOpen();

      // Set a timeout to redirect after 10 seconds
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

  // Get current date in YYYY-MM-DD format for min attribute of date input
  const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString().split("T")[0];
  };

  return (
    <div className="m-5">
      <Heading as="h1" size="xl" textAlign="center" mb={4}>
        Add Your Coding Challenge Here !
      </Heading>
      <Text textAlign="center" mb={8}>
        Use this form to create a new coding challenge. Provide all necessary
        details to set up an engaging and clear challenge for participants.
      </Text>
      <Box maxWidth="md" margin="auto" mt={8}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4} align="stretch">
            <FormControl isInvalid={errors.name} isRequired>
              <FormLabel htmlFor="name">Challenge Name</FormLabel>
              <Input
                id="name"
                {...register("name", {
                  required: "Challenge name is required",
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.endDate} isRequired>
              <FormLabel htmlFor="endDate">End Date</FormLabel>
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
              />
              <FormErrorMessage>
                {errors.endDate && errors.endDate.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.endTime} isRequired>
              <FormLabel htmlFor="endTime">End Time</FormLabel>
              <Input
                id="endTime"
                type="time"
                {...register("endTime", { required: "End time is required" })}
              />
              <FormErrorMessage>
                {errors.endTime && errors.endTime.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.difficulty} isRequired>
              <FormLabel htmlFor="difficulty">Difficulty</FormLabel>
              <Select
                id="difficulty"
                {...register("difficulty", {
                  required: "Difficulty is required",
                })}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Select>
              <FormErrorMessage>
                {errors.difficulty && errors.difficulty.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.description} isRequired>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.constraints} isRequired>
              <FormLabel htmlFor="constraints">Constraints</FormLabel>
              <Textarea
                id="constraints"
                {...register("constraints", {
                  required: "Constraints are required",
                })}
              />
              <FormErrorMessage>
                {errors.constraints && errors.constraints.message}
              </FormErrorMessage>
            </FormControl>

            <Button type="submit" colorScheme="blue">
              Submit Challenge
            </Button>
          </VStack>
        </form>
      </Box>

      {/* Success Modal */}
      <Modal isOpen={isSuccessOpen} onClose={onSuccessClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Success</ModalHeader>
          <ModalBody>
            Challenge added successfully! You will be redirected to the
            challenge listing page in 10 seconds.
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => navigate("/ChallengesListing")}
            >
              Go to Challenge Listing
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Error Modal */}
      <Modal isOpen={isErrorOpen} onClose={onErrorClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Error</ModalHeader>
          <ModalBody>{errorMessage}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onErrorClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ChallengeSubmissionForm;
