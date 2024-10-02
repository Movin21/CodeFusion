import React from 'react'
import { useState } from 'react';
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
function Student_Skills() {

    const {
        isOpen: isSkillsModalOpen,
        onOpen: onSkillsModalOpen,
        onClose: onSkillsModalClose,
      } = useDisclosure();
      const [selectedSkills, setSelectedSkills] = useState<string[]>(["React"]);
      const [searchSkill, setSearchSkill] = useState("");
    
      // Predefined skills
      const predefinedSkills: string[] = [
        "Algorithm",
        "Angular",
        "CSS",
        "Data Structure",
        "JavaScript ",
        "NodeJs",
        "Python (Advanced)",
        "SQL",
        "Python",
      ];
    
      // Add skill
      const addSkill = (skill: string) => {
        if (!selectedSkills.includes(skill)) {
          setSelectedSkills([...selectedSkills, skill]);
        }
      };
    
      // Remove skill
      const removeSkill = (skill: string) => {
        setSelectedSkills(selectedSkills.filter((s) => s !== skill));
      };
    
      // Save skills (for example, to backend or state)
      const handleSave = () => {
        // Add your logic here (e.g., API call)
        onSkillsModalClose();
      };
    
  return (
    <div>
       {/* Card to display skills */}
       <Card bg="#1f202a" className='h-auto' minHeight="200px">
          <CardHeader className="text-white text-sm font-poppins">My Skills</CardHeader>
          <CardBody>
            <Flex flexWrap="wrap" gap={1} mb={2}>
              {selectedSkills.map((skill, index) => (
                <Tag size="sm" key={index} variant="solid">
                  <TagLabel fontSize="xs" className="font-poppins">{skill}</TagLabel>
                  <TagCloseButton onClick={() => removeSkill(skill)} />
                </Tag>
              ))}
            </Flex>
            <Button size="xs" bgColor="#00af0e" onClick={onSkillsModalOpen} className="font-poppins">Add/Edit Skills</Button>
          </CardBody>
        </Card>

          {/* Modal to add/edit skills */}
          <Modal
            isOpen={isSkillsModalOpen}
            onClose={onSkillsModalClose}
            size="lg"
          >
            <ModalOverlay />
            <ModalContent bg="#1f202a" color="white" className="font-poppins">
              <ModalHeader>My Skills</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* Display selected skills as tags */}
                <Box className="flex flex-wrap gap-2 mb-4 ">
                  {selectedSkills.map((skill: string) => (
                    <Tag
                      key={skill}
                      size="lg"
                      variant="solid"
                      colorScheme="cyan"
                    >
                      <TagLabel>{skill}</TagLabel>
                      <TagCloseButton onClick={() => removeSkill(skill)} />
                    </Tag>
                  ))}
                </Box>

                {/* Search Input */}
                <Input
                  placeholder="Search for skills"
                  value={searchSkill}
                  onChange={(e) => setSearchSkill(e.target.value)}
                  mb={4}
                />

                {/* Quick Add Skill Buttons */}
                <SimpleGrid columns={3} spacing={3} color="white">
                  {predefinedSkills.map((skill: string) => (
                    <Button
                      key={skill}
                      onClick={() => addSkill(skill)}
                      variant="outline"
                      colorScheme="gray"
                      size="sm"
                      color="gray"
                    >
                      {skill}
                    </Button>
                  ))}
                </SimpleGrid>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="green" onClick={handleSave}>
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

    </div>
  )
}

export default Student_Skills