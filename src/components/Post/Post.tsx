import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase-config";
import { collection, getDocs, where, query, deleteDoc, doc } from "firebase/firestore";
import "./Post.scss";
import { Link } from "react-router-dom";

type PostProps = {
  post: any;
  getPosts: any;
};

const Post = ({ post, getPosts }: PostProps) => {
  const [userData, setUserData] = useState<any>({});
  const [datePosted, setDatePosted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userCollectionRef = collection(db, "users");

  const getUserInfo = async () => {
    try {
      setIsLoading(true);
      const q = query(userCollectionRef, where("uid", "==", post.uid));
      await getDocs(q).then((doc) => {
        setUserData(doc.docs[0].data());
        const date = new Date(parseInt(post.datePosted));
        let parsedDate = date.toLocaleDateString("en-GB", { timeZone: "CET" });
        setDatePosted(parsedDate);
        setIsLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async () => {
    try {
      await deleteDoc(doc(db, "posts", post.id)).then(() => {
        getPosts();
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="post-container">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="post">
          <div className="post-data" key={post.id}>
            <img src={userData.profileImage} alt="profile" />
            <div className="right-section">
              <Link to={"/profile/" + userData.uid}>
                {userData.username} <span> {datePosted}</span>
              </Link>
              <p>{post.message}</p>
            </div>
          </div>
          {post.uid === auth.currentUser?.uid ? (
            <div className="delete-icon">
              <svg onClick={(e) => deletePost()} viewBox="0 0 24 24">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
