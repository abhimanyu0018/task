import React, { useEffect, useState, useRef, useCallback } from "react";
import PostCard from "../components/PostCard";
import { useAuth } from "../contexts/AuthContext";

const PostPage = () => {
  const { token, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchPosts = async (page) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/posts?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      setHasMore(data.currentPage < data.totalPages);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const lastPostElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="flex justify-between items-center m-3">
        <h1 className="text-2xl font-bold">Posts</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded mr-3"
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-5 gap-4 p-4">
        {posts.map((post, index) => (
          <PostCard
            key={post._id}
            post={post}
            ref={index === posts.length - 1 ? lastPostElementRef : null}
          />
        ))}
      </div>
    </>
  );
};

export default PostPage;
