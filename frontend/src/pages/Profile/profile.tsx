import { Link } from "react-router-dom";
import ProfileStatsCard from "./ProfileStatsCard";
import { MdOutlineModeEdit } from "react-icons/md";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast, useDisclosure } from "@chakra-ui/react";
interface User {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  // Add other necessary fields
}
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
        "Add your work experience. Don’t forget to add those internships as well.",
    },
    {
      title: "Education",
      content:
        "We believe in skills over pedigree; but go ahead add your education for the recruiters who don’t.",
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container bg-gray-100 min-h-screen py-10">
      <div className="profile-wrapper container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <div className="flex items-center justify-between">
                <img
                  src="assets/defaultProfile.jpg"
                  alt="Profile"
                  className="w-16 h-16 rounded-full"
                />
                <span className="text-gray-400 cursor-pointer">
                  {/* Icon Placeholder */}
                  {/* <ModeSharp /> */}
                </span>
              </div>
              <div className="mt-6">
                <h1 className="text-2xl font-semibold text-gray-800">
                  {user ? `${user.firstname} ${user.lastname}` : "User Name"}
                </h1>
                <p className="text-sm text-gray-500">
                  {user?.email || "Email not available"}
                </p>
              </div>
            </div>

            {/* Personal Info Card */}
            <div className="bg-white shadow-lg rounded-xl p-6 relative">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">
                  Personal Information
                </h3>
                {/* Edit Icon Button */}
                <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                  {/* Icon Placeholder */}
                  <MdOutlineModeEdit />
                </button>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">
                      Name:{" "}
                      {user
                        ? `${user.firstname} ${user.lastname}`
                        : "User Name"}
                    </span>
                  </p>
                </li>
                <li className="flex items-center">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">
                      Email:{user?.email || "Not available"}
                    </span>{" "}
                  </p>
                </li>
                <li className="flex items-center">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">
                      Mobile: {user?.phone || "Not available"}
                    </span>
                  </p>
                </li>
              </ul>
            </div>

            {/* Resume Card */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">
                  My Resume
                </h3>
                <span className="text-blue-600 text-sm cursor-pointer hover:underline">
                  + Add Resume
                </span>
              </div>
              <p className="mt-4 text-gray-500">Add your resume here.</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Badges Card */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-800">My Badges</h2>
              {/* You can add badge content here */}
            </div>

            {/* Profile Stats Cards */}
            {ProfileStats.map((obj, id) => (
              <ProfileStatsCard
                key={id}
                title={obj.title}
                content={obj.content}
                link={obj.link}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
