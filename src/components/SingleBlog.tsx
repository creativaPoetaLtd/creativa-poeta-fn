import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaThumbsUp,
  FaComment,
  // FaFacebook,
  // FaTwitter,
  // FaLinkedin,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import parse from "html-react-parser"; // Import the library
import { toast } from "react-toastify";

const API_URL = "https://creativapoeta-bn.onrender.com/api/blogs";

const BlogPost = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<{ text: string; createdAt: string; user?: { name: string } }[]>([]);
  const [likes, setLikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);

  const token = localStorage.getItem("token"); 

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Failed to fetch blog post");
        const data = await response.json();
  
        setBlog(data.blog);
        setLikes(data.blog.likes.length || 0);
        setComments(data.blog.comments || []); 
  
        const userId = localStorage.getItem("userId"); 
        setUserLiked(data.blog.likes.includes(userId));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBlog();
  }, [id]);
  
  const handleLike = async () => {
    if (!token) {
      alert("You must be logged in to like this post.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to toggle like");

      const data = await response.json();
      setLikes(data.likes);
      setUserLiked(!userLiked);
    } catch (err) {
      console.error("Error liking blog:", err);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      toast.error("You must be logged in to comment.");
      return;
    }
    if (!comment.trim()) return;

    try {
      const response = await fetch(`${API_URL}/${id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: comment }),
      });

      if (!response.ok) throw new Error("Failed to post comment");

      const data = await response.json();
      setComments(data.comments); // Update comments from API response
      setComment(""); // Clear input
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };
  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="w-[80%] mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <FaUser className="w-6 h-6 text-gray-500" />
            </div>
            <div>
              <div className="font-medium">{blog.author || "Unknown Author"}</div>
              <div className="text-sm text-gray-500">
                Published on {new Date(blog.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {blog.image && (
            <img src={blog.image} alt={blog.title} className="w-full h-80 object-cover mb-4 rounded-lg" />
          )}
          <div className="prose max-w-none">{parse(blog.content)}</div>
        </div>

        <div className="p-6 border-t">
          <div className="flex items-center space-x-4 mb-6">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-2 px-3 py-1 rounded-md ${userLiked ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
            >
              <FaThumbsUp className="w-4 h-4" />
              <span>{likes} Likes</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md">
              <FaComment className="w-4 h-4" />
              <span>{comments.length} Comments</span>
            </button>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Comments</h3>
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <textarea
                className="w-full p-3 border rounded-lg mb-2"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
              />
              <button 
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Post Comment
              </button>
            </form>

            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <FaUser className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="font-medium">{comment.user?.name || "Anonymous"}</div>
                    <div className="text-sm text-gray-500">
                      {comment.createdAt && new Date(comment.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
