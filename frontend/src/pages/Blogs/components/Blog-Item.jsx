import React, { useState } from 'react';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBlogFn } from "../axios";
import CreateForm from './Create-Form';

const BlogItem = ({ blogId, title, content }) => {
  const queryClient = useQueryClient();
  const [isEditOpen, setIsEditOpen] = useState(false);

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

  return (
    <>
      <Card maxW='md' sx={{ m: 4 }}>
        <CardHeader>
          <Flex spacing='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Box>
                <Heading size='sm'>{title}</Heading>
                <Text>Creator, Chakra UI</Text>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>
            {content}
          </Text>
        </CardBody>
        <Image
          objectFit='cover'
          src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
          alt='Chakra UI'
        />
        <CardFooter
          justify='space-between'
          flexWrap='wrap'
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        >
          <Button flex='1' variant='ghost' onClick={handleEditOpen}>
            Edit
          </Button>
          <Button flex='1' variant='ghost' onClick={handleDelete}>
            Delete
          </Button>
        </CardFooter>
      </Card>
      <CreateForm
        isOpen={isEditOpen}
        onClose={handleEditClose}
        blogId={blogId}
        initialTitle={title}
        initialContent={content}
      />
    </>
  );
};

export default BlogItem;