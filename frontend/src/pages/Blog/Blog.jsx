import { useState, useMemo } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa"; // Importing the search icon from react-icons

const token = "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";
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "meta-llama-3-70b-instruct";

const API = axios.create({
  baseURL: endpoint,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const AIResponse = async (question, code) => {
  try {
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

    const response = await API.post("/chat/completions", requestPayload);

    if (response.status !== 200) {
      throw new Error(`API Error: ${response.data.error}`);
    }

    const answer = response.data.choices[0].message.content.trim();

    return answer;
  } catch (err) {
    console.error("Error evaluating test cases:", err);
    throw err;
  }
};

const BlogPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      question: "How to display a code snippet with indentation?",
      codeSnippet: `const handleAddComment = (questionId) => {
  setQuestions((prevQuestions) =>
    prevQuestions.map((q) =>
      q.id === questionId
        ? { ...q, comments: [...q.comments, commentText] }
        : q
    )
  );
  setCommentText(""); // Reset comment box after adding
};`,
      comments: [],
      date: new Date("2024-09-15"),
    },
    {
      id: 2,
      question: "How to use React useState?",
      codeSnippet: `const [state, setState] = useState(initialValue);
      
setState(newValue);`,
      comments: [],
      date: new Date("2024-09-17"),
    },
    {
      id: 3,
      question: "How to map over an array in React?",
      codeSnippet: `const items = ['apple', 'banana', 'cherry'];

return (
  <ul>
    {items.map(item => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);`,
      comments: [{ text: "Use unique keys for lists!", type: "mentor" }],
      date: new Date("2024-09-16"),
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [aiResponses, setAiResponses] = useState({});
  const [loadingId, setLoadingId] = useState(null);
  const [newComment, setNewComment] = useState({});
  const [showMore, setShowMore] = useState({});

  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        if (filter === "unanswered") return post.comments.length === 0;
        return true;
      })
      .filter((post) =>
        post.question.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => (filter === "newest" ? b.date - a.date : 0));
  }, [filter, searchQuery, posts]);

  const handleGetAiSupport = async (post, index) => {
    setLoadingId(index);
    setAiResponses((prevResponses) => ({
      ...prevResponses,
      [index]: "",
    }));

    try {
      const response = await AIResponse(post.question, post.codeSnippet);
      setAiResponses((prevResponses) => ({
        ...prevResponses,
        [index]: response,
      }));
    } catch (error) {
      console.error("Error fetching AI support:", error);
      setAiResponses((prevResponses) => ({
        ...prevResponses,
        [index]: "Failed to get AI support. Please try again.",
      }));
    } finally {
      setLoadingId(null);
    }
  };

  const handleAddComment = (index) => {
    const comment = newComment[index] || "";
    if (comment.trim()) {
      setPosts((prevPosts) =>
        prevPosts.map((post, i) =>
          i === index
            ? {
                ...post,
                comments: [...post.comments, { text: comment, type: "mentor" }],
              }
            : post
        )
      );
      setNewComment((prev) => ({ ...prev, [index]: "" }));
    }
  };

  const handleShowMore = (index) => {
    setShowMore((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="flex justify-center bg-gray-100 py-12">
      <div className="w-full max-w-6xl px-4">
        <h1 className="text-3xl font-semibold mb-8 text-gray-900">
          Blog Posts
        </h1>

        {/* Search and Filter Options */}
        <div className="flex justify-between items-center mb-6">
          {/* Search Box */}
          <div className="relative w-full max-w-sm">
            {" "}
            {/* Increased width to max-w-4xl */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by question..."
              className="w-full p-2 pl-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            />
            <button
              onClick={() => setSearchQuery(searchQuery)}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 py-2 px-3 rounded-md flex items-center justify-center hover:text-gray-700 transition-colors duration-300"
            >
              <FaSearch />
            </button>
          </div>

          {/* Filter Dropdown */}
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter("all")}
              className={`py-2 px-4 rounded-md ${
                filter === "all"
                  ? "bg-light text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unanswered")}
              className={`py-2 px-4 rounded-md ${
                filter === "unanswered"
                  ? "bg-light text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              Unanswered
            </button>
            <button
              onClick={() => setFilter("newest")}
              className={`py-2 px-4 rounded-md ${
                filter === "newest"
                  ? "bg-light text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              Newest
            </button>
          </div>
        </div>

        {/* Blog Posts */}
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-300"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {post.question}
              </h2>
              <pre className="bg-gray-50 p-4 rounded-md border border-gray-300 whitespace-pre-wrap text-sm text-gray-800 mb-4">
                {post.codeSnippet}
              </pre>

              <textarea
                value={newComment[index] || ""}
                onChange={(e) =>
                  setNewComment((prev) => ({
                    ...prev,
                    [index]: e.target.value,
                  }))
                }
                placeholder="Add your mentor comment..."
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-md mb-4"
              ></textarea>

              <div className="flex space-x-4 mb-4">
                <button
                  className="bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-blue-900 transition duration-200"
                  onClick={() => handleAddComment(index)}
                >
                  Add Mentor Comment
                </button>
                <button
                  className="bg-green-700 text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-green-900 transition duration-200"
                  onClick={() => handleGetAiSupport(post, index)}
                  disabled={loadingId === index}
                >
                  {loadingId === index ? "Loading..." : "Get AI Support"}
                </button>
              </div>

              {/* Comments Section */}
              <div className="border-t border-gray-200 pt-4">
                {aiResponses[index] && (
                  <div>
                    <p className="font-semibold">
                      <span className="text-green-700 text-xs font-semibold bg-green-100 px-2 py-1 rounded-md ">
                        AI-Generated
                      </span>
                    </p>
                    {showMore[index] ? (
                      <>
                        <p className="whitespace-pre-wrap ml-2">
                          {aiResponses[index]}
                        </p>
                        <button
                          onClick={() => handleShowMore(index)}
                          className="text-blue-500 text-sm mt-2"
                        >
                          Show less
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="whitespace-pre-wrap ">
                          {aiResponses[index].slice(0, 150)}...
                        </p>
                        <button
                          onClick={() => handleShowMore(index)}
                          className="text-blue-500 text-sm mt-2 "
                        >
                          See more
                        </button>
                      </>
                    )}
                  </div>
                )}

                {/* Mentor Comments */}
                {post.comments.length > 0 ? (
                  post.comments.map((comment, idx) => (
                    <div
                      key={idx}
                      className="text-sm mb-2 flex items-center mt-4 border-t"
                    >
                      <span
                        className={`${
                          comment.type === "mentor"
                            ? "text-blue-600"
                            : "text-green-600"
                        } font-semibold
                        mt-2
                        `}
                      >
                        Mentor:
                      </span>
                      <span className="ml-2 mt-2">{comment.text}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 mt-2">
                    No Mentor comments yet.
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No blog posts found.</p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
