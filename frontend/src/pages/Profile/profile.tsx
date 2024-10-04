// Profile.tsx
import { Link } from "react-router-dom";
import { MdOutlineModeEdit } from "react-icons/md";
import { Trophy } from "lucide-react";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  useToast,
  useDisclosure,
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

// Interfaces
interface User {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

interface ProfileStatsCardProps {
  title: string;
  content: string;
  link?: {
    linkName: string;
    linkUrl: string;
  };
}

// ProfileStatsCard Component
const ProfileStatsCard: React.FC<ProfileStatsCardProps> = ({
  title,
  content,
  link,
}) => {
  return (
    <div className="bg-gray-800 shadow-xl rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        {link && (
          <Link
            to={link.linkUrl}
            className="text-green-400 text-sm cursor-pointer hover:text-green-300"
          >
            {link.linkName}
          </Link>
        )}
      </div>
      <p className="mt-4 text-gray-400">{content}</p>
    </div>
  );
};

// Main Profile Component
export default function Profile() {
  const ProfileStats = [
    {
      title: "My Certification",
      content: "You have not earned any certification yet.",
      link: { linkName: "Get Certified", linkUrl: "/Certify" },
    },
    {
      title: "Work Experience",
      content:
        "Add your work experience. Don't forget to add those internships as well.",
    },
    {
      title: "Education",
      content:
        "We believe in skills over pedigree; but go ahead add your education for the recruiters who don't.",
    },
    {
      title: "Links",
      content:
        "Add all the relevant links that help to knowing you as a developer.",
    },
    {
      title: "My Skills",
      content: "Add all the skills that speak on your behalf.",
    },
  ];

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get<{ user: User }>(
          "http://localhost:5000/user/getuser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);

        if (axios.isAxiosError(error) && error.response?.status === 401) {
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
            description:
              error.message || "An error occurred while fetching user data.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    };

    fetchUserData();
  }, [navigate, toast]);

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

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      await axios.delete("http://localhost:5000/user/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");
      toast({
        title: "Account Deleted",
        description: "Your account has been successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast({
        title: "Error",
        description:
          error.message || "An error occurred while deleting your account.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="profile-container bg-gray-900 min-h-screen py-10">
      <div className="profile-wrapper container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-gray-800 shadow-xl rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <img
                  src="../assets/profile.jpg"
                  alt="Profile"
                  className="w-16 h-16 rounded-full bg-gray-700"
                />
                <button className="text-green-400 hover:text-green-300 transition-colors">
                  <MdOutlineModeEdit size={24} />
                </button>
              </div>
              <div className="mt-6">
                <h1 className="text-2xl font-semibold text-white">
                  {user ? `${user.firstname} ${user.lastname}` : "User Name"}
                </h1>
                <p className="text-sm text-gray-400">
                  {user?.email || "Email not available"}
                </p>
              </div>

              {/* HackerRank-style Challenge Button */}
              <a href="/addChallenge" className="mt-4 w-full">
                <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <Trophy size={20} />
                  <span>Start Challenge</span>
                </button>
              </a>
            </div>

            {/* Personal Info Card */}
            <div className="bg-gray-800 shadow-xl rounded-xl p-6 relative border border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">
                  Personal Information
                </h3>
                <button
                  className="absolute top-4 right-4 text-green-400 hover:text-green-300"
                  onClick={onOpen}
                >
                  <MdOutlineModeEdit size={20} />
                </button>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="text-gray-300">
                  <span className="font-semibold text-white">Name: </span>
                  {user
                    ? `${user.firstname} ${user.lastname}`
                    : "Not available"}
                </li>
                <li className="text-gray-300">
                  <span className="font-semibold text-white">Email: </span>
                  {user?.email || "Not available"}
                </li>
                <li className="text-gray-300">
                  <span className="font-semibold text-white">Mobile: </span>
                  {user?.phone || "Not available"}
                </li>
              </ul>
            </div>

            {/* Resume Card */}
            <div className="bg-gray-800 shadow-xl rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">My Resume</h3>
                <span className="text-green-400 text-sm cursor-pointer hover:text-green-300">
                  + Add Resume
                </span>
              </div>
              <p className="mt-4 text-gray-400">Add your resume here.</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Badges Card */}
            <div className="bg-gray-800 shadow-xl rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white">My Badges</h2>
            </div>

            {/* Profile Stats Cards */}
            {ProfileStats.map((stat, index) => (
              <ProfileStatsCard
                key={index}
                title={stat.title}
                content={stat.content}
                link={stat.link}
              />
            ))}

            {/* Delete Account Button */}
            <div className="flex justify-end">
              <button
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-colors"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="bg-gray-800 text-white">
          <ModalHeader>Edit Personal Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder={user?.firstname || "Enter your first name"}
                className="bg-gray-700"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last Name</FormLabel>
              <Input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder={user?.lastname || "Enter your last name"}
                className="bg-gray-700"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Phone</FormLabel>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={user?.phone || "Enter your phone number"}
                className="bg-gray-700"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              className="bg-green-500 hover:bg-green-600 text-white mr-3"
              onClick={handleUpdateProfile}
            >
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
