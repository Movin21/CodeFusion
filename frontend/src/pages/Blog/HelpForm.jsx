import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import axios from "axios"; // Import Axios
import { useToast } from "@chakra-ui/react"; // Import useToast from Chakra UI

const HelpForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast(); // Initialize the toast
  const { codeSnippet } = location.state || {};
  const [question, setQuestion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend API
      const response = await axios.post(
        "http://localhost:5000/questions/createQuestionPool",
        {
          questionTitle: question,
          mentorComments: [], // Assuming you want to start with an empty array
          aiComment: "AI response goes here", // You can modify this based on your requirements
          codeSnippet,
        }
      );

      // Handle the response as needed
      console.log("Response from the server:", response.data);

      // Show a success toast
      toast({
        title: "Question Submitted",
        description:
          "Your request for mentor support has been submitted successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
        variant: "solid",
      });

      // Navigate to the blog support page
      navigate("/blogsupport");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description:
          error.message || "An error occurred while submitting your request.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
        variant: "solid",
      });
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white"
      style={{ backgroundColor: "#0f0a19" }}
    >
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-3xl border border-white">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Request Mentor Support
        </h1>

        <div className="mb-6">
          <label htmlFor="codeSnippet" className="block mb-2 font-medium">
            Answer that you have provided:
          </label>
          <div className="border border-white rounded overflow-hidden">
            <SyntaxHighlighter
              language="javascript"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: "1rem",
                backgroundColor: "#1E1E1E",
              }}
            >
              {codeSnippet}
            </SyntaxHighlighter>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="question" className="block mb-2 font-medium">
            Explain the problem you are facing clearly:
          </label>
          <textarea
            id="question"
            rows="6"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 border border-white rounded focus:outline-none focus:ring-2 focus:ring-white text-white"
            placeholder="Describe your problem here..."
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-200 text-black py-2 rounded hover:bg-blue-400 transition duration-300"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpForm;
