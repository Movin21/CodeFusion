import React from 'react';
import { Box, Container, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

const FullBlogPost = ({ title, content }) => {
  const navigate = useNavigate();

  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <Container maxW="4xl" py={8} bg='#0F0A19'>
      <Heading as="h1" mb={4} color='white'>{title}</Heading>
      <Box 
        className="blog-content"
        color='white'
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </Container>
  );
};

export default FullBlogPost;