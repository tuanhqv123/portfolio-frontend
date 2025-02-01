import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import ImageCarousel from "../components/ImageCarousel";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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

interface BlogResponse {
  threads: Post[];
  total: number;
  currentPage: number;
  totalPages: number;
}

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogData, setBlogData] = useState<BlogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMedia, setCurrentMedia] = useState<
    Array<{ type: string; url: string; thumbnail?: string }>
  >([]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ITEMS_PER_PAGE = 10;
  const PAGES_TO_SHOW = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
        console.log("Fetching blogs:", {
          url: `${apiUrl}/api/blog?page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
        });

        const response = await axios.get<BlogResponse>(
          `${apiUrl}/api/blog?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
        );

        console.log("Blog response:", response.data);
        if (response.data) {
          setBlogData(response.data);
        } else {
          setError("No blog data received");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch blogs"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleMediaClick = (
    items: Array<{ type: string; url: string; thumbnail?: string }>,
    startIndex: number,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    setCurrentMedia(items);
    setCurrentMediaIndex(startIndex);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const renderModalContent = () => {
    const currentItem = currentMedia[currentMediaIndex];
    if (!currentItem) return null;

    if (currentItem.type === "video") {
      return (
        <div className="relative aspect-video">
          <video
            ref={videoRef}
            className="w-full h-full object-contain bg-black"
            controls
            autoPlay
            playsInline
            poster={currentItem.thumbnail}
          >
            <source src={currentItem.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    return (
      <img
        src={currentItem.url}
        alt="Media"
        className="w-full h-full object-contain"
      />
    );
  };

  const getContentWithoutFirstH1 = (content: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const firstH1 = tempDiv.querySelector("h1");
    if (firstH1) firstH1.remove();
    return tempDiv.innerHTML;
  };

  return (
    <div className="min-h-screen bg-[#fffbf5]">
      <Header />
      <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-24 lg:py-32">
        <h1 className="text-lg sm:text-xl md:text-2xl font-greeting italic font-light mb-6 sm:mb-8 md:mb-16 text-center text-claude-text-light-primary">
          <p>"Ask, and it will be given to you</p>
          <p>seek, and you will find</p>
          <p>knock, and it will be opened to you."</p>
        </h1>

        {/* Blog List */}
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12 md:space-y-24">
          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : !blogData || !blogData.threads.length ? (
            <div className="text-center py-10">No blog posts available.</div>
          ) : (
            blogData.threads.map((post) => (
              <div key={post._id}>
                <article className="transition-all duration-300">
                  <div className="p-3 sm:p-4 md:p-6 hover:shadow-lg rounded-2xl transition-shadow duration-300 bg-[#f5efe6]">
                    <Link to={`/blog/${post._id}`}>
                      <h2 className="text-xl mb-2 sm:mb-4 md:mb-6 lg:mb-8 sm:text-2xl md:text-3xl font-greeting font-bold text-left text-claude-text-light-primary hover:text-claude-text-light-secondary transition-colors">
                        {post.title}
                      </h2>
                    </Link>

                    {post.media && post.media.length > 0 && (
                      <div className="my-3 sm:my-4 relative">
                        <ImageCarousel
                          items={post.media}
                          onMediaClick={(index, e) =>
                            handleMediaClick(post.media, index, e)
                          }
                        />
                      </div>
                    )}

                    <div
                      className="prose prose-sm sm:prose-base md:prose-lg max-w-none mb-4 sm:mb-6 text-claude-text-light-secondary overflow-hidden
                               prose-p:text-sm text-justify sm:prose-p:text-base md:prose-p:text-lg line-clamp-4 leading-snug"
                      dangerouslySetInnerHTML={{
                        __html: getContentWithoutFirstH1(post.content),
                      }}
                    />
                    <div className="flex justify-between items-center text-sm sm:text-base">
                      <span className="text-claude-text-light-primary hover:text-gray-500 transition-colors">
                        <a
                          href={`https://x.com/${post.author.slice(1)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {post.author}
                        </a>
                      </span>
                      <Link
                        to={`/blog/${post._id}`}
                        className="text-claude-text-light-primary hover:text-claude-text-light-secondary transition-colors"
                      >
                        Read more →
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {blogData && blogData.totalPages > 1 && (
          <div className="mt-8 sm:mt-12 md:mt-24 flex justify-center items-center">
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-2 py-1 text-xs sm:text-sm rounded-lg transition-colors ${
                  currentPage === 1
                    ? "text-gray-400"
                    : "text-claude-text-light-primary hover:bg-[#f5efe6]"
                }`}
              >
                Previous
              </button>

              {(() => {
                const totalPages = blogData.totalPages;
                const currentGroup = Math.floor(
                  (currentPage - 1) / PAGES_TO_SHOW
                );
                const start = currentGroup * PAGES_TO_SHOW + 1;
                const end = Math.min(start + PAGES_TO_SHOW - 1, totalPages);
                const pages = [];

                if (currentGroup > 0) {
                  pages.push(
                    <button
                      key="first"
                      onClick={() => setCurrentPage(1)}
                      className="w-6 h-6 md:w-8 md:h-8 text-xs md:text-sm rounded-lg transition-colors flex items-center justify-center text-claude-text-light-primary hover:bg-[#f5efe6]"
                    >
                      1
                    </button>
                  );
                  if (start > 2) {
                    pages.push(
                      <span key="ellipsis1" className="px-2">
                        ...
                      </span>
                    );
                  }
                }

                for (let i = start; i <= end; i++) {
                  pages.push(
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={`w-6 h-6 md:w-8 md:h-8 text-xs md:text-sm rounded-lg transition-colors flex items-center justify-center ${
                        currentPage === i
                          ? "bg-[#f5efe6] text-claude-text-light-primary font-medium shadow-sm"
                          : "text-claude-text-light-primary hover:bg-[#f5efe6]"
                      }`}
                    >
                      {i}
                    </button>
                  );
                }

                if (end < totalPages) {
                  if (end < totalPages - 1) {
                    pages.push(
                      <span key="ellipsis2" className="px-2">
                        ...
                      </span>
                    );
                  }
                  pages.push(
                    <button
                      key="last"
                      onClick={() => setCurrentPage(totalPages)}
                      className="w-6 h-6 md:w-8 md:h-8 text-xs md:text-sm rounded-lg transition-colors flex items-center justify-center text-claude-text-light-primary hover:bg-[#f5efe6]"
                    >
                      {totalPages}
                    </button>
                  );
                }

                return pages;
              })()}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(blogData.totalPages, p + 1))
                }
                disabled={currentPage === blogData.totalPages}
                className={`px-2 py-1 text-xs sm:text-sm rounded-lg transition-colors ${
                  currentPage === blogData.totalPages
                    ? "text-gray-400"
                    : "text-claude-text-light-primary hover:bg-[#f5efe6]"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={handleCloseModal}
          />

          {/* Modal Content */}
          <div
            className="relative w-full max-w-4xl mx-auto p-3 sm:p-4 md:p-6"
            onClick={handleCloseModal}
          >
            <div className="relative" onClick={(e) => e.stopPropagation()}>
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

              <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                {renderModalContent()}
              </div>

              {currentMedia.length > 1 && (
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
                  <button
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-1 md:p-2 text-white hover:text-gray-300 transition-colors backdrop-blur-sm bg-black/20 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentMediaIndex(
                        (prev) =>
                          (prev - 1 + currentMedia.length) % currentMedia.length
                      );
                    }}
                  >
                    <FiChevronLeft size={20} className="md:w-6 md:h-6" />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 md:p-2 text-white hover:text-gray-300 transition-colors backdrop-blur-sm bg-black/20 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentMediaIndex(
                        (prev) => (prev + 1) % currentMedia.length
                      );
                    }}
                  >
                    <FiChevronRight size={20} className="md:w-6 md:h-6" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
