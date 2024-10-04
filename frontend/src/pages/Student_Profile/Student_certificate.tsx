import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
  Box,
  Card,
  CardHeader,
  CardBody,
  Text,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Spinner,
  useToast,
  IconButton,
} from "@chakra-ui/react";

interface Certificate {
  _id?: string;
  title: string;
  institution: string;
  issueDate: string;
  score: string;
}

function Student_Certificate() {
  const {
    isOpen: isCertificateModalOpen,
    onOpen: onCertificateModalOpen,
    onClose: onCertificateModalClose,
  } = useDisclosure();
  const [certificateList, setCertificateList] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const { control, handleSubmit, reset } = useForm<Certificate>({
    defaultValues: {
      title: "",
      institution: "",
      issueDate: "",
      score: "",
    },
  });

  useEffect(() => {
    fetchCertificateData();
  }, []);



   const fetchCertificateData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:5000/Certi/getcertificates",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Fetched certificate data:", response.data);
      
      let certificateData: Certificate[] = [];
      
      if (response.data && Array.isArray(response.data.certificates)) {
        certificateData = response.data.certificates;
      } else if (response.data && Array.isArray(response.data.certificateRecords)) {
        certificateData = response.data.certificateRecords;
      } else if (response.data && Array.isArray(response.data)) {
        certificateData = response.data;
      } else {
        console.warn("Unexpected data format:", response.data);
      }
      
      setCertificateList(certificateData);
    } catch (error: any) {
      console.error("Error fetching certificate data:", error);
      if (error.response && error.response.status === 404) {
        console.log("No certificate records found. This is normal for new users.");
        setCertificateList([]);
      } else {
        setError("Failed to load certificate data. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: Certificate) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/Certi/addCertificate",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Server response:", response.data);
      
      if (response.data && response.data.certificate) {
        setCertificateList((prevList) => [...prevList, response.data.certificate]);
        onCertificateModalClose();
        reset();
        toast({
          title: "Certificate added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        fetchCertificateData();
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (error: any) {
      console.error("Error adding certificate:", error);
      let errorMessage = "Failed to add certificate. Please try again.";
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        errorMessage += ` Server responded with status ${error.response.status}.`;
      }
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const deleteCertificate = async (id: string) => {
    try {
      await axios.delete(
        `http://localhost:5000/Certi/deleteCertificate/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCertificateList((prevList) => prevList.filter((cert) => cert._id !== id));
      toast({
        title: "Certificate deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting certificate:", error);
      toast({
        title: "Failed to delete certificate",
        description: "Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const renderCertificateItem = (certificate: Certificate, index: number) => {
    if (!certificate || typeof certificate !== "object") {
      console.error("Invalid certificate item:", certificate);
      return null;
    }

    return (
      <Box key={index} position="relative" width="100%">
        <HStack spacing={4} width="100%">
          <FontAwesomeIcon
            icon={faCertificate}
            className="text-gray-400 text-lg font-poppins"
          />
          <VStack align="start" spacing={0} flex={1}>
            <Text className="text-sm font-semibold text-white font-poppins">
              {certificate.title || "Unknown Certificate"}
            </Text>
            <Text className="text-xs text-gray-400 font-poppins">
              {certificate.institution || "Unknown Institution"} | 
              {certificate.issueDate || "Unknown Date"} | 
              Score: {certificate.score || "N/A"}
            </Text>
          </VStack>
          <IconButton
            aria-label="Delete certificate"
            icon={<FontAwesomeIcon icon={faTrash} />}
            size="xs"
            colorScheme="red"
            onClick={() => certificate._id && deleteCertificate(certificate._id)}
          />
        </HStack>
      </Box>
    );
  };

  if (isLoading) {
    return (
      <Card bg="#1f202a" className="h-auto" minHeight="200px">
        <CardBody display="flex" justifyContent="center" alignItems="center">
          <Spinner />
        </CardBody>
      </Card>
    );
  }

  return (
    <div>
      <Card bg="#0f0a19" className="h-auto" minHeight="200px">
        <CardHeader className="text-white text-sm font-poppins">
          My Certificates
        </CardHeader>
        <CardBody>
          <Button
            size="xs"
            bgColor="#00af0e"
            onClick={onCertificateModalOpen}
            className="font-poppins"
          >
            Add Certificate
          </Button>
          {error && (
            <Text color="red.500" mt={2}>
              {error}
            </Text>
          )}
          {Array.isArray(certificateList) && certificateList.length > 0 ? (
            <VStack mt={4} align="start" spacing={4} width="100%">
              {certificateList.map((certificate, index) =>
                renderCertificateItem(certificate, index)
              )}
            </VStack>
          ) : (
            <Text color="gray.500" mt={2}>
              No certificates found. Add your first one!
            </Text>
          )}
        </CardBody>
      </Card>

      <Modal isOpen={isCertificateModalOpen} onClose={onCertificateModalClose}>
        <ModalOverlay />
        <ModalContent
          bg="#1f202a"
          color="white"
          width="700px"
          maxWidth="900px"
          borderRadius="10px"
        >
          <ModalHeader className="font-poppins">Add Certificate</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel className="font-poppins">Certificate Title</FormLabel>
                  <Controller
                    name="title"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input {...field} placeholder="Enter certificate title" />
                    )}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel className="font-poppins">Institution</FormLabel>
                  <Controller
                    name="institution"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input {...field} placeholder="Enter institution name" />
                    )}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel className="font-poppins">Issue Date</FormLabel>
                  <Controller
                    name="issueDate"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input {...field} type="date" />
                    )}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel className="font-poppins">Score</FormLabel>
                  <Controller
                    name="score"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input {...field} placeholder="Enter score (e.g., 95%)" />
                    )}
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={onCertificateModalClose}
                className="font-poppins"
              >
                Close
              </Button>
              <Button
                colorScheme="green"
                type="submit"
                className="font-poppins"
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Student_Certificate;