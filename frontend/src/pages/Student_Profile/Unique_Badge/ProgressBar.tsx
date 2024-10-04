import React from "react";
import  { useEffect} from "react";
import {
    Button,
    Box,
    Text,
  } from "@chakra-ui/react";
  import { generateImage } from './apiService';
  import { useState } from "react";
  interface ProgressBarProps {
    setImageUrlBronze: React.Dispatch<React.SetStateAction<string>>;
    setImageUrlSilver: React.Dispatch<React.SetStateAction<string>>;
    setImageUrlGold: React.Dispatch<React.SetStateAction<string>>;
    setImageUrlCrystal: React.Dispatch<React.SetStateAction<string>>;
    setImageUrlChampion: React.Dispatch<React.SetStateAction<string>>;
    setImageUrlTitan: React.Dispatch<React.SetStateAction<string>>;
  }
function ProgressBar({ setImageUrlBronze, setImageUrlSilver, setImageUrlGold,setImageUrlCrystal, setImageUrlChampion, setImageUrlTitan }: { setImageUrlBronze: React.Dispatch<React.SetStateAction<string>>, setImageUrlSilver: React.Dispatch<React.SetStateAction<string>>, setImageUrlGold: React.Dispatch<React.SetStateAction<string>>,setImageUrlCrystal: React.Dispatch<React.SetStateAction<string>>, setImageUrlChampion: React.Dispatch<React.SetStateAction<string>>, setImageUrlTitan: React.Dispatch<React.SetStateAction<string>> }){
  const [progress, setProgress] = useState(0);
  const [target, setTarget] = useState(100);
  
  const [bronzeGenerated, setBronzeGenerated] = useState(false);
  const [silverGenerated, setSilverGenerated] = useState(false);
  const [goldGenerated, setGoldGenerated] = useState(false);
  const [crystalGenerated, setCrystalGenerated] = useState(false);
  const [championGenerated, setChampionGenerated] = useState(false);
  const [titanGenerated, setTitanGenerated] = useState(false);

    useEffect(() => {
      // Fetch user data and score when component mounts
      fetchUserData();
    }, []);

    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/user/getuser', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the JWT in localStorage
          }
        });
        const data = await response.json();
        if (data.user && data.user.score !== undefined) {
          setProgress(data.user.score);
          updateProgressAndGenerateImages(data.user.score);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    const updateProgressAndGenerateImages = (score: number) => {
      if (score >= 600 && !titanGenerated) {
        setTarget(600);
        generateAndSetImage('Titan Medal', setImageUrlTitan);
        setTitanGenerated(true);
      }
      if (score >= 500 && !championGenerated) {
        setTarget(600);
        generateAndSetImage('Champion Medal', setImageUrlChampion);
        setChampionGenerated(true);
      }
      if (score >= 400 && !crystalGenerated) {
        setTarget(500);
        generateAndSetImage('Crystal Medal', setImageUrlCrystal);
        setCrystalGenerated(true);
      }
      if (score >= 300 && !goldGenerated) {
        setTarget(400);
        generateAndSetImage('Gold Medal', setImageUrlGold);
        setGoldGenerated(true);
      }
      if (score >= 200 && !silverGenerated) {
        setTarget(300);
        generateAndSetImage('Silver Medal', setImageUrlSilver);
        setSilverGenerated(true);
      }
      if (score >= 100 && !bronzeGenerated) {
        setTarget(200);
        generateAndSetImage('Bronze Medal', setImageUrlBronze);
        setBronzeGenerated(true);
      }
    };
    const generateAndSetImage = async (medalType: string, setImageUrl: React.Dispatch<React.SetStateAction<string>>) => {
      try {
        const response = await generateImage(medalType);
        const blob = new Blob([response], { type: 'image/WebP' });
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } catch (error) {
        console.error(`Error generating ${medalType} image:`, error);
      }
    };
  
    const getColor = () => {
      if (progress < 40) return "#ff0000";
      if (progress < 70) return "#ffa500";
      if (progress < 100) return "#a5ff33";
      if (progress < 120) return "#5fff33";
      if (progress < 140) return "#1dd62b";
      if (progress < 150) return "#00af0e";
      if (progress < 190) return "#04a210";
      if (progress < 250) return "#017a0b";
      return "#026209";
    };
  
    return (
     
      <Box className="all" bg="#0f0a19" color="#eef6f8" p={5} borderRadius="md" boxShadow="md" textAlign="center">
      <Box className="container" mt={10}>
        <Box 
          position="relative" 
          borderRadius="md" 
          height="6px" 
          bg="#e2e8f0"
          mb={3}
        >
          <Box
            position="absolute"
            left={0}
            top={0}
            height="100%"
            width={`${(progress / target) * 100}%`}
            bgColor={getColor()}
            borderRadius="md"
          />
        </Box>
        <Text fontSize="sm" fontWeight="bold" mb={3}>{`${progress}/${target}`}</Text>
        <Button onClick={fetchUserData} size="xs" colorScheme="blue">Refresh Score</Button>
      </Box>
    </Box>
    );
  }

  export default ProgressBar;