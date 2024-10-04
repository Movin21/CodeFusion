import React, { useState, useEffect } from 'react';
import { Box, FormControl, FormLabel, Input, Textarea, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBlogFn, updateBlogFn } from '../axios';

const CreateForm = ({ isOpen, onClose, blogId, initialTitle = '', initialContent = '' }) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const toast = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const mutationFn = blogId ? updateBlogFn : createBlogFn;

  const mutation = useMutation({
    mutationFn: blogId ? (data) => mutationFn(blogId, data) : createBlogFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast({
        title: blogId ? 'Blog post updated.' : 'Blog post created.',
        description: blogId ? "We've updated your blog post for you." : "We've created your blog post for you.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      handleClose();
    },
    onError: (error) => {
      toast({
        title: 'An error occurred.',
        description: error.message || 'Unable to save blog post.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleClose = () => {
    setTitle('');
    setContent('');
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ title, content });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{blogId ? 'Edit Blog Post' : 'Create Blog Post'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="form" onSubmit={handleSubmit} maxW="md" mx="auto" p={6}>
            <FormControl id="title" mb={4} isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl id="content" mb={4} isRequired>
              <FormLabel>Content</FormLabel>
              <Textarea
                placeholder="Write your blog content here"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
              />
            </FormControl>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button 
            colorScheme="blue" 
            mr={3} 
            onClick={handleSubmit}
            isLoading={mutation.isPending}
          >
            {blogId ? 'Update Post' : 'Create Post'}
          </Button>
          <Button variant="ghost" onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateForm;