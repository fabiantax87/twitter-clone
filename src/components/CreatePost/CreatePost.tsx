import { useState } from "react";
import { db, auth } from "../../firebase/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import "./CreatePost.scss";

const CreatePost = () => {
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
      });
    }

    setMessage("");
  };

  return (
    <div className="create-post">
      <form className="create-form" onSubmit={(e: any) => submitPost(e)}>
        <input type="text" placeholder="What's on your mind?" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className="btn-def" type="submit">
          Tweet
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
