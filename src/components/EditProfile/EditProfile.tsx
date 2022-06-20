import { db, storage } from "../../firebase/firebase-config";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { v4 } from "uuid";
import "./EditProfile.scss";

type editProfileProps = {
  toggleEditModal: any;
  userData: any;
  getUserInfo: any;
  getPosts: any;
};

const EditProfile = ({ toggleEditModal, userData, getUserInfo, getPosts }: editProfileProps) => {
  const [username, setUsername] = useState(userData.username);
  const [profileImg, setProfileImg] = useState(userData.profileImage);

  const userCollectionRef: any = collection(db, "users");

  const submitChanges = async (e: any) => {
    e.preventDefault();

    const imgRef = ref(storage, `images/${profileImg.name + v4()}`);
    await uploadBytes(imgRef, profileImg).then(() => {
      getDownloadURL(imgRef)
        .then((url) => {
          setProfileImg(url);
          const q = query(userCollectionRef, where("uid", "==", userData.uid));
          getDocs(q).then((docData: any) => {
            const docRef = doc(db, "users", docData.docs[0].id);
            updateDoc(docRef, { username: username, profileImage: url }).then(() => {
              getUserInfo().then(() => {
                getPosts();
                toggleEditModal();
              });
            });
          });
        })
        .catch((err) => {
          console.error(err.message);
        });
    });
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="modal-header">
          <svg onClick={(e) => toggleEditModal()} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          <h3>Edit profile</h3>
          <button className="save-btn" onClick={(e) => submitChanges(e)}>
            Save
          </button>
        </div>
        <div className="modal-content">
          <img src={userData.profileImage} alt="profile" />
          <input type="file" onChange={(e: any) => setProfileImg(e.target.files[0])} />
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
