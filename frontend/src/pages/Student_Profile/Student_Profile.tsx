import React from "react";
import { useState, useEffect } from "react";
import ProgressBar from "./Unique_Badge/ProgressBar";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Gauge } from "lucide-react";
import Student_Resume from "./Student_Resume";
import Student_certificate from "./Student_certificate";
import Student_Education from "./Student_Education";
import Student_Skills from "./Student_Skills";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import axios from "axios";
import {
  Tag,
  Box,
  Card,
  CardHeader,
  CardBody,
  Image,
  Text,
  VStack,
  Grid,
  Flex,
  Spinner,
  useToast,
  useDisclosure,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

// ProfileDashboard Component
const ProfileDashboard = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  type User = {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    role?: string;
  };
  interface ProfileUser {
    id: string; // Assuming you have an ID field
    name?: string; // Adjust types and fields as necessary
    imageUrl?: string;
    // Add other profile fields as necessary
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [profileUser, setProfileUser] = useState<ProfileUser | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Handle the case where there's no token (e.g., redirect to login)
          throw new Error("No token found");
          return;
        }

        const response = await axios.get<{ user: User }>(
          "http://localhost:5000/user/getuser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.user.role !== "student") {
          throw new Error("Unauthorized access");
        }

        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
        // navigate('/login');

        // Check if the error is due to an expired token
        if (error.message === "Unauthorized access") {
          toast({
            title: "Access Denied",
            description: "You don't have permission to view this profile.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          navigate("/");
        } else if (
          axios.isAxiosError(error) &&
          error.response?.status === 401
        ) {
          localStorage.removeItem("token");
          toast({
            title: "Session Expired",
            description: "Your session has expired. Please log in again.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          navigate("/login");
        } else {
          toast({
            title: "Error",
            description: "An error occurred while fetching user data.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    };

    fetchUserData();
  }, [navigate, toast]);

  //image
  useEffect(() => {
    // Fetch profile user data including image URL
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/pic/profilepic"
        );
        setProfileUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected for upload.");
      return; // Early return if no file is selected
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/pic/uploadprofilepic",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Update profileUser  with the new imageUrl
      if (profileUser) {
        setProfileUser({ ...profileUser, imageUrl: response.data.imageUrl });
      } else {
        // Handle the case if profileUser  is null (initial state)
        setProfileUser({ imageUrl: response.data.imageUrl } as ProfileUser);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.put<{ user: User }>(
        "http://localhost:5000/user/update",
        {
          firstname,
          lastname,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.user);
      onClose();
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description:
          error.message || "An error occurred while updating profile.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
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

  const [imageUrlBronze, setImageUrlBronze] = useState("");
  const [imageUrlSilver, setImageUrlSilver] = useState("");
  const [imageUrlGold, setImageUrlGold] = useState("");
  const [imageUrlCrystal, setImageUrlCrystal] = useState("");
  const [imageUrlChampion, setImageUrlChampion] = useState("");
  const [imageUrlTitan, setImageUrlTitan] = useState("");

  const [error, setError] = useState(null);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <>
      <Box className="bg-black p-4 min-h-screen">
        <header className="mb-4">
          <Text className="text-xl font-bold text-white font-poppins">
            Student Profile
          </Text>
          <Text className="text-xs text-gray-400 font-poppins">
            {new Date().toLocaleString()}
          </Text>
        </header>

        <Grid templateColumns="repeat(4, 1fr)" gap={4} >
          {/* Profile Info Card */}
          <Card bg="#0f0a19">
            <CardBody>
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                onClick={onOpen} // Open modal on click
              >
                <MdOutlineModeEdit />
              </button>
              <Image
                src={
                  profileUser?.imageUrl ||
                  "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="Profile"
                className="rounded-full mx-auto mb-2 h-20"
              />
              <label htmlFor="upload-file">
                <IconButton
                  icon={<FontAwesomeIcon icon={faCamera} />}
                  aria-label="Upload Image"
                  size="xs"
                  onClick={() => fileInputRef.current?.click()}
                />
              </label>
              <Input
                type="file"
                onChange={handleFileChange}
                display="none"
                id="upload-file"
                ref={fileInputRef}
              />
              <button onClick={handleUpload}></button>
              <Text className="text-center text-lg font-bold text-white font-poppins">
                {user?.firstname} {user?.lastname}
              </Text>
              <Text className="text-center text-xs text-gray-400 mb-2 font-poppins">
                Design Student
              </Text>

              <VStack align="start" spacing={1} fontSize="xs" color="gray.400">
                <Text className="font-poppins">
                  <strong>EMAIL:</strong> {user?.email || "Not available"}
                </Text>
                <Text className="font-poppins">
                  <strong>PHONE:</strong> {user?.phone || "Not available"}
                </Text>
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
                <Text className="text-sm font-bold mb-2 font-poppins">
                  ACHIEVEMENTS
                </Text>
                <Box className="relative">
                  <Box className="absolute top-0 left-0 flex space-x-1">
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
                <Text className="text-sm font-bold mb-2 font-poppins">
                  ACTIVITY
                </Text>
                <Tag colorScheme="cyan" className="font-poppins">
                  Active
                </Tag>
                <Text className="text-sm mt-1 text-white font-poppins">
                  2 hours response time
                </Text>
              </Box>
              <Box className="mt-4 flex justify-between">
                <Box className="text-white">
                  <Text className="text-sm font-bold font-poppins">
                    Total Views
                  </Text>
                  <Text className="text-xl font-bold font-poppins">95,202</Text>
                </Box>
                <Box className="text-white">
                  <Text className="text-sm font-bold font-poppins">
                    Messages
                  </Text>
                  <Text className="text-xl font-bold font-poppins">324</Text>
                </Box>
              </Box>
            </CardBody>
          </Card>

          {/* Challenge Report Card */}
          <Card className="col-span-3" bg="#0f0a19" >
            <CardHeader
              className="text-white text-sm font-poppins"
              mt={5}
              ml={450}
            >
              Challenges Report
            </CardHeader>
            <CardBody mt={20}>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={salesData} barSize={10}>
                  <XAxis dataKey="day" stroke="#ffffff" fontSize={10} />
                  <YAxis stroke="#ffffff" fontSize={10} />
                  <Bar
                    dataKey="earnings"
                    fill="#3a36db"
                    radius={[5, 5, 0, 0]}
                  />
                  <Bar
                    dataKey="payments"
                    fill="#db5aee"
                    radius={[5, 5, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>

          <Box className="col-span-1">
            <Student_Resume />
          </Box>

          <Box className="col-span-3">
            <Student_certificate />
          </Box>

          {/* Education, Skills, and Experience in the next row */}
          <Box gridColumn="span 2">
            <Student_Education />
          </Box>
          <Box gridColumn="span 1">
            <Student_Skills />
          </Box>
          <Box gridColumn="span 1">
            <Card bg="#0f0a19" className="font-poppins" height="200px">
              <CardHeader className="text-white text-sm">
                Work Experience
              </CardHeader>
              <CardBody>
                <Flex align="center">
                  <Gauge className="w-12 h-12 text-green-500" />
                  <Box ml={2}>
                    <Text className="text-lg font-bold text-white">88%</Text>
                    <Text className="text-xs text-gray-400">
                      Activity rate up
                    </Text>
                  </Box>
                </Flex>
              </CardBody>
            </Card>
          </Box>

          {/* Student Analytics Card */}
          <Card className="col-span-4 font-poppins" bg="#0f0a19 ">
            <CardHeader className="text-white text-sm">
              Student Analytics
            </CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={customerData} barSize={5}>
                  <XAxis dataKey="month" stroke="#ffffff" fontSize={10} />
                  <YAxis stroke="#ffffff" fontSize={10} />
                  <Bar dataKey="current" stackId="a" fill="#99b2c6" />
                  <Bar dataKey="subscribers" stackId="a" fill="#0090ff" />
                  <Bar
                    dataKey="new"
                    stackId="a"
                    fill="#3a36db"
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </Grid>
      </Box>

      {/* Chakra UI Modal for Editing Profile */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg="#1f202a"
          color="white"
          width="500px"
          maxWidth="900px"
          borderRadius="10px"
        >
          <ModalHeader>Edit Personal Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder={user?.firstname || "Enter your first name"}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last Name</FormLabel>
              <Input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder={user?.lastname || "Enter your last name"}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Phone</FormLabel>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={user?.phone || "Enter your phone number"}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateProfile}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileDashboard;
