import Post from "components/Post/Post";
import "./PostList.scss";

type postListProps = {
  posts: any;
  getPosts: any;
};

const PostList = ({ posts, getPosts }: postListProps) => {
  return (
    <div className="post-list">
      {posts.map((post: any) => {
        return <Post getPosts={getPosts} key={post.id} post={post} />;
      })}
    </div>
  );
};

export default PostList;
