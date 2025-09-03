import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MessageCircle, Heart, User, ArrowRight } from "lucide-react";
import BlogLocale from "../i18n/BlogLocale";

const API_URL = "https://creativapoeta-bn.onrender.com/api/blogs";

// Get selected language from localStorage
const rawLang = localStorage.getItem("selectedLang");
const selectedLang = rawLang && ["en", "fr", "kiny" ,"nl"].includes(rawLang) ? rawLang : "en";
const locale = BlogLocale[selectedLang]; // safely get the locale

const BlogGrid = () => {
  const [loading, setLoading] = useState(true);

  interface Blog {
    _id: string;
    title: string;
    content: string;
    author: { name: string };
    createdAt: string;
    image?: string;
    likes: any[];
    comments: any[];
  }

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const data = await response.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500"></div>
      </div>
    );
  }

  interface FormatDate {
    (dateString: string): string;
  }

  const formatDate: FormatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  interface GetPlainTextExcerpt {
    (htmlContent: string): string;
  }

  const getPlainTextExcerpt: GetPlainTextExcerpt = (htmlContent) => {
    const div = document.createElement("div");
    div.innerHTML = htmlContent;
    const text = div.textContent || div.innerText;
    return text.slice(0, 150) + "...";
  };

  const BlogCard = ({ blog }: { blog: Blog }) => (
    <div className="group bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        <img
          src={blog.image || "/consult.jpeg"}
          alt={blog.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = "/consult.jpeg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>{blog.author.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-yellow-500 transition-colors duration-300">
          {blog.title}
        </h2>

        <p className="text-gray-600 line-clamp-3">{getPlainTextExcerpt(blog.content)}</p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex space-x-4">
            <div className="flex items-center space-x-1 text-gray-600">
              <Heart className="w-4 h-4" />
              <span>{blog.likes.length}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <MessageCircle className="w-4 h-4" />
              <span>{blog.comments.length}</span>
            </div>
          </div>

          <button
            onClick={() => navigate(`/blogs/${blog._id}`)}
            className="flex items-center text-yellow-500 hover:text-yellow-700 transition-colors duration-300 group/button"
          >
            {locale.readMore} {/* <-- localized text */}
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover/button:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent mt-16">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">{locale.pageTitle}</h1>
          <div className="flex justify-center items-center space-x-2">
            <div className="h-1 bg-yellow-500 rounded-full" />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            {blogs.filter((_, idx) => idx % 2 === 0).map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
          <div className="space-y-8">
            {blogs.filter((_, idx) => idx % 2 === 1).map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogGrid;
