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
    await getDocs(postsCollectionRef).then((docs: any) => {
      setPosts(docs.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="home-container">
      <Navigation />
      <div className="content">
        <CreatePost getPosts={getPosts} />
        <div className="post-list-home">
          <PostList getPosts={getPosts} posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default Home;
