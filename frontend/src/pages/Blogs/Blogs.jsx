import React, { useState } from "react";
import { Container, Spinner, Alert, AlertIcon, SimpleGrid, Button, Box } from "@chakra-ui/react";
import BlogItem from "./components/Blog-Item";
import CreateForm from "./components/Create-Form";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogsFn } from "./axios";



const Blogs = () => {
  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogsFn,
  });

  const user = JSON.parse(localStorage.getItem('userData'));
  const role = user?.role;

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreateOpen = () => {
    setIsCreateOpen(true);
  };

  const handleCreateClose = () => {
    setIsCreateOpen(false);
  };


  if (isLoading) {
    return (
      <Container centerContent>
        <Spinner size="xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent>
        <Alert status="error">
          <AlertIcon />
          Error: {error.message}
        </Alert>
      </Container>
    );
  }

  // Check if blogs and blogs.data are defined and blogs.data is an array
  const hasBlogs = blogs && Array.isArray(blogs.data) && blogs.data.length > 0;

  return (
    <>
    <Container maxW="container.xl" py={8} bg='#0F0A19'>
      {role === 'mentor' && (
        <Button  backgroundColor='#527D9F' _hover={{backgroundColor: '#527D9F'}} color='white' onClick={handleCreateOpen}>
          Create New Blog
        </Button>
      )}

      <CreateForm isOpen={isCreateOpen} onClose={handleCreateClose} />
      {hasBlogs ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mt={8}>
          {blogs.data.map((blog) => (
            <BlogItem
              key={blog._id}
              blogId={blog._id}
              title={blog.title}
              content={blog.content}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Alert status="info" mt={4}>
          <AlertIcon />
          No blogs found. Create a new blog to get started!
        </Alert>
      )}
    </Container>
    </>
  );
};

export default Blogs;