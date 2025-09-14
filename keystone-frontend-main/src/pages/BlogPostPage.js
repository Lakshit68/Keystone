import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getApiBase } from "../utils/apiBase";

const formatDate = (iso) => {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
};

const useBlogPost = (id) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const serverUrl=process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (!id) return;
    let ignore = false;

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${serverUrl}/api/blogs/${id}`);
        if (!res.ok) throw new Error(`Failed to fetch post ${id}`);
        const a = await res.json();

        const mapped = {
          id: a._id,
          title: a.title || "Untitled",
          date: a.publishedAt || a.createdAt,
          cover: `${serverUrl}/api/images/blog/${a._id}`,
          content: a.content || a.description || "",
          gallery: [] // extend later if you add gallery images
        };

        if (!ignore) setPost(mapped);
      } catch (e) {
        if (!ignore) setError(e?.message || "Failed to load post");
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchPost();
    return () => {
      ignore = true;
    };
  }, [id]);

  return { post, loading, error };
};

const Paragraphs = ({ text }) => {
  const parts = useMemo(
    () => (typeof text === "string" ? text.split(/\n\n+/) : []),
    [text]
  );
  return (
    <div className="space-y-4 mt-2">
      {parts.map((p, idx) => (
        <p
          key={idx}
          className="text-base leading-7 text-gray-900 hover:underline cursor-pointer transition-colors duration-200"
        >
          {p}
        </p>
      ))}
    </div>
  );
};

export const BlogPostPage = () => {
  const { id } = useParams();
  const { post, loading, error } = useBlogPost(id);

  return (
    <div className="bg-[#f7f8fa] min-h-screen text-black">
      {/* Header */}
      <section className="pt-28 md:pt-32 container mx-auto px-4">
        <div className="flex items-center justify-between mb-2">
          <Link
            to="/blog"
            className="text-xs md:text-sm text-gray-500 hover:text-black"
          >
            ← Back to Blog
          </Link>
          {post?.date && (
            <span className="text-xs md:text-sm text-gray-500">
              1 August 2025
            </span>
          )}
        </div>
        <h1
          className="font-bold text-center"
          style={{
            fontSize: "2.75rem",
            color: "#111111",
            margin: "0.7em 0 0.5em 0",
            lineHeight: "1.15",
            letterSpacing: "-0.01em",
            fontFamily: "Inter, Helvetica, Arial, sans-serif",
          }}
        >
          {post?.title || (loading ? "Loading..." : "Post")}
        </h1>
        <hr className="border-gray-200 mt-3 mb-2" />
      </section>

      {/* Main Content */}
      <section className="container mx-auto lg:w-4/6 px-4 mt-8">
        <div className="sm:px-10 w-full">
          {loading && <p className="text-gray-600">Loading post...</p>}
          {error && <p className="text-red-700 font-semibold">{error}</p>}
          {!loading && !error && post && (
            <>
             {/* Cover Image */}
             {post?.cover && (
                <div className="w-full mb-8 md:mb-10">
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="w-full h-64 md:h-96 lg:h-[400px] object-cover rounded-2xl md:rounded-3xl"
                  />
                </div>
              )}


              {/* Content */}
              {post.content && (
                <div className="my-7 bg-white border-l-4 border-yellow-400 px-6 py-6 rounded-r-lg shadow hover:shadow-md transition-shadow duration-300">
                  <Paragraphs text={post.content} />
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-yellow-300 mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0" />
        </div>
      </footer>
    </div>
  );
};

export default BlogPostPage;