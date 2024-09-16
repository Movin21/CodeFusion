import React from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUniversity } from "@fortawesome/free-solid-svg-icons";
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
    Tag,
    TagLabel,
    TagCloseButton,
    SimpleGrid,
    useDisclosure,
    Box,
    Card,
    CardHeader,
    CardBody,
    Image,
    Text,
    VStack,
    Select,
    Icon,
    useColorModeValue,
    HStack,
    FormControl,
    FormLabel,
    Textarea,
    Checkbox,
    Grid,
    Flex
  } from "@chakra-ui/react";
  interface Education {
    school: string;
    degree: string;
    department: string;
    startMonth: string;
    startYear: string;
    endMonth: string;
    endYear: string;
    description: string;
    currentlyStudying: boolean;
  }
function Student_Education ()  {

    const {
        isOpen: isEducationModalOpen,
        onOpen: onEducationModalOpen,
        onClose: onEducationModalClose,
      } = useDisclosure();
      const [educationList, setEducationList] = useState<Education[]>([]); // Use the correct type here
    
      // State for form fields
      const [formData, setFormData] = useState<Education>({
        school: "",
        degree: "",
        department: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        description: "",
        currentlyStudying: false,
      });
    
      // Handle form submission
      const handleSaveedu = () => {
        setEducationList([...educationList, formData]); // Now types are compatible
        onEducationModalClose(); // Close modal after saving
        setFormData({
          school: "",
          degree: "",
          department: "",
          startMonth: "",
          startYear: "",
          endMonth: "",
          endYear: "",
          description: "",
          currentlyStudying: false,
        }); // Reset form
    };
  return (
    <div>
     {/* Card to display education */}
     <Card bg="#1f202a" className='h-auto' minHeight="200px">
          <CardHeader className="text-white text-sm font-poppins">Education</CardHeader>
          <CardBody>
            <Button size="xs" bgColor="#00af0e" onClick={onEducationModalOpen} className="font-poppins">Add Education</Button>
            {educationList.length > 0 && (
              <VStack mt={2} align="start" spacing={2}>
                {educationList.map((education, index) => (
                  <Box key={index}>
                    <HStack>
                      <FontAwesomeIcon icon={faUniversity} className="text-gray-400 text-lg font-poppins" />
                      <VStack align="start" spacing={0}>
                        <Text className="text-sm font-semibold text-white font-poppins" >{education.school}</Text>
                        <Text className="text-xs text-gray-400 font-poppins">
                          {education.degree}, {education.department} | {education.startMonth} {education.startYear} - 
                          {education.currentlyStudying ? "Present" : `${education.endMonth} ${education.endYear}`}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            )}
          </CardBody>
        </Card>

          {/* Modal for Adding Education */}
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
              <ModalBody>
                <VStack spacing={4} align="stretch">
                  <FormControl isRequired>
                    <FormLabel className="font-poppins">School/College</FormLabel>
                    <Input
                      value={formData.school}
                      onChange={(e) =>
                        setFormData({ ...formData, school: e.target.value })
                      }
                      placeholder="Which School/College have you studied at?"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel className="font-poppins">Degree</FormLabel>
                    <Input
                      value={formData.degree}
                      onChange={(e) =>
                        setFormData({ ...formData, degree: e.target.value })
                      }
                      placeholder="ex: B.E"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel className="font-poppins">Department</FormLabel>
                    <Input
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({ ...formData, department: e.target.value })
                      }
                      placeholder="ex: Computer Science and Engineering"
                    />
                  </FormControl>

                  <Checkbox
                    isChecked={formData.currentlyStudying}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        currentlyStudying: e.target.checked,
                      })
                    }
                    className="font-poppins"
                  >
                    Currently studying here
                  </Checkbox>

                  <HStack>
                    <FormControl isRequired>
                      <FormLabel className="font-poppins">Starting from</FormLabel>
                      <HStack>
                        <Select
                        className="font-poppins"
                          value={formData.startMonth}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              startMonth: e.target.value,
                            })
                            
                          }
                          placeholder="Month"
                          sx={{//sx is chakra ui prop that allows you to apply CSS-in-JS styles directly to the component.
                            option: {
                              backgroundColor: "#1f202a", // Dropdown background color
                              color: "white", // Dropdown text color
                            },
                            "& option:hover": {//& symbol refers to the current element
                              backgroundColor: "#2a2b38", // Darker on hover
                            },
                          }}
                        >
                          {/* Add more months */}
                          <option value="January">January</option>
                          <option value="February">February</option>
                        </Select>
                        <Select
                        className="font-poppins"
                          value={formData.startYear}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              startYear: e.target.value,
                            })
                          }
                          placeholder="Year"
                          sx={{//sx is chakra ui prop that allows you to apply CSS-in-JS styles directly to the component.
                            option: {
                              backgroundColor: "#1f202a", // Dropdown background color
                              color: "white", // Dropdown text color
                            },
                            "& option:hover": {//& symbol refers to the current element
                              backgroundColor: "#2a2b38", // Darker on hover
                            },
                          }}
                        >
                          {/* Add more years */}
                          <option value="2022">2022</option>
                          <option value="2021">2021</option>
                        </Select>
                      </HStack>
                    </FormControl>

                    {!formData.currentlyStudying && (
                      <FormControl isRequired>
                        <FormLabel className="font-poppins">Ending in</FormLabel>
                        <HStack>
                          <Select
                            value={formData.endMonth}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                endMonth: e.target.value,
                              })
                            }
                            placeholder="Month"
                            sx={{//sx is chakra ui prop that allows you to apply CSS-in-JS styles directly to the component.
                                option: {
                                  backgroundColor: "#1f202a", // Dropdown background color
                                  color: "white", // Dropdown text color
                                },
                                "& option:hover": {//& symbol refers to the current element
                                  backgroundColor: "#2a2b38", // Darker on hover
                                },
                              }}
                          >
                            <option value="January">January</option>
                            <option value="February">February</option>
                          </Select>
                          <Select
                            value={formData.endYear}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                endYear: e.target.value,
                              })
                            }
                            placeholder="Year"
                            sx={{//sx is chakra ui prop that allows you to apply CSS-in-JS styles directly to the component.
                                option: {
                                  backgroundColor: "#1f202a", // Dropdown background color
                                  color: "white", // Dropdown text color
                                },
                                "& option:hover": {//& symbol refers to the current element
                                  backgroundColor: "#2a2b38", // Darker on hover
                                },
                              }}
                          >
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                          </Select>
                        </HStack>
                      </FormControl>
                    )}
                  </HStack>

                  <FormControl>
                    <FormLabel className="font-poppins">Description</FormLabel>
                    <Textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Add any other details here..."
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
                <Button colorScheme="green" onClick={handleSaveedu} className="font-poppins">
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>




    </div>
  )
}


export default Student_Education