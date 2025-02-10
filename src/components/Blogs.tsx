import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = "https://creativapoeta-bn.onrender.com/api/blogs";

const BlogGrid = () => {
  const [blogs, setBlogs] = useState<
    { _id: string; title: string; image?: string }[]
  >([]);
const navigate = useNavigate();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
    
        const BASE_URL = "https://creativapoeta-bn.onrender.com/"; // Change if needed
    
        const updatedBlogs = data.blogs.map((blog: any) => ({
          ...blog,
          image: blog.image.startsWith("http")
            ? blog.image
            : `${BASE_URL}${blog.image}`, // Ensure full URL
        }));
    
        console.log("Processed blogs:", updatedBlogs); // Debugging
        setBlogs(updatedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    
    fetchBlogs();
  }, []);

  return (
    <div className="w-[80%] px-4 mt-24 py-10 justify-center mx-auto items-center">
      {/* Page title */}
      <h1 className="text-4xl font-bold text-center text-white mb-16">
        Latest Blogs
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column */}
        <div className="md:w-1/2 space-y-8">
          {blogs
            .filter((_, idx) => idx % 2 === 0)
            .map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 aspect-square"
              >
                <a href="#" onClick={()=>navigate(`/blogs/${blog._id}`)}  className="flex flex-col h-full">
                  <div className="w-full h-3/4">
                    <img
                      src={blog.image || "/consult.jpeg"}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/consult.jpeg"; // Fallback image
                      }}
                    />
                  </div>
                  <div className="p-6 h-1/4 flex items-center">
                    <h2 className="text-2xl font-bold text-gray-900 line-clamp-2">
                      {blog.title}
                    </h2>
                  </div>
                </a>
              </div>
            ))}
        </div>

        {/* Right Column */}
        <div className="md:w-1/2 space-y-16">
          {blogs
            .filter((_, idx) => idx % 2 === 1)
            .map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 aspect-square"
              >
                <a href="#" onClick={()=>navigate(`/blogs/${blog._id}`)} className="flex flex-col h-full">
                  <div className="w-full h-3/4">
                    <img
                      src={blog.image || "/consult.jpeg"}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/consult.jpeg"; // Fallback image
                      }}
                    />
                  </div>
                  <div className="p-6 h-1/4 flex items-center">
                    <h2 className="text-2xl font-bold text-gray-900 line-clamp-2">
                      {blog.title}
                    </h2>
                  </div>
                </a>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogGrid;
