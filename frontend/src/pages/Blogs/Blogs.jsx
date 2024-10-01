import React, { useEffect, useState } from 'react';
import { Container, Spinner, Text } from "@chakra-ui/react";
import BlogItem from "./components/Blog-Item";
import CreateForm from "./components/Create-Form";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the blog data from the API
    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://localhost:7003/api/blogs');
        if (response.ok) {
          const data = await response.json();
          setBlogs(data); // Store the fetched blogs in the state
        } else {
          setError('Failed to fetch blogs');
        }
      } catch (error) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [blogs]);

  return (
    <Container>
      <CreateForm />

      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        blogs.map((blog) => (
          <BlogItem key={blog.id} title={blog.title} content={blog.content} blogId={blog.id}/>
        ))
      )}
    </Container>
  );
};

export default Blogs;
