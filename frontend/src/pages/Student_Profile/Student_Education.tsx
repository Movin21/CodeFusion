import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUniversity, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
  Box,
  Card,
  CardHeader,
  CardBody,
  Text,
  VStack,
  Select,
  HStack,
  FormControl,
  FormLabel,
  Textarea,
  Checkbox,
  Spinner,
  useToast,
  IconButton,
} from "@chakra-ui/react";

interface Education {
  _id?: string;
  schoolOrCollege: string;
  degree: string;
  department: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  description: string;
  currentlyStudying: boolean;
}

function Student_Education() {
  const {
    isOpen: isEducationModalOpen,
    onOpen: onEducationModalOpen,
    onClose: onEducationModalClose,
  } = useDisclosure();
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const { control, handleSubmit, reset, watch } = useForm<Education>({
    defaultValues: {
      schoolOrCollege: "",
      degree: "",
      department: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      description: "",
      currentlyStudying: false,
    },
  });

  const currentlyStudying = watch("currentlyStudying");

  useEffect(() => {
    fetchEducationData();
  }, []);

  const fetchEducationData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:5000/Education/geteducation",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Fetched education data:", response.data);
      if (response.data && Array.isArray(response.data.educationRecords)) {
        setEducationList(response.data.educationRecords);
      } else {
        console.warn("Unexpected data format:", response.data);
        setEducationList([]);
      }
    } catch (error: any) {
      console.error("Error fetching education data:", error);
      if (error.response && error.response.status === 404) {
        console.log(
          "No education records found. This is normal for new users."
        );
        setEducationList([]);
      } else {
        setError("Failed to load education data. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: Education) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/Education/addEducation",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Education added:", response.data);
      if (response.data && response.data.education) {
        setEducationList((prevList) => [...prevList, response.data.education]);
        onEducationModalClose();
        reset();
        toast({
          title: "Education added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        fetchEducationData(); // Refetch to ensure we have the latest data
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error adding education:", error);
      toast({
        title: "Failed to add education",
        description: "Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const deleteEducation = async (id: string) => {
    try {
      await axios.delete(
        `http://localhost:5000/Education/deleteEducation/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEducationList((prevList) => prevList.filter((edu) => edu._id !== id));
      toast({
        title: "Education deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting education:", error);
      toast({
        title: "Failed to delete education",
        description: "Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const renderEducationItem = (education: Education, index: number) => {
    if (!education || typeof education !== "object") {
      console.error("Invalid education item:", education);
      return null;
    }

    return (
      <Box key={index}>
        <HStack>
          <FontAwesomeIcon
            icon={faUniversity}
            className="text-gray-400 text-lg font-poppins"
          />
          <VStack align="start" spacing={0}>
            <Text className="text-sm font-semibold text-white font-poppins">
              {education.schoolOrCollege || "Unknown School/College"}
            </Text>
            <Text className="text-xs text-gray-400 font-poppins">
              {education.degree || "Unknown Degree"},{" "}
              {education.department || "Unknown Department"} |
              {education.startMonth || "Unknown"}{" "}
              {education.startYear || "Unknown"} -
              {education.currentlyStudying
                ? "Present"
                : `${education.endMonth || "Unknown"} ${
                    education.endYear || "Unknown"
                  }`}
            </Text>
          </VStack>
          <IconButton
            aria-label="Delete education"
            icon={<FontAwesomeIcon icon={faTrash} />}
            size="xs"
            mt={4}
            position="absolute" // Positioning fixed within the container
            right={2} // Adjust as needed
            colorScheme="red"
            onClick={() => education._id && deleteEducation(education._id)}
          />
        </HStack>
      </Box>
    );
  };

  if (isLoading) {
    return (
      <Card bg="#1f202a" className="h-auto" minHeight="200px">
        <CardBody display="flex" justifyContent="center" alignItems="center">
          <Spinner />
        </CardBody>
      </Card>
    );
  }
  return (
    <div>
      <Card bg="#1f202a" className="h-auto" minHeight="200px">
        <CardHeader className="text-white text-sm font-poppins">
          Education
        </CardHeader>
        <CardBody>
          <Button
            size="xs"
            bgColor="#00af0e"
            onClick={onEducationModalOpen}
            className="font-poppins"
          >
            Add Education
          </Button>
          {error && (
            <Text color="red.500" mt={2}>
              {error}
            </Text>
          )}
          {Array.isArray(educationList) && educationList.length > 0 ? (
            <VStack mt={2} align="start" spacing={2}>
              {educationList.map((education, index) =>
                renderEducationItem(education, index)
              )}
            </VStack>
          ) : (
            <Text color="gray.500" mt={2}>
              No education records found. Add your first one!
            </Text>
          )}
        </CardBody>
      </Card>

      <Modal isOpen={isEducationModalOpen} onClose={onEducationModalClose}>
        <ModalOverlay />
        <ModalContent
          bg="#1f202a"
          color="white"
          width="700px"
          maxWidth="900px"
          borderRadius="10px"
        >
          <ModalHeader className="font-poppins">Add Education</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel className="font-poppins">School/College</FormLabel>
                  <Controller
                    name="schoolOrCollege"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Which School/College have you studied at?"
                      />
                    )}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel className="font-poppins">Degree</FormLabel>
                  <Controller
                    name="degree"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input {...field} placeholder="ex: B.E" />
                    )}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel className="font-poppins">Department</FormLabel>
                  <Controller
                    name="department"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="ex: Computer Science and Engineering"
                      />
                    )}
                  />
                </FormControl>

                <Controller
                  name="currentlyStudying"
                  control={control}
                  render={({ field: { onChange, value, ref } }) => (
                    <Checkbox
                      isChecked={value}
                      onChange={(e) => onChange(e.target.checked)}
                      ref={ref}
                      className="font-poppins"
                    >
                      Currently studying here
                    </Checkbox>
                  )}
                />

                <HStack>
                  <FormControl isRequired>
                    <FormLabel className="font-poppins">
                      Starting from
                    </FormLabel>
                    <HStack>
                      <Controller
                        name="startMonth"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            placeholder="Month"
                            className="font-poppins"
                          >
                            <option value="January">January</option>
                            <option value="February">February</option>
                            {/* Add more months */}
                          </Select>
                        )}
                      />
                      <Controller
                        name="startYear"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            placeholder="Year"
                            className="font-poppins"
                          >
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            {/* Add more years */}
                          </Select>
                        )}
                      />
                    </HStack>
                  </FormControl>

                  {!currentlyStudying && (
                    <FormControl isRequired>
                      <FormLabel className="font-poppins">Ending in</FormLabel>
                      <HStack>
                        <Controller
                          name="endMonth"
                          control={control}
                          rules={{ required: !currentlyStudying }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              placeholder="Month"
                              className="font-poppins"
                            >
                              <option value="January">January</option>
                              <option value="February">February</option>
                              {/* Add more months */}
                            </Select>
                          )}
                        />
                        <Controller
                          name="endYear"
                          control={control}
                          rules={{ required: !currentlyStudying }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              placeholder="Year"
                              className="font-poppins"
                            >
                              <option value="2022">2022</option>
                              <option value="2021">2021</option>
                              {/* Add more years */}
                            </Select>
                          )}
                        />
                      </HStack>
                    </FormControl>
                  )}
                </HStack>

                <FormControl>
                  <FormLabel className="font-poppins">Description</FormLabel>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="Add any other details here..."
                      />
                    )}
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={onEducationModalClose}
                className="font-poppins"
              >
                Close
              </Button>
              <Button
                colorScheme="green"
                type="submit"
                className="font-poppins"
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Student_Education;
