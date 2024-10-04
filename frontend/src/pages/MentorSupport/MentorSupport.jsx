import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaRobot } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

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
  const [loading, setLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [firstName, setFirstName] = useState(""); // State to store the first name of the user
  const toast = useToast(); // Assuming you're using Chakra UI for toast notifications
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get("http://localhost:5000/user/getuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Check if response.data has the user object
        if (response.data && response.data.user) {
          // Set the first name in the state
          setFirstName(response.data.user.firstname);
        } else {
          throw new Error("User data not found");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);

        // Handle specific error cases if needed
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          localStorage.removeItem("token");
          toast({
            title: "Session Expired",
            description: "Your session has expired. Please log in again.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          navigate("/login");
        } else {
          toast({
            title: "Error",
            description:
              error.message || "An error occurred while fetching user data.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    };

    fetchUserData();
  }, [navigate, toast]); // Include navigate and toast in the dependency array

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

  const handleAddComment = async (index) => {
    const id = posts[index]._id; // Use the passed index here
    const mentorComment = newComment[index] || ""; // Extract the input comment for the specific post
    const mentorName = firstName; // You can dynamically set this based on the logged-in user or any other method

    if (!mentorComment) {
      setErrorMessage("Comment cannot be empty."); // Alert the user if the comment is empty
      return;
    }

    try {
      setLoading(true); // Set loading to true
      setErrorMessage(""); // Clear previous error messages

      const updatedPost = {
        comment: mentorComment,
        mentorName,
        createdAt: new Date().toISOString(),
      };

      await axios.put(
        `http://localhost:5000/questions/updateQuestionPool/${id}`,
        updatedPost
      );

      console.log("Comment added successfully");

      // Fetch updated questions after adding the comment
      const questionPools = await fetchQuestions();
      setPosts(questionPools); // Update posts with the fetched questions

      setNewComment((prev) => ({ ...prev, [index]: "" })); // Clear the comment input for this post
    } catch (error) {
      console.error("Error adding mentor comment:", error);
      setErrorMessage("Failed to add comment. Please try again."); // Set error message
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
  };

  const [visibleComments, setVisibleComments] = useState(3); // Set the initial number of visible comments

  const handleSeeMore = () => {
    setVisibleComments((prev) => prev + 3); // Increase the number of visible comments by 3
  };

  const handleShowMore = (index) => {
    setShowMore((prevShowMore) => ({
      ...prevShowMore,
      [index]: !prevShowMore[index], // Toggle the showMore state for this index
    }));
  };

  return (
    <div className="flex justify-center bg-[#0f0a19] py-12">
      <div className="w-full max-w-6xl px-4">
        <h1 className="text-3xl font-semibold mb-8 text-white">
          Mentor Support Blog
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
              className="w-full p-2 pl-4 border border-gray-600 bg-[#1c1a29] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            />
            <button
              onClick={() => setSearchQuery(searchQuery)}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 py-2 px-3 rounded-md flex items-center justify-center hover:text-gray-300 transition-colors duration-300"
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
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unanswered")}
              className={`py-2 px-4 rounded-md ${
                filter === "unanswered"
                  ? "bg-light text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              Unanswered
            </button>
            <button
              onClick={() => setFilter("newest")}
              className={`py-2 px-4 rounded-md ${
                filter === "newest"
                  ? "bg-light text-white"
                  : "bg-gray-700 text-gray-300"
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
              className="bg-[#1c1a29] p-6 rounded-lg shadow-md mb-8 border border-gray-700 text-white"
            >
              <h2 className="text-xl font-semibold mb-2 text-white">
                {post.questionTitle}
              </h2>
              <pre className="bg-[#252d3e] p-4 rounded-md border border-gray-600 whitespace-pre-wrap text-sm text-gray-200 mb-4">
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
                className="w-full p-3 border border-gray-600 bg-[#2b2738] text-white rounded-md mb-4"
              />
              <div className="flex space-x-4 mb-4">
                <button
                  className="bg-blue-900 text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-blue-800"
                  onClick={() => handleAddComment(index)}
                >
                  Add Comment
                </button>
                <button
                  className="bg-green-900 text-white text-sm font-semibold py-2 px-4 rounded-md flex items-center space-x-2 hover:bg-green-800"
                  onClick={() => handleGetAiSupport(post, index)}
                  disabled={loadingId === index}
                >
                  <FaRobot className="mr-2" />
                  {loadingId === index ? "Generating..." : "Get AI Support"}
                </button>
              </div>

              {/* AI Response */}
              <div className="border-t border-gray-600 pt-4">
                {aiResponses[index] && (
                  <div className="bg-[#252d3e] border-l-4 border-green-700 p-4 mb-4 rounded-md">
                    <div className="flex items-center mb-2">
                      <span className="text-green-600 text-sm font-semibold">
                        AI-Generated Response
                      </span>
                      <FaRobot className="ml-2 text-green-600" />
                    </div>
                    <h3 className="font-medium text-gray-200">
                      Response from AI:
                    </h3>
                    <p
                      className="text-gray-200"
                      dangerouslySetInnerHTML={{
                        __html: showMore[index]
                          ? aiResponses[index].replace(/\n/g, "<br/>")
                          : `${aiResponses[index]
                              .substring(0, 150)
                              .replace(/\n/g, "<br/>")}...`,
                      }}
                    />
                    <button
                      onClick={() => handleShowMore(index)}
                      className="text-blue-400 hover:underline mt-2"
                    >
                      {showMore[index] ? "Show less" : "Show more"}
                    </button>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-gray-100">
                  Mentor Comments:
                </h3>
                {post.mentorComments
                  .slice(0, visibleComments)
                  .map((comment, idx) => (
                    <div
                      key={idx}
                      className="p-3 mt-2 border-l-4 border-blue-700 bg-[#252d3e] rounded-md"
                    >
                      <p className="text-sm">
                        <span className="font-semibold">
                          {comment.mentorName}:{" "}
                        </span>
                        {comment.comment}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                {visibleComments < post.mentorComments.length && (
                  <button
                    onClick={handleSeeMore}
                    className="text-blue-400 hover:underline mt-2"
                  >
                    See More
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No blog posts found.</p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
