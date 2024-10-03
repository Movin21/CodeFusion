import React from "react";
import { Container, Spinner, Text } from "@chakra-ui/react";
import BlogItem from "./components/Blog-Item";
import CreateForm from "./components/Create-Form";
import { useQuery } from "@tanstack/react-query";

const fetchBlogs = async () => {
  const response = await fetch("http://localhost:5000/blogs/readAllBlogs");
  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return response.json();
};

const Blogs = () => {
  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Text>{error.message}</Text>
      ) : (
        blogs.map((blog) => <BlogItem key={blog.id} blog={blog} />)
      )}
    </Container>
  );
};

export default Blogs;
