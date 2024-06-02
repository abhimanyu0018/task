import React, { forwardRef } from "react";

const PostCard = forwardRef(({ post }, ref) => (
  <div ref={ref} className="p-4 border rounded shadow">
    <img
      src={post.imageUrl}
      alt={post.title}
      className="w-full h-32 object-cover"
    />
    <h2 className="text-xl font-bold mt-2">{post.title}</h2>
    <p className="text-gray-700">{post.body}</p>
    <p className="text-gray-500 mt-2">Author: {post.author}</p>
  </div>
));

export default PostCard;
