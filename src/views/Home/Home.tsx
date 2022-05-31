import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import CreatePost from "components/CreatePost/CreatePost";
import Navigation from "components/Navigation/Navigation";
import PostList from "components/PostList/PostList";
import "./Home.scss";

const Home = () => {
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
    <div className="home-container">
      <Navigation />
      <div className="content">
        <CreatePost getPosts={getPosts} />
        <PostList posts={posts} />
      </div>
    </div>
  );
};

export default Home;
