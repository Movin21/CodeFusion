import React from "react";
import { useState, ChangeEvent } from "react";
import ProgressBar from "./Unique_Badge/ProgressBar";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Gauge } from "lucide-react";
import { Download } from "react-feather";
import { Upload } from "lucide-react";
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

// ProfileDashboard Component
const ProfileDashboard = () => {
  // Mock data for charts
  const salesData = [
    { day: "Mon", earnings: 800, payments: 1200 },
    { day: "Tue", earnings: 600, payments: 800 },
    { day: "Wed", earnings: 700, payments: 1000 },
    { day: "Thu", earnings: 600, payments: 900 },
    { day: "Fri", earnings: 700, payments: 1300 },
    { day: "sat", earnings: 700, payments: 1300 },
    { day: "Sun", earnings: 700, payments: 1300 },
  ];

  const customerData = [
    { month: "Jan", current: 20, subscribers: 5, new: 10 },
    { month: "Feb", current: 22, subscribers: 7, new: 8 },
    { month: "Mar", current: 18, subscribers: 6, new: 5 },
    { month: "Apr", current: 18, subscribers: 6, new: 5 },
    { month: "May", current: 18, subscribers: 6, new: 5 },
    { month: "Mar", current: 18, subscribers: 6, new: 5 },
    { month: "Apr", current: 18, subscribers: 6, new: 5 },
    { month: "May", current: 18, subscribers: 6, new: 5 },
    { month: "Jan", current: 20, subscribers: 5, new: 10 },
    { month: "Feb", current: 22, subscribers: 7, new: 8 },
    { month: "Mar", current: 18, subscribers: 6, new: 5 },
    { month: "Apr", current: 18, subscribers: 6, new: 5 },
    // ... add more months
  ];

  const {
    isOpen: isSkillsModalOpen,
    onOpen: onSkillsModalOpen,
    onClose: onSkillsModalClose,
  } = useDisclosure();
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["React"]);
  const [searchSkill, setSearchSkill] = useState("");

  // Predefined skills
  const predefinedSkills: string[] = [
    "Algorithm",
    "Angular",
    "CSS",
    "Data Structure",
    "JavaScript ",
    "NodeJs",
    "Python (Advanced)",
    "SQL",
    "Python",
  ];

  // Add skill
  const addSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Remove skill
  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  // Save skills (for example, to backend or state)
  const handleSave = () => {
    // Add your logic here (e.g., API call)
    onSkillsModalClose();
  };

  const [imageUrlBronze, setImageUrlBronze] = useState("");
  const [imageUrlSilver, setImageUrlSilver] = useState("");
  const [imageUrlGold, setImageUrlGold] = useState("");
  const [imageUrlCrystal, setImageUrlCrystal] = useState("");
  const [imageUrlChampion, setImageUrlChampion] = useState("");
  const [imageUrlTitan, setImageUrlTitan] = useState("");

  const [error, setError] = useState(null);

  const {
    isOpen: isResumeModalOpen,
    onOpen: onResumeModalOpen,
    onClose: onResumeModalClose,
  } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const [savedResume, setSavedResume] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("onlyMe");
  const bgColor = useColorModeValue("gray.100", "#1f202a");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (
      selectedFile &&
      selectedFile.type === "application/pdf" &&
      selectedFile.size <= 5 * 1024 * 1024
    ) {
      setFile(selectedFile);
      setResumeName(selectedFile.name);
    } else {
      alert("Please select a PDF file under 5MB.");
    }
  };

  const handleSaveResume = () => {
    if (file) {
      // In a real application, you'd upload the file to a server here
      // For this example, we'll just create a local URL
      const fileUrl = URL.createObjectURL(file);
      setSavedResume(fileUrl);
      onResumeModalClose();
    }
  };

  const handleDownload = () => {
    if (savedResume) {
      const link = document.createElement("a");
      link.href = savedResume;
      link.download = resumeName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

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
    <>
      
      <Box className="bg-black p-4 min-h-screen">
        <header className="mb-4">
          <Text className="text-xl font-bold text-white font-poppins">Student Profile</Text>
          <Text className="text-xs text-gray-400 font-poppins">
            12:15 PM at 19th November 2020
          </Text>
        </header>

         <Grid templateColumns="repeat(4, 1fr)" gap={4}>

          {/* Profile Info Card */}
          <Card  bg="#1f202a">
            <CardBody>
              <Image
                src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Profile"
                className="rounded-full mx-auto mb-2 h-20"
              />
              <Text className="text-center text-lg font-bold text-white font-poppins">Julien Magnifice</Text>
              <Text className="text-center text-xs text-gray-400 mb-2 font-poppins">Design Student</Text>
              
              <VStack align="start" spacing={1} fontSize="xs" color="gray.400">
              <Text className="font-poppins"><strong>EMAIL:</strong> customer@email.com</Text>
              <Text className="font-poppins"><strong>PHONE:</strong> +01 923 456 78</Text>
              <Text className="font-poppins"><strong>LOCATION:</strong> 7839 Williams Dr. Columbus, GA 31904</Text>
              </VStack>
        

              <Box mt={2}>
                <ProgressBar
                  setImageUrlBronze={setImageUrlBronze}
                  setImageUrlSilver={setImageUrlSilver}
                  setImageUrlGold={setImageUrlGold}
                  setImageUrlCrystal={setImageUrlCrystal}
                  setImageUrlChampion={setImageUrlChampion}
                  setImageUrlTitan={setImageUrlTitan}
                />
              </Box>
              <Box className="mt-4  text-gray-400 mb-4">
                <Text className="text-sm font-bold mb-2 font-poppins">ACHIEVEMENTS</Text>
                <Box className="relative">
                  <Box className="absolute top-0 left-0 flex space-x-1">
                    {/* <Image
                      src="https://images.unsplash.com/photo-1698369778928-9153537f1c2f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fA%3D%3D"
                      alt="Contact 1"
                      className="rounded-full h-10 w-10"
                    />
                    <Image
                      src="https://plus.unsplash.com/premium_photo-1713443924146-36df22b0a7f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Contact 2"
                      className="rounded-full h-10 w-10"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1689314540842-e6893a87c747?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Contact 3"
                      className="rounded-full h-10 w-10"
                    /> */}

                    {imageUrlBronze && (
                      <Image
                        className="rounded-full h-10 w-10 object-cover mr-0.5"
                        src={imageUrlBronze}
                        alt="Bronze Medal"
                        onError={(e) => {
                          console.error(
                            "Image loading error:",
                            (e.currentTarget as HTMLImageElement).src,
                            e
                          );
                        }}
                      />
                    )}
                    {imageUrlSilver && (
                      <Image
                        className="rounded-full h-10 w-10 object-cover mr-0.5"
                        src={imageUrlSilver}
                        alt="Silver Medal"
                        onError={(e) => {
                          console.error(
                            "Image loading error:",
                            (e.currentTarget as HTMLImageElement).src,
                            e
                          );
                        }}
                      />
                    )}
                    {imageUrlGold && (
                      <Image
                        className="rounded-full h-10 w-10 object-cover mr-0.5"
                        src={imageUrlGold}
                        alt="Gold Medal"
                        onError={(e) => {
                          console.error(
                            "Image loading error:",
                            (e.currentTarget as HTMLImageElement).src,
                            e
                          );
                        }}
                      />
                    )}
                    {imageUrlCrystal && (
                      <Image
                        className="rounded-full h-10 w-10 object-cover mr-0.5"
                        src={imageUrlCrystal}
                        alt="Crystal Medal"
                        onError={(e) => {
                          console.error(
                            "Image loading error:",
                            (e.currentTarget as HTMLImageElement).src,
                            e
                          );
                        }}
                      />
                    )}
                    {imageUrlChampion && (
                      <Image
                        className="rounded-full h-10 w-10 object-cover mr-0.5"
                        src={imageUrlChampion}
                        alt="Champion Medal"
                        onError={(e) => {
                          console.error(
                            "Image loading error:",
                            (e.currentTarget as HTMLImageElement).src,
                            e
                          );
                        }}
                      />
                    )}
                    {imageUrlTitan && (
                      <Image
                        className="rounded-full h-10 w-10 object-cover mr-0.5"
                        src={imageUrlTitan}
                        alt="Titan Medal"
                        onError={(e) => {
                          console.error(
                            "Image loading error:",
                            (e.currentTarget as HTMLImageElement).src,
                            e
                          );
                        }}
                      />
                    )}
                    {error && <Box style={{ color: "red" }}>{error}</Box>}
                    <Box className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm text-white">
                      +75
                    </Box>
                  </Box>
                </Box>
              </Box>
              <br></br>
              <Box className="mt-4">
                <Text className="text-sm font-bold mb-2 font-poppins">ACTIVITY</Text>
                <Tag colorScheme="cyan" className="font-poppins">Active</Tag>
                <Text className="text-sm mt-1 text-white font-poppins">
                  2 hours response time
                </Text>
              </Box>
              <Box className="mt-4 flex justify-between">
                <Box className="text-white">
                  <Text className="text-sm font-bold font-poppins">Total Views</Text>
                  <Text className="text-xl font-bold font-poppins">95,202</Text>
                </Box>
                <Box className="text-white">
                  <Text className="text-sm font-bold font-poppins">Messages</Text>
                  <Text className="text-xl font-bold font-poppins">324</Text>
                </Box>
              </Box>
            </CardBody>
          </Card>


          {/* Challenge Report Card */}
          <Card className="col-span-3" bg="#1f202a">
          <CardHeader className="text-white text-sm font-poppins" mt={5} ml={450}>Challenges Report</CardHeader>
          <CardBody mt={20}>
            <ResponsiveContainer width="100%" height={350} >
              <BarChart data={salesData} barSize={10}>
                <XAxis dataKey="day" stroke="#ffffff" fontSize={10} />
                <YAxis stroke="#ffffff" fontSize={10} />
                <Bar dataKey="earnings" fill="#3a36db" radius={[5, 5, 0, 0]} />
                <Bar dataKey="payments" fill="#db5aee" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
          {/* //resume stat */}
          <Card bg="#1f202a">
          <CardHeader className="text-white text-sm font-poppins">My Resume</CardHeader>
          <CardBody>
            {savedResume ? (
              <HStack>
                <Button leftIcon={<Download size={16} />} onClick={handleDownload} colorScheme="blue" size="xs">
                  {resumeName || "Download CV"}
                </Button>
                <Button onClick={onResumeModalOpen} size="xs" bgColor="#00af0e" className="font-poppins">Update Resume</Button>
              </HStack>
            ) : (
              <Button onClick={onResumeModalOpen} size="xs" bgColor="#00af0e"className="font-poppins">Add your Resume</Button>
            )}
          </CardBody>
        </Card>


          <Modal isOpen={isResumeModalOpen} onClose={onResumeModalClose}>
            <ModalOverlay />
            <ModalContent bg="#1f202a" color="white">
              <ModalHeader className="font-poppins">Add your Resume</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={4} align="stretch">
                  <VStack
                    spacing={2}
                    p={8}
                    borderWidth={2}
                    borderStyle="dashed"
                    borderColor={borderColor}
                    borderRadius="md"
                  >
                    <Icon as={Upload} boxSize={8} />
                    <Text className="font-poppins">Drag and drop your resume here</Text>
                    <Text fontSize="sm" color="blue.500" className="font-poppins">
                      Supported formats : PDF
                    </Text>
                    <Text fontSize="sm" color="gray.500" className="font-poppins">
                      Max size : 5 MB
                    </Text>
                    <Text fontSize="sm" className="font-poppins">OR</Text>
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      display="none"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button as="span" colorScheme="green" className="font-poppins">
                        Choose file
                      </Button>
                    </label>
                  </VStack>
                  <Select
                    placeholder="Who can see your resume?"
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}
                  >
                    <option value="onlyMe" className="font-poppins">Only Me</option>
                    <option value="public" className="font-poppins">Public</option>
                  </Select>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onResumeModalClose} className="font-poppins">
                  Close
                </Button>
                <Button colorScheme="green" onClick={handleSaveResume} className="font-poppins">
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* Certificate Stats Card */}
          <Card className="col-span-3" bg="#1f202a">
          <CardHeader className="text-white text-sm font-poppins">My Certificates</CardHeader>
          <CardBody>
            <Flex justify="space-between" align="center">
              <VStack align="start" spacing={0}>
                <Text className="text-xs text-gray-400 font-poppins">Certificate Title</Text>
                <Text className="text-sm font-bold text-white font-poppins">React Developer</Text>
                <Text className="text-xs text-green-500 font-poppins">Completed</Text>
              </VStack>
              <VStack align="start" spacing={0}>
                <Text className="text-xs text-gray-400 font-poppins">Institution</Text>
                <Text className="text-sm font-bold text-white font-poppins">Udemy</Text>
              </VStack>
              <VStack align="start" spacing={0}>
                <Text className="text-xs text-gray-400 font-poppins">Issue Date</Text>
                <Text className="text-sm font-bold text-white font-poppins">March 2024</Text>
              </VStack>
              <VStack align="start" spacing={0}>
                <Text className="text-xs text-gray-400 font-poppins">Score</Text>
                <Text className="text-sm font-bold text-white font-poppins">95%</Text>
                <Text className="text-xs text-green-500 font-poppins">Passed</Text>
              </VStack>
            </Flex>
            <Button size="xs" bgColor="#00af0e" mt={2} className="font-poppins">Add your Certificates</Button>
          </CardBody>
        </Card>


          {/* Card to display education */}
          <Card bg="#1f202a">
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
          {/* Card to display skills */}
          <Card bg="#1f202a">
          <CardHeader className="text-white text-sm font-poppins">My Skills</CardHeader>
          <CardBody>
            <Flex flexWrap="wrap" gap={1} mb={2}>
              {selectedSkills.map((skill, index) => (
                <Tag size="sm" key={index} variant="solid">
                  <TagLabel fontSize="xs" className="font-poppins">{skill}</TagLabel>
                  <TagCloseButton onClick={() => removeSkill(skill)} />
                </Tag>
              ))}
            </Flex>
            <Button size="xs" bgColor="#00af0e" onClick={onSkillsModalOpen} className="font-poppins">Add/Edit Skills</Button>
          </CardBody>
        </Card>

          {/* Modal to add/edit skills */}
          <Modal
            isOpen={isSkillsModalOpen}
            onClose={onSkillsModalClose}
            size="lg"
          >
            <ModalOverlay />
            <ModalContent bg="#1f202a" color="white" className="font-poppins">
              <ModalHeader>My Skills</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* Display selected skills as tags */}
                <Box className="flex flex-wrap gap-2 mb-4 ">
                  {selectedSkills.map((skill: string) => (
                    <Tag
                      key={skill}
                      size="lg"
                      variant="solid"
                      colorScheme="cyan"
                    >
                      <TagLabel>{skill}</TagLabel>
                      <TagCloseButton onClick={() => removeSkill(skill)} />
                    </Tag>
                  ))}
                </Box>

                {/* Search Input */}
                <Input
                  placeholder="Search for skills"
                  value={searchSkill}
                  onChange={(e) => setSearchSkill(e.target.value)}
                  mb={4}
                />

                {/* Quick Add Skill Buttons */}
                <SimpleGrid columns={3} spacing={3} color="white">
                  {predefinedSkills.map((skill: string) => (
                    <Button
                      key={skill}
                      onClick={() => addSkill(skill)}
                      variant="outline"
                      colorScheme="gray"
                      size="sm"
                      color="gray"
                    >
                      {skill}
                    </Button>
                  ))}
                </SimpleGrid>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="green" onClick={handleSave}>
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Card bg="#1f202a" className="font-poppins">
          <CardHeader className="text-white text-sm">Work Experience</CardHeader>
          <CardBody>
            <Flex align="center">
              <Gauge className="w-12 h-12 text-green-500" />
              <Box ml={2}>
                <Text className="text-lg font-bold text-white">88%</Text>
                <Text className="text-xs text-gray-400">Activity rate up</Text>
              </Box>
            </Flex>
          </CardBody>
        </Card>
          {/* Student Analytics Card */}
        <Card className="col-span-4 font-poppins" bg="#1f202a ">
          <CardHeader className="text-white text-sm">Student Analytics</CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={customerData} barSize={5}>
                <XAxis dataKey="month" stroke="#ffffff" fontSize={10} />
                <YAxis stroke="#ffffff" fontSize={10} />
                <Bar dataKey="current" stackId="a" fill="#99b2c6" />
                <Bar dataKey="subscribers" stackId="a" fill="#0090ff" />
                <Bar dataKey="new" stackId="a" fill="#3a36db" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </Grid>
        </Box>
      
    </>
  );
};

export default ProfileDashboard;
