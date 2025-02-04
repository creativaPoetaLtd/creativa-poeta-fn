

const blogs = [
  {
    id: 1,
    title: "Let Me Help You Get More Google Traffic",
    image: "/book1.png",
  },
  {
    id: 2,
    title: "How Marketers Are Spending Their Money in 2025 (We Asked 11,093 Marketers)",
    image: "/book2.webp",
  },
  {
    id: 3,
    title: "Best SEO Companies of 2025",
    image: "/book3.jpg",
  },
  {
    id: 4,
    title: "The Future of Content Marketing: A 2025 Guide",
    image: "/book4.webp",
  },
  {
    id: 5,
    title: "Best WordPress Maintenance and Management Services",
    image: "/book5.webp",
  },
  {
    id: 6,
    title: "Best SEO Plugins for WordPress - 2025 Review",
    image: "/book6.jpg",
  },
  {
    id: 7,
    title: "Best Domain Brokers - 2025 Review",
    image: "/card1.webp",
  },
  {
    id: 8,
    title: "YouTube Algorithm: How to Beat It in 2025",
    image: "/card2.jpg",
  },
];

const BlogGrid = () => {
  return (
    <div className="w-[80%] px-4 mt-24 py-10 justify-center mx-auto items-center"
    >
        {/* Page title */}
        <h1 className="text-4xl font-bold text-center text-white mb-16">
          Latest Blogs
        </h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column */}
        <div className="md:w-1/2 space-y-8">
          {blogs.filter((_, idx) => idx % 2 === 0).map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 aspect-square"
            >
              <a href="#" className="flex flex-col h-full">
                <div className="w-full h-3/4">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
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
          {blogs.filter((_, idx) => idx % 2 === 1).map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 aspect-square"
            >
              <a href="#" className="flex flex-col h-full">
                <div className="w-full h-3/4">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
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