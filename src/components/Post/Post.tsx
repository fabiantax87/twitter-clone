import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";
import { collection, getDocs, where, query } from "firebase/firestore";
import "./Post.scss";

type PostProps = {
  post: any;
};

const Post = ({ post }: PostProps) => {
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

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="post-container">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="post-data">
          <img src={userData.profileImage} />
          <div className="right-section">
            <h3>
              {userData.username} <span> {datePosted}</span>
            </h3>
            <p>{post.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
