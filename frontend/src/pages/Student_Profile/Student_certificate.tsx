import React from 'react'

import {
  Button,
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
function Student_certificate() {
  return (
    <div>
     {/* Certificate Stats Card */}
     <Card className="col-span-3  h-auto" bg="#1f202a" minHeight="200px">
          <CardHeader className="text-white text-sm font-poppins">My Certificates</CardHeader>
          <CardBody>
            <Flex justify="space-between" align="center">
              <VStack align="start" spacing={0}>
                <Text className="text-xs text-gray-400 font-poppins">Certificate Title</Text>
                <Text className="text-sm font-bold text-white font-poppins">React Developer</Text>
                <Text className="text-xs text-green-500 font-poppins">Completed</Text>
              </VStack>
              <VStack align="start" spacing={0}>
                <Text className="text-xs text-gray-400 font-poppins">Institution</Text>
                <Text className="text-sm font-bold text-white font-poppins">Udemy</Text>
              </VStack>
              <VStack align="start" spacing={0}>
                <Text className="text-xs text-gray-400 font-poppins">Issue Date</Text>
                <Text className="text-sm font-bold text-white font-poppins">March 2024</Text>
              </VStack>
              <VStack align="start" spacing={0}>
                <Text className="text-xs text-gray-400 font-poppins">Score</Text>
                <Text className="text-sm font-bold text-white font-poppins">95%</Text>
                <Text className="text-xs text-green-500 font-poppins">Passed</Text>
              </VStack>
            </Flex>
            <Button size="xs" bgColor="#00af0e" mt={2} className="font-poppins">Add your Certificates</Button>
          </CardBody>
        </Card>

    </div>
  )
}

export default Student_certificate