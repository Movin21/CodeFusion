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

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    element: <RootLayout />,
    children: [
      { path: "/IDE", element: <IDE /> },
      { path: "/profile", element: <Profile /> },
      { path: "/blogs", element: <Blogs /> },
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
