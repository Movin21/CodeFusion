import React from "react";
import {
    Button,
    Box,
    Text,
  } from "@chakra-ui/react";
  import { generateImage } from './apiService';
  import { useState } from "react";
    
function ProgressBar({ setImageUrlBronze, setImageUrlSilver, setImageUrlGold,setImageUrlCrystal, setImageUrlChampion, setImageUrlTitan }: { setImageUrlBronze: React.Dispatch<React.SetStateAction<string>>, setImageUrlSilver: React.Dispatch<React.SetStateAction<string>>, setImageUrlGold: React.Dispatch<React.SetStateAction<string>>,setImageUrlCrystal: React.Dispatch<React.SetStateAction<string>>, setImageUrlChampion: React.Dispatch<React.SetStateAction<string>>, setImageUrlTitan: React.Dispatch<React.SetStateAction<string>> }){
  const [progress, setProgress] = useState(0);
  const [target, setTarget] = useState(100);

  const handleButtonClick = () => {
    if (progress + 20 >= target) {
      if (target === 100) {
        generateImage('Bronze Medal').then((response) => {
          const blob = new Blob([response], { type: 'image/WebP' });
          const url = URL.createObjectURL(blob);
          setImageUrlBronze(url);
        });
        setTarget(200); // set the new target to 200
        setProgress(0); // reset the progress to 0
      } else if (target === 200) {
        const newProgress = Math.min(progress + 20, 200); // ensure progress doesn't exceed 200
        setProgress(newProgress);
        if (newProgress === 200) {
          generateImage('Silver Medal').then((response) => {
            const blob = new Blob([response], { type: 'image/WebP' });
            const url = URL.createObjectURL(blob);
            setImageUrlSilver(url);
          });
          setTarget(300); // set the new target to 300
          setProgress(0); // reset the progress to 0
        }
      } else if (target === 300) {
        const newProgress = Math.min(progress + 20, 300); // ensure progress doesn't exceed 300
        setProgress(newProgress);
        if (newProgress === 300) {
          generateImage('Gold Medal').then((response) => {
            const blob = new Blob([response], { type: 'image/WebP' });
            const url = URL.createObjectURL(blob);
            setImageUrlGold(url);
          });
          setTarget(400); 
          setProgress(0);
        }
      }
      else if (target === 400) {
        const newProgress = Math.min(progress + 20, 400); // ensure progress doesn't exceed 300
        setProgress(newProgress);
        if (newProgress === 400) {
          generateImage('Crystal Medal').then((response) => {
            const blob = new Blob([response], { type: 'image/WebP' });
            const url = URL.createObjectURL(blob);
            setImageUrlCrystal(url);
          });
          setTarget(500); 
          setProgress(0);
        }
      }
      else if (target === 500) {
        const newProgress = Math.min(progress + 20, 500); // ensure progress doesn't exceed 300
        setProgress(newProgress);
        if (newProgress === 500) {
          generateImage('Champion Medal').then((response) => {
            const blob = new Blob([response], { type: 'image/WebP' });
            const url = URL.createObjectURL(blob);
            setImageUrlChampion(url);
          });
          setTarget(600); 
          setProgress(0);
        }
      }
      else if (target === 600) {
        const newProgress = Math.min(progress + 20, 600); // ensure progress doesn't exceed 300
        setProgress(newProgress);
        if (newProgress === 600) {
          generateImage('Titan Medal').then((response) => {
            const blob = new Blob([response], { type: 'image/WebP' });
            const url = URL.createObjectURL(blob);
            setImageUrlTitan(url);
          });
        }
      }
    } else {
      setProgress(progress + 20);
    }
  };

  const handleButtonReset = () => {
    setProgress(0);
    setTarget(100); // reset the target to 100
  };
    const getColor = () => {
      if (progress < 40) {
        return "#ff0000";
      } else if (progress < 70) {
        return "#ffa500";
      } else if(progress < 100){
        return "#a5ff33 ";
      }
      else if(progress <120){
         return"#5fff33"
      }
      else if(progress <140){
        return"#1dd62b"
     }
     else if(progress <150){
        return"#00af0e"
     }
     else if(progress <190){
        return"#04a210"
     }
     else if(progress <250){
        return"#017a0b"
     }
     else if(progress >=250){
        return"#026209"
     }
    };
  
    return (
      // <div className="all">
      //   <div className="container">

      //     <div className="progress-bar">
      //       <div className="progress-bar-fill" style={{ width: `${(progress / target) * 100}%`, backgroundColor: getColor() }}></div>
      //     </div>
          
      //     <div className="progress-label">{`${progress}/${target}`}</div>
      //     <button onClick={handleButtonClick}>progress</button>
      //     <button onClick={handleButtonReset}>reset</button>
      //   </div>
      // </div>
      <Box className="all" bg="#1f202a" color="#eef6f8" p={5} borderRadius="md" boxShadow="md" textAlign="center">
      <Box className="container" mt={10}>
        <Box 
          position="relative" 
          borderRadius="md" 
          height="10px" 
          bg="#e2e8f0" // Light gray for the background of the progress bar
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
        <Text fontSize="lg" fontWeight="bold" mb={3}>{`${progress}/${target}`}</Text>
        <Button onClick={handleButtonClick} size="sm" bgColor="#00af0e" mr={3}>Progress</Button>
        <Button onClick={handleButtonReset} size="sm" colorScheme="red">Reset</Button>
      </Box>
    </Box>
    );
  }

  export default ProgressBar;