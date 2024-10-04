import React from 'react';
import { Box, Container, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

const FullBlogPost = ({ title, content }) => {
  const navigate = useNavigate();

  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <Container maxW="4xl" py={8}>
      <Heading as="h1" mb={4}>{title}</Heading>
      <Box 
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </Container>
  );
};

export default FullBlogPost;