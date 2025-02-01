import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";

interface Post {
  _id: string;
  title: string;
  content: string;
  thumbnail?: string;
  videoUrl?: string;
  threadLink: string;
  author: string;
  createdAt: string;
  media: Array<{
    type: "image" | "video";
    url: string;
    thumbnail?: string;
  }>;
}

// Add type definition for window
declare global {
  interface Window {
    handleVideoClick?: (videoSrc: string, thumbnail?: string) => void;
  }
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<{
    url: string;
    thumbnail?: string;
  } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid blog ID");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
    console.log("Fetching blog detail:", {
      id,
      url: `${apiUrl}/api/blog/${id}`,
    });

    axios
      .get<Post>(`${apiUrl}/api/blog/${id}`)
      .then((response) => {
        console.log("Blog detail response:", response.data);
        if (response.data) {
          setPost(response.data);
        } else {
          setError("Blog post not found");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog detail:", {
          error,
          response: error.response,
          status: error.response?.status,
          data: error.response?.data,
        });
        setError(error.response?.data?.message || "Error loading blog post");
        setLoading(false);
      });
  }, [id]);

  const handleVideoClick = (videoSrc: string, thumbnail?: string) => {
    setCurrentVideo({ url: videoSrc, thumbnail: thumbnail || "" });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setCurrentVideo(null);
  };

  const processContent = (content: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    // Xử lý các video trong nội dung
    const videoContainers = tempDiv.querySelectorAll(".video-container");
    videoContainers.forEach((container) => {
      const video = container.querySelector("video");
      const videoSrc = video?.querySelector("source")?.getAttribute("src");
      const thumbnail = video?.getAttribute("poster");

      if (videoSrc && thumbnail) {
        const videoWrapper = document.createElement("div");
        videoWrapper.className = "relative aspect-video mb-4";
        videoWrapper.innerHTML = `
          <div class="relative w-full h-full cursor-pointer" onclick="window.handleVideoClick('${videoSrc}', '${thumbnail}')">
            <img
              src="${thumbnail}"
              alt="Video thumbnail"
              class="w-full h-full object-cover rounded-lg"
            />
            <button
              class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     w-16 h-16 bg-black/50 rounded-full flex items-center justify-center
                     hover:bg-black/70 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
          </div>
        `;

        container.replaceWith(videoWrapper);
      }
    });

    return tempDiv.innerHTML;
  };

  // Add global handler for video clicks
  useEffect(() => {
    window.handleVideoClick = handleVideoClick;
    return () => {
      if (window.handleVideoClick) {
        delete window.handleVideoClick;
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffbf5]">
        <Header />
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#fffbf5]">
        <Header />
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => navigate("/blog")}
              className="flex items-center gap-2 text-claude-text-light-primary hover:text-claude-text-light-secondary transition-colors mb-8 font-content"
            >
              <FiArrowLeft /> Back to Blog
            </button>
            <div className="text-center text-claude-text-light-primary">
              {error || "Blog post not found"}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffbf5]">
      <Header />
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/blog")}
            className="flex items-center gap-2 text-claude-text-light-primary hover:text-claude-text-light-secondary transition-colors mb-8 font-content"
          >
            <FiArrowLeft /> Back to Blog
          </button>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#f5efe6] rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-3 sm:p-4 md:p-6">
              <div
                className="prose text-justify prose-md sm:prose-base md:prose-lg max-w-none text-claude-text-light-secondary
                         prose-headings:text-claude-text-light-primary 
                         prose-h1:text-lg sm:prose-h1:text-xl md:prose-h1:text-2xl
                         prose-h2:text-base sm:prose-h2:text-lg md:prose-h2:text-xl 
                         prose-h3:text-sm sm:prose-h3:text-base md:prose-h3:text-lg
                         prose-p:text-sm sm:prose-p:text-base md:prose-p:text-lg
                         prose-a:text-claude-text-light-primary prose-a:no-underline hover:prose-a:text-claude-text-light-secondary
                         prose-img:rounded-lg prose-img:shadow-md
                         prose-li:text-sm sm:prose-li:text-base md:prose-li:text-lg"
                dangerouslySetInnerHTML={{
                  __html: post ? processContent(post.content) : "",
                }}
              />
              <div className="mt-4 sm:mt-6 text-right border-t border-gray-200 pt-3 sm:pt-4">
                <div className="text-xs sm:text-sm md:text-base text-claude-text-light-tertiary mb-1 sm:mb-2 font-content">
                  <a
                    href={`https://x.com/${post?.author.slice(1)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-claude-text-light-secondary transition-colors"
                  >
                    {post?.author}
                  </a>
                </div>
                <div className="text-xs text-claude-text-light-tertiary">
                  {new Date(post?.createdAt || "").toLocaleDateString()}
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && currentVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={handleCloseModal}
          />

          {/* Modal Content */}
          <div
            className="fixed inset-0 z-10 flex items-center justify-center p-4 md:p-8"
            onClick={handleCloseModal}
          >
            <div
              className="relative w-full max-w-5xl mx-auto bg-black rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-10 right-0 text-white hover:text-gray-300 z-10 p-2"
                onClick={handleCloseModal}
              >
                <svg
                  className="w-6 h-6 md:w-8 md:h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  playsInline
                  poster={currentVideo.thumbnail}
                >
                  <source src={currentVideo.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
