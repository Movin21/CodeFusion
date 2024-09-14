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
      
      <Box className="bg-black p-6 min-h-screen">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-white">Student Profile</h1>
          <Text className="text-sm text-gray-400">
            12:15 PM at 19th November 2020
          </Text>
        </header>

        <Box className="grid grid-cols-3 gap-6">
          {/* Profile Info Card */}
          <Card className="col-span-1" bg="#1f202a">
            <CardBody>
              <Image
                src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Profile"
                className="rounded-full mx-auto mb-4 h-40"
              />
              <h2 className="text-center text-xl font-bold text-white">
                Julien Magnifice
              </h2>
              <Text className="text-center text-sm text-gray-400 mb-4">
                Design Student
              </Text>
              <Box className="space-y-2">
                <Text className="text-sm  text-gray-400 mb-4">
                  <strong>EMAIL:</strong> customer@email.com
                </Text>
                <Text className="text-sm  text-gray-400 mb-4">
                  <strong>PHONE:</strong> +01 923 456 78
                </Text>
                <Text className="text-sm  text-gray-400 mb-4">
                  <strong>LOCATION:</strong> 7839 Williams Dr. Columbus, GA
                  31904
                </Text>
              </Box>

              <Box>
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
                <Text className="text-sm font-bold mb-2">ACHIEVEMENTS</Text>
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
                <Text className="text-sm font-bold mb-2">ACTIVITY</Text>
                <Tag colorScheme="cyan">Active</Tag>
                <Text className="text-sm mt-1 text-white">
                  2 hours response time
                </Text>
              </Box>
              <Box className="mt-4 flex justify-between">
                <Box className="text-white">
                  <Text className="text-sm font-bold">Total Views</Text>
                  <Text className="text-xl font-bold">95,202</Text>
                </Box>
                <Box className="text-white">
                  <Text className="text-sm font-bold">Messages</Text>
                  <Text className="text-xl font-bold">324</Text>
                </Box>
              </Box>
            </CardBody>
          </Card>

          {/* Challenge Report Card */}
          <Card className="col-span-2" bg="#1f202a">
            <CardHeader className="text-white">Challenges Report</CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={600}>
                <BarChart data={salesData} barSize={20}>
                  //adjusted size
                  <XAxis dataKey="day" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Bar
                    dataKey="earnings"
                    fill="#3a36db"
                    radius={[10, 10, 0, 0]}
                  />
                  <Bar
                    dataKey="payments"
                    fill="#db5aee"
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
          {/* //resume stat */}
          <Card bg="#1f202a">
            <CardHeader className="text-white">My Resume</CardHeader>
            <CardBody className="flex flex-col justify-center items-center">
              {savedResume ? (
                <HStack>
                  <Button
                    leftIcon={<Download size={20} />}
                    onClick={handleDownload}
                    colorScheme="blue"
                    size="sm"
                  >
                    {resumeName || "Download CV"}
                  </Button>
                  <Button
                    onClick={onResumeModalOpen}
                    size="sm"
                    bgColor="#00af0e"
                  >
                    Update Resume
                  </Button>
                </HStack>
              ) : (
                <Button onClick={onResumeModalOpen} size="sm" bgColor="#00af0e">
                  Add your Resume
                </Button>
              )}
            </CardBody>
          </Card>

          <Modal isOpen={isResumeModalOpen} onClose={onResumeModalClose}>
            <ModalOverlay />
            <ModalContent bg="#1f202a" color="white">
              <ModalHeader>Add your Resume</ModalHeader>
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
                    <Text>Drag and drop your resume here</Text>
                    <Text fontSize="sm" color="blue.500">
                      Supported formats : PDF
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Max size : 5 MB
                    </Text>
                    <Text fontSize="sm">OR</Text>
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      display="none"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button as="span" colorScheme="green">
                        Choose file
                      </Button>
                    </label>
                  </VStack>
                  <Select
                    placeholder="Who can see your resume?"
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}
                  >
                    <option value="onlyMe">Only Me</option>
                    <option value="public">Public</option>
                  </Select>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onResumeModalClose}>
                  Close
                </Button>
                <Button colorScheme="green" onClick={handleSaveResume}>
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          {/* Certificate Stats Card */}
          <Card className="col-span-2" bg="#1f202a">
            <CardHeader className="text-white">My Certificates</CardHeader>
            <CardBody className="space-y-4">
              <Box className="flex justify-between items-start space-x-3">
                <Box>
                  <Text className="text-sm text-gray-400">
                    Certificate Title
                  </Text>
                  <Text className="text-xl font-bold text-white">
                    React Developer
                  </Text>
                  <Text className="text-sm text-green-500">Completed</Text>
                </Box>
                <Box>
                  <Text className="text-sm text-gray-400">Institution</Text>
                  <Text className="text-xl font-bold text-white">Udemy</Text>
                </Box>
                <Box>
                  <Text className="text-sm text-gray-400">Issue Date</Text>
                  <Text className="text-xl font-bold text-white">
                    March 2024
                  </Text>
                </Box>
                <Box>
                  <Text className="text-sm text-gray-400">Score</Text>
                  <Text className="text-xl font-bold text-white">95%</Text>
                  <Text className="text-sm text-green-500">Passed</Text>
                </Box>
              </Box>
              <Button size="sm" bgColor="#00af0e">
                Add your Certificates
              </Button>
            </CardBody>
          </Card>
          {/* Card to display education */}
          <Card bg="#1f202a">
            <CardHeader className="text-white">Education</CardHeader>
            <CardBody className="flex flex-col justify-center items-center">
              <Button size="sm" bgColor="#00af0e" onClick={onEducationModalOpen}>
                Add Education
              </Button>

              {/* Education Entries */}
              {educationList.length > 0 && (
                <Box mt={4}>
                  {educationList.map((education, index) => (
                    <Box
                      key={index}
                      className="flex justify-between items-center mb-4"
                    >
                      <FontAwesomeIcon
                        icon={faUniversity}
                        className="text-gray-400 mr-2 text-4xl"
                      />{" "}
                      {/* University Icon */}
                      <Box>
                        <Text className="text-xl font-semibold text-white">
                          {education.school}
                        </Text>
                        <HStack spacing={2} className="text-sm text-gray-400">
                          <Text>
                            {education.degree}, {education.department}
                          </Text>
                          <Text>|</Text> {/* Divider (optional) */}
                          <Text>
                            {education.startMonth} {education.startYear} -{" "}
                            {education.currentlyStudying
                              ? "Present"
                              : `${education.endMonth} ${education.endYear}`}
                          </Text>
                          <Text>|</Text> {/* Divider (optional) */}
                          <Text>{education.description}</Text>
                        </HStack>
                      </Box>
                      <Icon className="text-gray-400 cursor-pointer" />{" "}
                      {/* Edit functionality can be added later */}
                    </Box>
                  ))}
                </Box>
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
              <ModalHeader>Add Education</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={4} align="stretch">
                  <FormControl isRequired>
                    <FormLabel>School/College</FormLabel>
                    <Input
                      value={formData.school}
                      onChange={(e) =>
                        setFormData({ ...formData, school: e.target.value })
                      }
                      placeholder="Which School/College have you studied at?"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Degree</FormLabel>
                    <Input
                      value={formData.degree}
                      onChange={(e) =>
                        setFormData({ ...formData, degree: e.target.value })
                      }
                      placeholder="ex: B.E"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Department</FormLabel>
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
                  >
                    Currently studying here
                  </Checkbox>

                  <HStack>
                    <FormControl isRequired>
                      <FormLabel>Starting from</FormLabel>
                      <HStack>
                        <Select
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
                        <FormLabel>Ending in</FormLabel>
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
                    <FormLabel>Description</FormLabel>
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
                >
                  Close
                </Button>
                <Button colorScheme="green" onClick={handleSaveedu}>
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          {/* Card to display skills */}
          <Card bg="#1f202a">
            <CardHeader className="text-white">My Skills</CardHeader>
            <CardBody className="flex flex-col justify-center items-center">
              {/* Display the selected skills as tags */}
              <Box mt={4} mb={4}>
                <SimpleGrid columns={3} spacing={4}>
                  {selectedSkills.map((skill, index) => (
                    <Tag size="lg" key={index} variant="solid">
                      <TagLabel>{skill}</TagLabel>
                      <TagCloseButton onClick={() => removeSkill(skill)} />
                    </Tag>
                  ))}
                </SimpleGrid>
              </Box>

              {/* Button to open the modal to add/edit skills */}
              <Button size="sm" bgColor="#00af0e" onClick={onSkillsModalOpen}>
                Add/Edit Skills
              </Button>
            </CardBody>
          </Card>

          {/* Modal to add/edit skills */}
          <Modal
            isOpen={isSkillsModalOpen}
            onClose={onSkillsModalClose}
            size="lg"
          >
            <ModalOverlay />
            <ModalContent bg="#1f202a" color="white">
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
          <Card bg="#1f202a">
            <CardHeader>Work Expereince</CardHeader>
            <CardBody className="flex justify-center items-center">
              <Gauge className="w-24 h-24 text-green-500" />
              <Box className="ml-4">
                <Text className="text-3xl font-bold text-white">88%</Text>
                <Text className="text-sm text-gray-400">
                  Your activity rate is up 88%
                </Text>
              </Box>
            </CardBody>
          </Card>
          {/* Customer Analytics Card */}
          <Card className="col-span-3" bg="#1f202a">
            <CardHeader className="text-white">Student Analytics</CardHeader>
            <CardBody>
              <ResponsiveContainer width="80%" height={400}>
                <BarChart data={customerData} barSize={10}>
                  <XAxis dataKey="month" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Bar dataKey="current" stackId="a" fill="#99b2c6" />
                  <Bar dataKey="subscribers" stackId="a" fill="#0090ff" />
                  <Bar
                    dataKey="new"
                    stackId="a"
                    fill="#3a36db"
                    radius={[20, 20, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default ProfileDashboard;
