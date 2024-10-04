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
    <div className="bg-[#0f1624] min-h-screen py-10 px-5">
      <Heading as="h1" size="xl" textAlign="center" mb={4} color="#00BFFF">
        Add Your Coding Challenge Here!
      </Heading>
      <Text textAlign="center" mb={8} color="#ffffff">
        Use this form to create a new coding challenge. Provide all necessary
        details to set up an engaging and clear challenge for participants.
      </Text>
      <Box
        maxWidth="md"
        margin="auto"
        mt={8}
        className="bg-[#1a2332] p-8 rounded-lg shadow-xl border-2 border-[#2f3f56]"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={6} align="stretch">
            <FormControl isInvalid={errors.name} isRequired>
              <FormLabel htmlFor="name" color="#00BFFF" fontWeight="bold">
                Challenge Name
              </FormLabel>
              <Input
                id="name"
                {...register("name", {
                  required: "Challenge name is required",
                })}
                className="bg-[#0f1624] text-white border-[#2f3f56] focus:border-[#1ba94c] focus:ring-[#1ba94c] placeholder-gray-400"
                placeholder="Enter challenge name"
              />
              <FormErrorMessage color="#ff8f73">
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.endDate} isRequired>
              <FormLabel htmlFor="endDate" color="#00BFFF" fontWeight="bold">
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
                className="bg-[#0f1624] text-white border-[#2f3f56] focus:border-[#1ba94c] focus:ring-[#1ba94c]"
              />
              <FormErrorMessage color="#ff8f73">
                {errors.endDate && errors.endDate.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.endTime} isRequired>
              <FormLabel htmlFor="endTime" color="#00BFFF" fontWeight="bold">
                End Time
              </FormLabel>
              <Input
                id="endTime"
                type="time"
                {...register("endTime", { required: "End time is required" })}
                className="bg-[#0f1624] text-white border-[#2f3f56] focus:border-[#1ba94c] focus:ring-[#1ba94c]"
              />
              <FormErrorMessage color="#ff8f73">
                {errors.endTime && errors.endTime.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.difficulty} isRequired>
              <FormLabel htmlFor="difficulty" color="#00BFFF" fontWeight="bold">
                Difficulty
              </FormLabel>
              <Select
                id="difficulty"
                {...register("difficulty", {
                  required: "Difficulty is required",
                })}
                className="bg-[#0f1624] text-white border-[#2f3f56] focus:border-[#1ba94c] focus:ring-[#1ba94c]"
              >
                <option value="" disabled selected hidden>
                  Select difficulty
                </option>
                <option value="easy" className="text-green-400">
                  Easy
                </option>
                <option value="medium" className="text-yellow-400">
                  Medium
                </option>
                <option value="hard" className="text-red-400">
                  Hard
                </option>
              </Select>
              <FormErrorMessage color="#ff8f73">
                {errors.difficulty && errors.difficulty.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.description} isRequired>
              <FormLabel
                htmlFor="description"
                color="#00BFFF"
                fontWeight="bold"
              >
                Description
              </FormLabel>
              <Textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                className="bg-[#0f1624] text-white border-[#2f3f56] focus:border-[#1ba94c] focus:ring-[#1ba94c] placeholder-gray-400"
                placeholder="Enter challenge description"
                rows={5}
              />
              <FormErrorMessage color="#ff8f73">
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.constraints} isRequired>
              <FormLabel
                htmlFor="constraints"
                color="#00BFFF"
                fontWeight="bold"
              >
                Constraints
              </FormLabel>
              <Textarea
                id="constraints"
                {...register("constraints", {
                  required: "Constraints are required",
                })}
                className="bg-[#0f1624] text-white border-[#2f3f56] focus:border-[#1ba94c] focus:ring-[#1ba94c] placeholder-gray-400"
                placeholder="Enter challenge constraints"
                rows={4}
              />
              <FormErrorMessage color="#ff8f73">
                {errors.constraints && errors.constraints.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              width="full"
              className="bg-[#1ba94c] text-white hover:bg-[#168f3e] focus:ring-2 focus:ring-[#1ba94c] focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Submit Challenge
            </Button>
          </VStack>
        </form>
      </Box>

      <Modal isOpen={isSuccessOpen} onClose={onSuccessClose}>
        <ModalOverlay />
        <ModalContent className="bg-[#1a2332] text-white">
          <ModalHeader color="#1ba94c">Success</ModalHeader>
          <ModalBody>
            Challenge added successfully! You will be redirected to the
            challenge listing page in 10 seconds.
          </ModalBody>
          <ModalFooter>
            <Button
              className="bg-[#1ba94c] text-white hover:bg-[#168f3e] transition duration-300 ease-in-out"
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
        <ModalContent className="bg-[#1a2332] text-white">
          <ModalHeader color="#ff8f73">Error</ModalHeader>
          <ModalBody>{errorMessage}</ModalBody>
          <ModalFooter>
            <Button
              className="bg-[#ff8f73] text-white hover:bg-[#ff7c5d] transition duration-300 ease-in-out"
              mr={3}
              onClick={onErrorClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ChallengeSubmissionForm;
