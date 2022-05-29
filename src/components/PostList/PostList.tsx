import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Post from "components/Post/Post";
import "./PostList.scss";

const PostList = () => {
  const [posts, setPosts] = useState<any[]>([]);

  const postsCollectionRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsCollectionRef);
    setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="post-list">
      {posts.map((post) => {
        return <Post post={post} />;
      })}
    </div>
  );
};

export default PostList;
