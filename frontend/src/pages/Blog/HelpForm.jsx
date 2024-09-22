import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const HelpForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { codeSnippet } = location.state || {};
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Code Snippet:", codeSnippet);
    console.log("Question:", question);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white ">
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
