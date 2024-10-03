import axios from "axios";

// create a axios client
export const axiosClient = axios.create({
    baseURL: "http://localhost:5000/blogs",
    headers: {
        "Content-Type": "application/json",
    },
});

// Blogs Functions

export const fetchBlogsFn = () => {
    return axiosClient.get("/readAllBlogs");
};

export const fetchBlogFn = (blogId) => {
    return axiosClient.get(`/readBlog/${blogId}`);
}

export const createBlogFn = (postData) => {
    return axiosClient.post("/createBlog", postData);
};

export const deleteBlogFn = async (id) => {
    return await axiosClient.delete(`/deleteBlog/${id}`);
};

export const updateBlogFn = (id, postData) => {
    return axiosClient.put(`/updateBlog/${id}`, postData);
};


