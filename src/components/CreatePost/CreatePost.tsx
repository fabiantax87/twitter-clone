import { useState } from "react";
import { db, auth } from "../../firebase/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import "./CreatePost.scss";

type createPostProps = {
  getPosts: any;
  isLoading: any;
  userData: any;
};

const CreatePost = ({ getPosts, isLoading, userData }: createPostProps) => {
  const [message, setMessage] = useState("");

  const postsCollection = collection(db, "posts");

  const submitPost = async (e: any) => {
    e.preventDefault();

    const date = Date.now();

    if (message !== "") {
      await addDoc(postsCollection, {
        datePosted: date,
        likes: 0,
        message: message,
        uid: auth.currentUser?.uid,
      }).then(() => {
        getPosts();
      });
    }

    setMessage("");
  };

  return (
    <div className="create-post-container">
      <div className="create-post">
        <h3>Home</h3>
        <div className="middle-section">
          <img src={userData.profileImage} alt="user" />
          <form className="create-form" onSubmit={(e: any) => submitPost(e)}>
            <input type="text" placeholder="What's happening?" value={message} onChange={(e) => setMessage(e.target.value)} />
          </form>
        </div>
        <div className="tweet-btn">
          <button className="btn-def" type="submit" onClick={(e: any) => submitPost(e)}>
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
