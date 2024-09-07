import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

// Set environment variables (you should use actual environment variables for secure storage)
const token = "YOUR_API_KEY"; // Replace with process.env.TOKEN in real app
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "meta-llama-3-70b-instruct";

// Create an axios instance
const API = axios.create({
  baseURL: endpoint,
  headers: {
    "Content-Type": "application/json",
    Authorization: `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`, // Add token for authorization
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
          content: `You are an AI code evaluator. Given the following code snippet and the associated question, provide a detailed and beginner-friendly explanation. Your response should include the following:
            
            1. **Code Overview**: A summary of what the code does.
            2. **Explanation**: A step-by-step explanation of how the code works and how it addresses the question.
            3. **Examples**: Provide examples of input and output if relevant.
            4. **Tips**: Include any tips or best practices for understanding or improving the code.
            
            **Code Snippet:**
            ${code}
            
            **Question:**
            ${question}
            
            Ensure your response is clear and easy to understand for someone who might be new to this topic.`,
        },
      ],
      model: modelName,
      temperature: 0.5,
      max_tokens: 500,
      top_p: 1,
    };

    // Make the API call using axios
    const response = await API.post("/chat/completions", requestPayload);

    // Handle the response
    if (response.status !== 200) {
      throw new Error(`API Error: ${response.data.error}`);
    }

    // Extract the result from the response
    const answer = response.data.choices[0].message.content.trim();

    return answer;
  } catch (err) {
    console.error("Error evaluating test cases:", err);
    throw err; // Re-throw for handling in the calling function
  }
};

const BlogPage = () => {
  const location = useLocation();
  const [posts, setPosts] = useState(location.state ? [location.state] : []);
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGetAiSupport = async (post) => {
    setLoading(true);
    setAiResponse(""); // Clear previous AI response

    try {
      const response = await AIResponse(post.question, post.codeSnippet);
      setAiResponse(response);
    } catch (error) {
      console.error("Error fetching AI support:", error);
      setAiResponse("Failed to get AI support. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 ">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Blog Posts</h1>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-300 "
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Question: {post.question}
            </h2>
            <pre className="bg-gray-100 p-4 mb-4 rounded-lg border border-gray-300 whitespace-pre-wrap">
              {post.codeSnippet}
            </pre>

            <button
              className="bg-blue-500 text-white text-xs font-semibold py-2 px-4 rounded-lg hover:bg-light transition duration-150"
              onClick={() => handleGetAiSupport(post)}
              disabled={loading}
            >
              {loading ? "Getting AI Support..." : "Get AI Support"}
            </button>

            {aiResponse && (
              <div className="mt-6 p-4 rounded-lg border border-gray-300 bg-white shadow-md">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  AI Response:
                </h3>
                <p className="text-gray-700 whitespace-pre-wrap text-sm font-semibold ">
                  {aiResponse}
                </p>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-700">
          No posts available yet. Please add a new post.
        </p>
      )}
    </div>
  );
};

export default BlogPage;
