import Navigation from "components/Navigation/Navigation";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase-config";
import { collection, getDocs, where, query } from "firebase/firestore";
import { useParams } from "react-router-dom";
import "./Profile.scss";
import PostList from "components/PostList/PostList";
import EditProfile from "components/EditProfile/EditProfile";

const Profile = () => {
  const [userData, setUserData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [dateCreated, setDateCreated] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [viewModal, setViewModal] = useState(false);

  const { id } = useParams();

  const userCollectionRef = collection(db, "users");
  const postsCollectionRef = collection(db, "posts");

  const getUserInfo = async () => {
    try {
      setIsLoading(true);

      const q = query(userCollectionRef, where("uid", "==", id));
      await getDocs(q)
        .then((doc) => {
          setUserData(doc.docs[0].data());
        })
        .then(() => {
          console.log(userData);
          const date = new Date(parseInt(userData.dateCreated));
          let parsedDate = date.toLocaleDateString("en-GB", { timeZone: "CET" });
          setDateCreated(parsedDate);
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const getPosts = async () => {
    try {
      setIsLoading(true);

      const q = query(postsCollectionRef, where("uid", "==", id));
      await getDocs(q).then((docs: any) => {
        setPosts(docs.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
        setIsLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const toggleEditModal = () => {
    let newModalState = !viewModal;
    setViewModal(newModalState);
  };

  useEffect(() => {
    getUserInfo();
    getPosts();
  }, []);

  return (
    <div className="profile-layout">
      {!isLoading && userData && viewModal ? <EditProfile getPosts={getPosts} getUserInfo={getUserInfo} userData={userData} toggleEditModal={toggleEditModal} /> : <></>}
      <Navigation />
      {isLoading && userData ? (
        <h2>Loading...</h2>
      ) : (
        <div className="profile-content">
          <div className="profile-data">
            <img src={userData.profileImage} alt="profile" />
            {userData.uid === auth.currentUser?.uid ? (
              <button className="edit-profile" onClick={(e) => toggleEditModal()}>
                Edit profile
              </button>
            ) : (
              <></>
            )}
            <h3>{userData.username}</h3>
            <p>Joined {dateCreated}</p>
            {userData.following && userData.followers ? (
              <div className="follower-data">
                <p>
                  <span>{userData.following.length}</span> Following
                </p>
                <p>
                  <span>{userData.followers.length}</span> Followers
                </p>
              </div>
            ) : (
              <h2>Loading...</h2>
            )}
          </div>
          <div className="post-list-profile">
            <PostList getPosts={getPosts} posts={posts} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
