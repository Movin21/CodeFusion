const ModelClient = require("@azure-rest/ai-inference").default; // Change for CommonJS
const { AzureKeyCredential } = require("@azure/core-auth");
const Blog = require("../../../models/blogsModel"); // Ensure this path is correct
const Question = require("../../../models/questionPool");

const token = "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";
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "meta-llama-3-70b-instruct";

// Check if the token exists
if (!token) {
  throw new Error("LLAMA_TOKEN is not defined in environment variables");
}

// Initialize the ModelClient
const client = new ModelClient(endpoint, new AzureKeyCredential(token));

// Main function to generate dynamic content for the last day
const dynamicContentGenerate = async () => {
  try {
    console.log("Starting content generation process...");

    // Get the date for the last 24 hours
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    // Fetch questions created in the last 24 hours
    const questions = await Question.find({
      "mentorComments.createdAt": { $gte: yesterday },
    }).sort({ "mentorComments.createdAt": -1 });

    if (!questions.length) {
      console.log("No questions found in the last 24 hours");
      return;
    }

    // Analyze the questions
    const questionAnalysis = questions.map((q) => ({
      title: q.questionTitle,
      comments: q.mentorComments.map((c) => c.comment).join(", "),
      date: q.mentorComments[0].createdAt,
    }));

    // Group questions by day
    const dailyQuestions = {};
    questionAnalysis.forEach((q) => {
      const dayKey = getDayKey(new Date(q.date));
      if (!dailyQuestions[dayKey]) {
        dailyQuestions[dayKey] = [];
      }
      dailyQuestions[dayKey].push(q);
    });

    // Create daily analysis text
    const dailyAnalysis = Object.entries(dailyQuestions)
      .map(([day, questions]) => {
        return `Day ${day}:\nQuestions: ${questions
          .map((q) => q.title)
          .join(", ")}\nKey Discussions: ${questions
          .map((q) => q.comments)
          .join(" ")}`;
      })
      .join("\n\n");
    console.log(dailyAnalysis);

    // Prompt for generating the report
    const prompt = `As a Software engineer, create a comprehensiveblog post suitable for beginners based on the following question data:

${dailyAnalysis}

Generate a detailed blog post in JSON format without any additional comments or explanations content limit to 50 words:
{
  "title": "Daily Programming Insights: [Key Theme]",
  "content": "Detailed analysis here..."
}`;

    // Send request to the AI model
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          {
            role: "system",
            content:
              "You are a technical analyst and blog writer who creates insightful reports about programming trends and developer challenges.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
        model: modelName,
      },
    });

    // Check response status
    if (response.status !== "200") {
      throw response.body.error;
    }

    // Log the raw response
    const rawResponse = response.body.choices[0].message.content;
    console.log("Raw AI Response:", rawResponse);

    // Try to parse the response
    let dailyReport;
    try {
      // Remove any leading or trailing whitespace
      const trimmedResponse = rawResponse.trim();

      // Check if the response starts and ends with valid JSON characters
      if (trimmedResponse.startsWith("{") && trimmedResponse.endsWith("}")) {
        dailyReport = JSON.parse(trimmedResponse);
      } else {
        throw new Error("AI response is not valid JSON");
      }
    } catch (error) {
      console.error("Failed to parse JSON from AI response:", error.message);
      console.log("Raw response was:", rawResponse);
      return; // Exit early on error
    }

    // Log the parsed response
    console.log("Parsed AI Response:", dailyReport);

    // Save the blog post
    const blog = new Blog({
      title: dailyReport.title,
      content: dailyReport.content,
    });
    await blog.save();

    console.log("Daily report generated and saved successfully");
    return blog;
  } catch (error) {
    if (error.response) {
      console.error("API Response:", error.response.data);
      console.error("Status Code:", error.response.status);
    } else {
      console.error("Error in content generation process:", error.message);
    }
  }
};

// Helper function to format date as a key
function getDayKey(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

// Export the function as a module
module.exports = dynamicContentGenerate;
