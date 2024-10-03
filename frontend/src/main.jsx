import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IDE from "./pages/IDE/IDE.jsx";
import RootLayout from "./pages/layouts/RootLayout.jsx";
import Home from "./pages/Home/Home.jsx";
import Profile from "./pages/Profile/profile.jsx";
import Blogs from "./pages/Blogs/Blogs.jsx";
import HelpForm from "./pages/Blog/HelpForm.jsx";
import BlogPage from "./pages/Blog/Blog.jsx";
import ProfileDashboard from "./pages/Student_Profile/Student_Profile.tsx";
import SignupForm from "./pages/Signup/Signup.tsx";
import LoginScreen from "./pages/Login/Login.tsx";
import ChallengesForm from "./pages/ChallengesListing/ChallengeForm.jsx";
import { ChallengesListing } from "./pages/ChallengesListing/ChallengesListing.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    element: <RootLayout />,
    children: [
      { path: "/IDE/:id", element: <IDE /> },
      { path: "/profile", element: <Profile /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/helpform", element: <HelpForm /> },
      { path: "/blogsupport", element: <BlogPage /> },
      { path: "/studentprofile", element: <ProfileDashboard /> },
      { path: "/signup", element: <SignupForm /> },
      { path: "/login", element: <LoginScreen /> },
      { path: "/ChallengesListing", element: <ChallengesListing /> },
      { path: "/addChallenge", element: <ChallengesForm /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>
);
