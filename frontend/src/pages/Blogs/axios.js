import axios from "axios";

// create a axios client
export const axiosClient = axios.create({
    baseURL: "http://localhost:5000/blogs",
    headers: {
        "Content-Type": "application/json",
    },
});

// Blogs Functions

export const fetchBlogsFn = async () => {
    return await axiosClient.get("/readAllBlogs");
};

export const fetchBlogFn = async (blogId) => {
    return await axiosClient.get(`/readBlog/${blogId}`);
}

export const createBlogFn = async (postData) => {
    return await axiosClient.post("/createBlog", postData);
};

export const deleteBlogFn = async (blogId) => {
    return await axiosClient.delete(`/deleteBlog/${blogId}`);
};

export const updateBlogFn = async (blogId, postData) => {
    return await axiosClient.put(`/updateBlog/${blogId}`, postData);
};


