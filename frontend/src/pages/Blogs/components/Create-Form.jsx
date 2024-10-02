import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Textarea, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';

const CreateForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setTitle('');  
    setContent('');
    setIsOpen(false)};

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to send
    const postData = { title, content };

    try {
      // Make the API request
      const response = await fetch('https://localhost:7003/api/blogs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        // Handle successful response
        console.log('Blog post created successfully:', await response.json());
        // Close the modal after submission
        handleClose();
      } else {
        // Handle errors
        console.error('Error creating blog post:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen} 
        variant="outline"
        margin={4}
      >
        Create Blog Post    
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Blog Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              maxW="md"
              mx="auto"
              p={6}
            >
              <form onSubmit={handleSubmit}>
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
              </form>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Create Post
            </Button>
            <Button variant="ghost" onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateForm;
