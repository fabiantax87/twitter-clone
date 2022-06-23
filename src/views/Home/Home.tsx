import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import CreatePost from "components/CreatePost/CreatePost";
import Navigation from "components/Navigation/Navigation";
import PostList from "components/PostList/PostList";
import "./Home.scss";

const Home = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const postsCollectionRef = collection(db, "posts");
  const userCollectionRef = collection(db, "users");

  const getPosts = async () => {
    await getDocs(postsCollectionRef).then((docs: any) => {
      setPosts(docs.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const getUserInfo = async () => {
    try {
      setIsLoading(true);

      const q = query(userCollectionRef, where("uid", "==", auth.currentUser?.uid));
      await getDocs(q)
        .then((doc) => {
          setUserData(doc.docs[0].data());
        })
        .then(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPosts();
    getUserInfo();
  }, []);

  return (
    <div className="home-container">
      <Navigation />
      <div className="content">
        <CreatePost userData={userData} isLoading={isLoading} getPosts={getPosts} />
        <div className="post-list-home">
          <PostList getPosts={getPosts} posts={posts} />
        </div>
      </div>
      <div className="extra-section"></div>
    </div>
  );
};

export default Home;
