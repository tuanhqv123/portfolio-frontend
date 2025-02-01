import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true,
});

export interface Blog {
  _id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  authorLink: string;
  openInXLink: string;
  threadLink: string;
  createdAt: string;
  video?: {
    url: string;
    thumbnail: string;
    overlayClass: string;
    videoClass: string;
  };
}

export interface PaginatedBlogs {
  data: Blog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const getBlogs = async (
  page = 1,
  limit = 10
): Promise<PaginatedBlogs> => {
  const response = await axiosInstance.get("/blogs", {
    params: { page, limit },
  });
  return response.data;
};

export const getBlogById = async (id: string): Promise<Blog> => {
  const response = await axiosInstance.get(`/blogs/${id}`);
  return response.data;
};

export const api = axiosInstance;
