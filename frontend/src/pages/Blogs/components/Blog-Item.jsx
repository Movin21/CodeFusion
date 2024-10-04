import React, { useState } from 'react';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBlogFn } from "../axios";
import CreateForm from './Create-Form';
import DOMPurify from 'dompurify';
import FullBlogPost from '../FullBlogPost';
import { Container } from 'lucide-react';

const BlogItem = ({ blogId, title, content }) => {
  const queryClient = useQueryClient();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Access user data from local storage
  const user = JSON.parse(localStorage.getItem('userData'));
  const role = user?.role;

  console.log('Role:', role);

  const mutation = useMutation({
    mutationFn: deleteBlogFn,
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
    onError: (error) => {
      console.error('Failed to delete the blog:', error);
    },
  });

  const handleDelete = () => {
    mutation.mutate(blogId);
  };

  const handleEditOpen = () => {
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  // Sanitize the HTML content
  const sanitizedContent = DOMPurify.sanitize(content);

  // Function to truncate content to 25 words
  const truncateContent = (content, wordLimit) => {
    const strippedContent = content.replace(/<[^>]+>/g, '');
    const words = strippedContent.split(/\s+/);
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return strippedContent;
  };

  const truncatedContent = truncateContent(sanitizedContent, 25);

  return (
    <>
      <Card borderRadius="lg"
      shadow="md"
      overflow="hidden"
      maxWidth="full"
      bg="#1a1a2e">
        <CardHeader>
          <Flex spacing='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Box>
                <Heading size='sm' color='white'>{title}</Heading>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text color='white'>{truncatedContent}</Text>
          <Button onClick={onOpen} size='xs' sx={{ mt: 2 }} variant="outline" colorScheme="whiteAlpha" >Read More</Button>
        </CardBody>
        <CardFooter
          justify='space-between'
          flexWrap='wrap'
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        >
          {role === 'mentor' && (
            <>
              <Button flex='1' variant="outline" colorScheme="whiteAlpha" onClick={handleEditOpen} sx={{ mr: 2}}>
                Edit
              </Button>
              <Button flex='1' variant="outline" colorScheme="red" onClick={handleDelete}>
                Delete
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
      <CreateForm
        isOpen={isEditOpen}
        onClose={handleEditClose}
        blogId={blogId}
        initialTitle={title}
        initialContent={content}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="xl" colorScheme='red'>
        <ModalOverlay />
        <ModalContent bg='#0F0A19'>
          <ModalCloseButton />
          <ModalBody>
            <FullBlogPost title={title} content={content} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} variant='outline' colorScheme="whiteAlpha">Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BlogItem;