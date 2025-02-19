import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import { User, Heart, MessageSquare, Calendar, Clock, Send } from "lucide-react";
import { TextField } from "@mui/material";

const API_URL = "https://creativapoeta-bn.onrender.com/api/blogs";

interface Blog {
  image: string;
  title: string;
  author: {
    name: string;
  };
  createdAt: string;
  content: string;
  likes: string[];
  comments: Comment[];
}

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState(""); // Add state for user name
  interface Comment {
    _id: string;
    user: string; // Change user to string
    text: string;
    createdAt: string;
  }
  
  const [comments, setComments] = useState<Comment[]>([]);
  const [likes, setLikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);


  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Failed to fetch blog post");
        const data = await response.json();
        setBlog(data.blog);
        setLikes(data.blog.likes.length || 0);
        setComments(data.blog.comments || []);
        const userId = localStorage.getItem("userId");
        setUserLiked(data.blog.likes.includes(userId));
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

    fetchBlog();
  }, [id]);

  const handleLike = () => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
    const postId = id;
  
    if (postId && likedPosts[postId]) {
      // If already liked, remove like
      delete likedPosts[postId];
      setLikes((prev) => prev - 1);
      setUserLiked(false);
    } else {
      // Otherwise, add like
      if (postId) {
        likedPosts[postId] = true;
        setLikes((prev) => prev + 1);
        setUserLiked(true);
      }
    }
  
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
  };
  
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
    if (id && likedPosts[id]) {
      setUserLiked(true);
    }
  }, [id]);
  

  interface CommentResponse {
    comments: Comment[];
  }

  interface CommentSubmitEvent extends React.FormEvent<HTMLFormElement> {}

  const handleCommentSubmit = async (e: CommentSubmitEvent) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) {
      toast.error("User name and comment text are required.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, text: comment }), 
      });
      if (!response.ok) throw new Error("Failed to post comment");
      const data: CommentResponse = await response.json();
      setComments(data.comments); 
      setUserName(""); 
      setComment("");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred");
      }
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
            <h1 className="text-4xl font-bold mb-4">{blog?.title || ""}</h1>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{blog?.author?.name || ""}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{blog ? new Date(blog.createdAt).toLocaleDateString() : ""}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>5 min read</span>
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

        {/* Engagement Section */}
        <div className="border-t border-gray-100 p-8">
            <div className="flex items-center justify-between mb-8">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all ${
              userLiked
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <Heart className={`w-5 h-5 ${userLiked ? "fill-current" : ""}`} />
              <span>{likes} Likes</span>
            </button>
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>{comments.length} Comments</span>
            </div>
            </div>

          {/* Comments Section */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Comments</h3>
            
            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
              />
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                <Send className="w-5 h-5" />
                <span>Post Comment</span>
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.slice().reverse().map((comment) => ( 
                <div
                  key={comment._id}
                  className="bg-gray-50 rounded-lg p-6 space-y-3"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{comment.user}</h4> {/* Display user name */}
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