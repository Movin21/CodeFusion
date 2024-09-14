import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IDE from "./pages/IDE/IDE.jsx";
import RootLayout from "./pages/layouts/RootLayout.jsx";
import Home from "./pages/Home/Home.jsx";
import Profile from "./pages/Profile/profile.jsx";
import HelpForm from "./pages/Blog/HelpForm.jsx";
import BlogPage from "./pages/Blog/Blog.jsx";
import ProfileDashboard from "./pages/Student_Profile/Student_Profile.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    element: <RootLayout />,
    children: [
      { path: "/IDE", element: <IDE /> },
      { path: "/profile", element: <Profile /> },
      { path: "/helpform", element: <HelpForm /> },
      { path: "/blogsupport", element: <BlogPage /> },
      { path:"/studentprofile",element:<ProfileDashboard/>}
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
