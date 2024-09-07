import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const HelpForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { codeSnippet } = location.state || {};
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Navigate to the BlogPage with the code snippet and question as state
    navigate("/blogsupport", {
      state: {
        codeSnippet,
        question,
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-xl font-semibold mb-4">Get Help from Peers</h1>
        <div className="bg-gray-100 p-4 mb-4 rounded border border-gray-300">
          <pre className="whitespace-pre-wrap">{codeSnippet}</pre>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="question" className="block mb-2 font-medium">
            Your Question:
          </label>
          <textarea
            id="question"
            rows="4"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ask your question here..."
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-400 text-white py-2 rounded hover:bg-light"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpForm;
