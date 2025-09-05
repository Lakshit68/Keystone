import React, { useEffect, useMemo, useState } from "react";
import { getApiBase } from "../utils/apiBase";
import { useNavigate } from "react-router-dom";

const resolveImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  const base = getApiBase();
  return `${base}${url}`;
};

const formatDate = (isoDateString) => {
  if (!isoDateString) return "";
  try {
    const d = new Date(isoDateString);
    return d.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return isoDateString;
  }
};

const useBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const base = getApiBase();
        const tryEndpoints = [
          `${base}/api/blogs?populate=*`
        ];
        let data = null;
        for (const url of tryEndpoints) {
          const res = await fetch(url);
          if (res.ok) {
            const json = await res.json();
            if (json?.data) {
              data = json.data;
              break;
            }
          }
        }
        if (!data) throw new Error("No blog endpoint responded");

        const mapped = data.map((node) => {
            console.log(node);
          
            // handle both single object and array of images
            let coverUrl = null;
            if (Array.isArray(node?.image)) {
              coverUrl = node.image[0]?.url; // take the first image
            } else {
              coverUrl = node?.image?.url;
            }
          
            return {
              id: node.id,
              documentId: node.documentId,
              title: node.title || "Untitled",
              summary: node.description || node.excerpt || "",
              date: node.date || node.publishedAt,
              image: resolveImageUrl(coverUrl),
            };
          });
        if (!ignore) setPosts(mapped);
      } catch (e) {
        if (!ignore) setError(e?.message || "Failed to load blog posts");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchPosts();
    return () => {
      ignore = true;
    };
  }, []);

  const grouped = useMemo(() => {
    const top = posts.slice(0, 3);
    const rest = posts.slice(3);
    return { top, rest };
  }, [posts]);

  return { loading, error, ...grouped };
};

const BlogCard = ({ post, onClick }) => {
  return (
    <div className="flex flex-col cursor-pointer" onClick={onClick} role="button" tabIndex={0}>
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-56 object-cover rounded-[20px]"
          loading="lazy"
        />
      )}
      <div className="mt-3">
        <h4 className="text-base md:text-lg line-clamp-1 font-semibold">{post.title}</h4>
       
        {post.summary && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{post.summary}</p>
        )}
         <p className="text-xs text- mt-4"> John Wills <span className="text-xl font-black  ">•</span> {formatDate(post.date)}</p>
      </div>
    </div>
  );
};

export const BlogPage = () => {
  const { top, rest, loading, error } = useBlogs();
  const navigate = useNavigate();

  return (
    <div className="bg-white text-black">
      <section className="pt-28 md:pt-3">
  <div
    className="w-full h-[600px] md:h-[575px] bg-cover bg-center relative"
    style={{ backgroundImage: "url('/blog-bg.jpg')" }}
  >
    {/* Overlay + centered text */}
    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
      <h1 className="text-5xl md:text-7xl font-bold text-black text-center drop-shadow-lg">
        Keystone Blog
      </h1>
    </div>
  </div>
</section>

      <section className="container mx-auto px-4 py-10">
        <h3 className="text-xl md:text-2xl font-semibold mb-6">Recent blog posts</h3>
        {loading && <p className="text-gray-600">Loading posts...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && (
          <>
            <div className="grid md:grid-cols-3 gap-8">
              {top.map((p) => (
                <BlogCard key={p.id} post={p} onClick={() => navigate(`/blog/${p.documentId}`)} />
              ))}
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              {rest.map((p) => (
                <BlogCard key={p.id} post={p} onClick={() => navigate(`/blog/${p.documentId}`)} />
              ))}
            </div>
          </>   
        )}
      </section>
    </div>
  );
};

export default BlogPage;


