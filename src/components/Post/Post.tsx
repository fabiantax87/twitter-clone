import { useEffect } from "react";
import "./Post.scss";

type PostProps = {
  post: any;
};

const Post = ({ post }: PostProps) => {
  useEffect(() => {
    console.log(post);
  }, []);

  return (
    <div className="post-container">
      <h2>{post.uid}</h2>
      <h3>{post.message}</h3>
    </div>
  );
};

export default Post;
