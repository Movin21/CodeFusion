import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaRobot } from "react-icons/fa"; // Add FaRobot here

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

// Function to fetch questions from the backend
const fetchQuestions = async () => {
  const response = await axios.get(
    "http://localhost:5000/questions/getAllQuestionPools"
  );
  console.log("Questions:", response.data);
  return response.data;
};

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
          content: `You are an AI code evaluator. Given the following code snippet and the associated question, provide a detailed and beginner-friendly explanation.
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
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [aiResponses, setAiResponses] = useState({});
  const [loadingId, setLoadingId] = useState(null);
  const [newComment, setNewComment] = useState({});
  const [showMore, setShowMore] = useState({});

  // Fetch questions on component mount
  useEffect(() => {
    const getQuestions = async () => {
      try {
        const questionPools = await fetchQuestions();
        setPosts(questionPools);
      } catch (error) {
        console.error("Error fetching question pools:", error);
      }
    };

    getQuestions();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        if (filter === "unanswered") return post.mentorComments.length === 0;
        return true;
      })
      .filter((post) =>
        post.questionTitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) =>
        filter === "newest" ? new Date(b.createdAt) - new Date(a.createdAt) : 0
      );
  }, [filter, searchQuery, posts]);

  const handleGetAiSupport = async (post, index) => {
    setLoadingId(index);
    setAiResponses((prevResponses) => ({
      ...prevResponses,
      [index]: "",
    }));

    try {
      const response = await AIResponse(post.questionTitle, post.codeSnippet);
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
                mentorComments: [
                  ...post.mentorComments,
                  { comment, mentorName: "Mentor", createdAt: new Date() },
                ],
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
              key={post._id}
              className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-300"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {post.questionTitle}
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
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4 rounded-md">
                    <div className="flex items-center mb-2">
                      <span className="text-green-600 font-semibold">
                        AI Response:
                      </span>
                      <span className="ml-2 text-green-500">
                        <FaRobot />
                      </span>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-sm border border-gray-300">
                      <div className="font-medium text-gray-800">
                        <strong>System:</strong> You are an AI that evaluates
                        code for specific questions.
                      </div>
                      <div className="font-medium text-gray-800 mt-2">
                        <strong>User:</strong> {post.questionTitle}
                      </div>
                      <div className="mt-2 text-gray-700">
                        <strong>AI:</strong>{" "}
                        {showMore[index]
                          ? aiResponses[index]
                          : `${aiResponses[index].slice(0, 100)}...`}
                      </div>
                      <button
                        onClick={() => handleShowMore(index)}
                        className="mt-2 text-blue-600 underline"
                      >
                        {showMore[index] ? "Show less" : "See more"}
                      </button>
                    </div>
                  </div>
                )}

                {post.mentorComments.map((comment, i) => (
                  <div key={i} className="mt-2">
                    <p className="font-semibold text-gray-800">
                      {comment.mentorName}
                    </p>
                    <p className="text-gray-600">{comment.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
