import axios from "axios";

// Set environment variables (you should use actual environment variables for secure storage)
const token = "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"; // Replace with process.env.TOKEN in real app
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "meta-llama-3-70b-instruct";

// Create an axios instance
const API = axios.create({
  baseURL: endpoint,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // Add token for authorization
  },
});

// Function to evaluate code against a question
export const AIResponse = async (question, code) => {
  try {
    // Prepare the request payload with question and code
    const requestPayload = {
      messages: [
        {
          role: "system",
          content: "You are an AI that evaluates code for specific questions.",
        },
        {
          role: "user",
          content: `Evaluate the following code for the question: "${question}". If the code passes all test cases and is suitable for the question, respond with detailed answer suitable for beginners.\n\nCode:\n${code}`,
        },
      ],
      model: modelName,
      temperature: 0.5, // Adjust temperature for more deterministic output
      max_tokens: 500, // Adjust token limit based on expected response length
      top_p: 1,
    };

    // Make the API call using axios
    const response = await API.post("/chat/completions", requestPayload);

    // Handle the response
    if (response.status !== 200) {
      throw new Error(`API Error: ${response.data.error}`);
    }

    // Extract the result from the response
    const answer = response.data.choices[0].message.content
      .toLowerCase()
      .trim();

    return answer;
  } catch (err) {
    console.error("Error evaluating test cases:", err);
    throw err; // Re-throw for handling in the calling function
  }
};
