import { useEffect, useState } from "react";
import { registerWithEmailAndPassword, auth, signInWithGoogle, storage } from "../../firebase/firebase-config.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import "./Register.scss";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [profileImg, setProfileImg] = useState<any>(null);
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  // const handleImageChange = (e: any) => {
  //   if (e.target.files[0]) {
  //     console.log(e.target.files[0]);
  //     setProfileImg(e.target.files[0]);
  //   }
  // };

  const register = async (e: any) => {
    e.preventDefault();

    const imgRef = ref(storage, `images/${profileImg.name + v4()}`);
    await uploadBytes(imgRef, profileImg).then(() => {
      getDownloadURL(imgRef)
        .then((url) => {
          if (password === confirmPass) {
            registerWithEmailAndPassword(username, email, password, url);
          } else {
            alert("Passwords do not match, try again");
          }
        })
        .catch((err) => {
          console.error(err.message);
        })
        .catch((err) => {
          console.error(err.message, "Error getting the image URL");
        });
    });
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate("/");
    }
  }, [user, loading]);

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form className="register-form" onSubmit={(e: any) => register(e)}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
        <input type="file" onChange={(e: any) => setProfileImg(e.target.files[0])} />
        <button type="submit">Create</button>
        <button onClick={(e) => signInWithGoogle()}>Sign in with google</button>
      </form>
    </div>
  );
};

export default Register;
