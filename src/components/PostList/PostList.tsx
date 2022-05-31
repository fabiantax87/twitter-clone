import Post from "components/Post/Post";
import "./PostList.scss";

type postListProps = {
  posts: any;
};

const PostList = ({ posts }: postListProps) => {
  return (
    <div className="post-list">
      {posts.map((post: any) => {
        return <Post post={post} />;
      })}
    </div>
  );
};

export default PostList;
