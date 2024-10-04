import React, { useEffect } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useToast, FormErrorMessage } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBlogFn, updateBlogFn } from '../axios';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required').refine(
    (value) => {
      const textContent = value.replace(/<[^>]*>/g, '');
      return textContent.trim().split(/\s+/).length >= 100;
    },
    {
      message: 'Content must be at least 100 words',
    }
  ),
});

const CreateForm = ({ isOpen, onClose, blogId, initialTitle = '', initialContent = '' }) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: initialTitle,
      content: initialContent,
    },
  });

  useEffect(() => {
    setValue('title', initialTitle);
    setValue('content', initialContent);
  }, [initialTitle, initialContent, setValue]);

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
    reset();
    onClose();
  };

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link'],
      ['clean'] // remove formatting button
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'link'
  ];

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{blogId ? 'Edit Blog Post' : 'Create Blog Post'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="form" onSubmit={handleSubmit(onSubmit)} maxW="4xl" mx="auto" p={6}>
            <FormControl id="title" mb={4} isInvalid={errors.title}>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                placeholder="Enter blog title"
                {...register('title')}
              />
              <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
            </FormControl>

            <FormControl id="content" mb={4} isInvalid={errors.content}>
              <FormLabel>Content</FormLabel>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <ReactQuill
                    {...field}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    placeholder="Write your blog content here (minimum 100 words)"
                    style={{ height: '400px', marginBottom: '50px' }}
                  />
                )}
              />
              <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
            </FormControl>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button 
            colorScheme="blue" 
            mr={3} 
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting || mutation.isPending}
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