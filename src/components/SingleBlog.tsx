import React, { useState } from 'react';
import { 
  FaUser, 
  FaThumbsUp, 
  FaComment, 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
//   FaShare 
} from 'react-icons/fa';

const BlogPost = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>([]);
  const [likes, setLikes] = useState(0);

// interface Comment {
//     text: string;
//     date: string;
// }

const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim()) {
        setComments([...comments, comment]);
        setComment('');
    }
};

  return (
    <div className="w-[80%] mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-4">
            <a href="#" className="hover:underline">Blog</a>
            {' / '}
            <span>Current Post</span>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl font-bold mb-4">Your Blog Post Title</h1>
          
          {/* Author Info */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <FaUser className="w-6 h-6 text-gray-500" />
            </div>
            <div>
              <div className="font-medium">Author Name</div>
              <div className="text-sm text-gray-500">Published on February 7, 2025</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="prose max-w-none">
            <p className="text-gray-700">
              Your blog post content goes here. This can include paragraphs,
              images, and other formatted content.
              Your blog post content goes here. This can include paragraphs,
              images, and other formatted content.
              Your blog post content goes here. This can include paragraphs,
              images, and other formatted content.
              Your blog post content goes here. This can include paragraphs,
              images, and other formatted content.
              Your blog post content goes here. This can include paragraphs,
              images, and other formatted content.
              Your blog post content goes here. This can include paragraphs,
              images, and other formatted content.
              Your blog post content goes here. This can include paragraphs,
              images, and other formatted content.
              Your blog post content goes here. This can include paragraphs,
              images, and other formatted content.
              Your blog post content goes here. This can include paragraphs,
              images, and other formatted content.
              Your blog post content goes here. This can include paragraphs,
              images, and other formatted content.
            </p>
          </div>

       
        </div>

        {/* Footer Section */}
        <div className="p-6 border-t">
          {/* Engagement Section */}
          <div className="flex items-center space-x-4 mb-6">
            <button 
              onClick={() => setLikes(likes + 1)}
              className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              <FaThumbsUp className="w-4 h-4" />
              <span>{likes} Likes</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md">
              <FaComment className="w-4 h-4" />
              <span>{comments.length} Comments</span>
            </button>
            <div className="ml-auto flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <FaFacebook className="w-5 h-5 text-blue-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <FaTwitter className="w-5 h-5 text-blue-400" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <FaLinkedin className="w-5 h-5 text-blue-700" />
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Comments</h3>
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <textarea
                className="w-full p-3 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
              />
              <button 
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Post Comment
              </button>
            </form>
            
            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <FaUser className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="font-medium">User</div>
                    <div className="text-sm text-gray-500">Just now</div>
                  </div>
                  <p className="text-gray-700">{comment}</p>
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