import React, { useEffect, useState } from "react";
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
  Flex,
} from "@chakra-ui/react";
import axios from "axios";

function Student_Skills() {
  const {
    isOpen: isSkillsModalOpen,
    onOpen: onSkillsModalOpen,
    onClose: onSkillsModalClose,
  } = useDisclosure();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchSkill, setSearchSkill] = useState("");

  // Predefined skills
  const predefinedSkills: string[] = [
    "Algorithm",
    "Angular",
    "CSS",
    "Data Structure",
    "JavaScript",
    "NodeJs",
    "Python (Advanced)",
    "SQL",
    "Python",
  ];

  useEffect(() => {
    // Fetch existing skills from the database when the component mounts
    const fetchSkills = async () => {
      try {
        const response = await axios.get("http://localhost:5000/skills/getskills", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Extract only the skill strings
        const skills = response.data.skills.map((skillObj: { skill: string }) => skillObj.skill);
        setSelectedSkills(skills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  // Add skill to the database
  const addSkill = async (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      try {
        await axios.post(
          "http://localhost:5000/skills/addskills",
          { skill },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSelectedSkills([...selectedSkills, skill]);
      } catch (error) {
        console.error("Error adding skill:", error);
      }
    }
  };

  // Remove skill from the database
  const removeSkill = async (skill: string) => {
    try {
      await axios.delete(`http://localhost:5000/skills/deleteskills/${skill}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } catch (error) {
      console.error("Error removing skill:", error);
    }
  };

  // Save skills (this could be optional if skills are saved instantly)
  const handleSave = async () => {
    // Add your logic here if needed (e.g., API call)
    onSkillsModalClose();
  };

  return (
    <div>
      {/* Card to display skills */}
      <Card bg="#1f202a" className="h-auto" minHeight="200px">
        <CardHeader className="text-white text-sm font-poppins">
          My Skills
        </CardHeader>
        <CardBody>
          <Flex flexWrap="wrap" gap={1} mb={2}>
            {selectedSkills.map((skill, index) => (
              <Tag size="sm" key={index} variant="solid">
                <TagLabel fontSize="xs" className="font-poppins">
                  {skill}
                </TagLabel>
                <TagCloseButton onClick={() => removeSkill(skill)} />
              </Tag>
            ))}
          </Flex>
          <Button
            size="xs"
            bgColor="#00af0e"
            onClick={onSkillsModalOpen}
            className="font-poppins"
          >
            Add/Edit Skills
          </Button>
        </CardBody>
      </Card>

      {/* Modal to add/edit skills */}
      <Modal isOpen={isSkillsModalOpen} onClose={onSkillsModalClose} size="lg">
        <ModalOverlay />
        <ModalContent bg="#1f202a" color="white" className="font-poppins">
          <ModalHeader>My Skills</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Display selected skills as tags */}
            <Box className="flex flex-wrap gap-2 mb-4">
              {selectedSkills.map((skill: string) => (
                <Tag key={skill} size="lg" variant="solid" colorScheme="cyan">
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
  );
}

export default Student_Skills;