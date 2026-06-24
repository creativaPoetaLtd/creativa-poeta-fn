import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import { User, MessageSquare, Send } from "lucide-react";
import { fetchSingleBlog, addCommentToBlog, BlogPost as BlogPostType } from "../APIs/Blogs";
import "../styles/custom-inputs.css";

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [comments, setComments] = useState<NonNullable<BlogPostType["comments"]>>([]);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const data = await fetchSingleBlog(id!);
        setBlog(data.blog);
        setComments(data.blog.comments || []);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!commentName.trim() || !commentEmail.trim() || !commentText.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(commentEmail)) {
      toast.error("Please provide a valid email address");
      return;
    }

    if (commentName.trim().length < 2) {
      toast.error("Name must be at least 2 characters long");
      return;
    }

    if (commentText.trim().length < 5) {
      toast.error("Comment must be at least 5 characters long");
      return;
    }

    if (commentText.trim().length > 1000) {
      toast.error("Comment must not exceed 1000 characters");
      return;
    }

    setIsSubmittingComment(true);

    try {
      await addCommentToBlog(id!, {
        name: commentName.trim(),
        email: commentEmail.trim(),
        text: commentText.trim(),
      });

      // Refresh the blog to get updated comments
      const blogData = await fetchSingleBlog(id!);
      setComments(blogData.blog.comments || []);

      // Clear form
      setCommentText("");
      setCommentName("");
      setCommentEmail("");
      toast.success("Comment posted successfully!");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Hero Section */}
        <div className="relative h-96">
          <img
            src={blog?.image || ""}
            alt={blog?.title || ""}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">{blog?.title}</h1>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{blog?.author?.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>
                  {new Date(blog?.createdAt || "").toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="prose prose-lg max-w-none">
            {blog && parse(blog.content)}
          </div>
        </div>

        {/* Comments Section */}
        <div className="border-t border-gray-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>{comments.length} Comments</span>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Comments</h3>

            {/* Comment Form */}
            <form
              onSubmit={handleCommentSubmit}
              className="comment-form space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B] focus:border-transparent transition-all duration-200"
                />
                <input
                  type="email"
                  name="email"
                  value={commentEmail}
                  onChange={(e) => setCommentEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B] focus:border-transparent transition-all duration-200"
                />
              </div>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                rows={4}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B] focus:border-transparent transition-all duration-200 resize-vertical"
              />
              <button
                type="submit"
                disabled={isSubmittingComment}
                className="flex items-center space-x-2 px-6 py-3 bg-[#EEBA2B] text-white rounded-full hover:bg-[#d4a625] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                <span>
                  {isSubmittingComment ? "Posting..." : "Post Comment"}
                </span>
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="bg-gray-50 rounded-lg p-6 space-y-3"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#EEBA2B] rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{comment.name}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 pl-13">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
