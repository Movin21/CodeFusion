import axios from 'axios';



// Replace with your Hugging Face API key
const API_KEY = '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';
const API_URL = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell";

export const generateImage = async (prompt: string) => {
    const randomSeed = Math.random().toString(36).substr(2, 5); // generate a random 5-character string
    const uniquePrompt = `${prompt} ${randomSeed}`; // add the random seed to the prompt
    try {
      const response = await axios.post(
        API_URL,
        { inputs: uniquePrompt },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer', // Add this line
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    }
  };

  
