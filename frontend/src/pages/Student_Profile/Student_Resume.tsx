import React from 'react'
import { useState,ChangeEvent} from 'react';
import { Download } from "react-feather";
import { Upload } from "lucide-react";
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
    Tag,
    TagLabel,
    TagCloseButton,
    SimpleGrid,
    useDisclosure,
    Box,
    Card,
    CardHeader,
    CardBody,
    Image,
    Text,
    VStack,
    Select,
    Icon,
    useColorModeValue,
    HStack,
    FormControl,
    FormLabel,
    Textarea,
    Checkbox,
    Grid,
    Flex
  } from "@chakra-ui/react";
function Student_Resume() {

    const {
        isOpen: isResumeModalOpen,
        onOpen: onResumeModalOpen,
        onClose: onResumeModalClose,
      } = useDisclosure();
      const [file, setFile] = useState<File | null>(null);
      const [savedResume, setSavedResume] = useState<string | null>(null);
      const [resumeName, setResumeName] = useState<string>("");
      const [visibility, setVisibility] = useState<string>("onlyMe");
      const bgColor = useColorModeValue("gray.100", "#1f202a");
      const borderColor = useColorModeValue("gray.200", "gray.600");
    
      const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (
          selectedFile &&
          selectedFile.type === "application/pdf" &&
          selectedFile.size <= 5 * 1024 * 1024
        ) {
          setFile(selectedFile);
          setResumeName(selectedFile.name);
        } else {
          alert("Please select a PDF file under 5MB.");
        }
      };
    
      const handleSaveResume = () => {
        if (file) {
          // In a real application, you'd upload the file to a server here
          // For this example, we'll just create a local URL
          const fileUrl = URL.createObjectURL(file);
          setSavedResume(fileUrl);
          onResumeModalClose();
        }
      };
    
      const handleDownload = () => {
        if (savedResume) {
          const link = document.createElement("a");
          link.href = savedResume;
          link.download = resumeName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      };
    
  return (
    <div>
     {/* //resume stat */}
     <Card bg="#1f202a" minHeight="200px" className='h-auto' >
          <CardHeader className="text-white text-sm font-poppins ">My Resume</CardHeader>
          <CardBody>
            {savedResume ? (
              <HStack>
                <Button leftIcon={<Download size={16} />} onClick={handleDownload} colorScheme="blue" size="xs">
                  {resumeName || "Download CV"}
                </Button>
                <Button onClick={onResumeModalOpen} size="xs" bgColor="#00af0e" className="font-poppins">Update Resume</Button>
              </HStack>
            ) : (
              <Button onClick={onResumeModalOpen} size="xs" bgColor="#00af0e"className="font-poppins">Add your Resume</Button>
            )}
          </CardBody>
        </Card>


          <Modal isOpen={isResumeModalOpen} onClose={onResumeModalClose}>
            <ModalOverlay />
            <ModalContent bg="#1f202a" color="white">
              <ModalHeader className="font-poppins">Add your Resume</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={4} align="stretch">
                  <VStack
                    spacing={2}
                    p={8}
                    borderWidth={2}
                    borderStyle="dashed"
                    borderColor={borderColor}
                    borderRadius="md"
                  >
                    <Icon as={Upload} boxSize={8} />
                    <Text className="font-poppins">Drag and drop your resume here</Text>
                    <Text fontSize="sm" color="blue.500" className="font-poppins">
                      Supported formats : PDF
                    </Text>
                    <Text fontSize="sm" color="gray.500" className="font-poppins">
                      Max size : 5 MB
                    </Text>
                    <Text fontSize="sm" className="font-poppins">OR</Text>
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      display="none"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button as="span" colorScheme="green" className="font-poppins">
                        Choose file
                      </Button>
                    </label>
                  </VStack>
                  <Select
                    placeholder="Who can see your resume?"
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}
                  >
                    <option value="onlyMe" className="font-poppins">Only Me</option>
                    <option value="public" className="font-poppins">Public</option>
                  </Select>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onResumeModalClose} className="font-poppins">
                  Close
                </Button>
                <Button colorScheme="green" onClick={handleSaveResume} className="font-poppins">
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>





    </div>
  )
}

export default Student_Resume