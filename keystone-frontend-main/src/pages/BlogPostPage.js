import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getApiBase } from "../utils/apiBase";

const resolveImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("https")) return url;
  const base = getApiBase();
  return `${base}${url}`;
};

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

  useEffect(() => {
    if (!id) return;
    let ignore = false;
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const base = getApiBase();
        const res = await fetch(`${base}/api/blogs/${id}?populate=*`);
        if (!res.ok) throw new Error(`Failed to fetch post ${id}`);
        const json = await res.json();
        console.log(json)
        
        const a = json || {};

        let cover = `https://keystone-backend-1.onrender.com/api/images/blog/${a._id}`;
        let gallery = [];
        // if (Array.isArray(a?.image) && a.image.length > 0) {
        //   cover = resolveImageUrl(a.image[0]?.url || a.image[0]?.formats?.large?.url);
        //   gallery = a.image
        //     .slice(1)
        //     .map((img) => resolveImageUrl(img?.url || img?.formats?.large?.url))
        //     .filter(Boolean);
        // } else {
        //   cover = resolveImageUrl(a?.image?.url || a?.cover?.data?.attributes?.url);
        //   gallery = (a?.gallery || a?.images || a?.media || [])
        //     .map((img) => resolveImageUrl(img?.url || img?.attributes?.url))
        //     .filter(Boolean);
        // }

        const content = a?.content  || a?.description || "";

        const mapped = {
          id: a._id,
          title: a?.title || "Untitled",
          date: a?.date || a?.publishedAt,
          cover,
          content,
          gallery
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
        <p key={idx} className="text-base leading-7 text-gray-900">
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
              {formatDate(post.date)}
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
      <section className="container mx-auto px-4 mt-8">
        <div className="sm:px-10 w-full">
          {loading && <p className="text-gray-600">Loading post...</p>}
          {error && <p className="text-red-700 font-semibold">{error}</p>}
          {!loading && !error && post && (
            <>
              {/* Cover Image */}
              {post?.cover && (
                <div className="w-full mb-10">
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="w-full h-[600px] rounded-3xl object-cover"
                    style={{ maxHeight: "700px" }}
                  />
                </div>
              )}

              {/* Content */}
              {post.content && (
                <div className="my-7 bg-white border border-gray-200 px-6 py-6 rounded-lg shadow">
                  <Paragraphs text={post.content} />
                </div>
              )}

              {/* Gallery Images */}
              {post.gallery && post.gallery.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-6">
                  {post.gallery.slice(0, 2).map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`gallery-${idx}`}
                      className="w-full h-[300px] rounded-lg shadow object-cover"
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-yellow-300 mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <span className="font-medium text-xs md:text-sm">
              Keystone — Global Value. Proven Innovation. Delivering Impact.
            </span>
            <nav className="flex space-x-4 text-xs md:text-sm text-yellow-200">
              <a href="#" className="hover:text-white">
                About Us
              </a>
              <a href="#" className="hover:text-white">
                Contact
              </a>
              <a href="#" className="hover:text-white">
                Blog
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPostPage;