import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs, where, query } from "@firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAV_mEeLZX4q6Fvh_mNespx7oJEjc8LKmY",
  authDomain: "twitter-clone-c1e7a.firebaseapp.com",
  projectId: "twitter-clone-c1e7a",
  storageBucket: "twitter-clone-c1e7a.appspot.com",
  messagingSenderId: "461504717226",
  appId: "1:461504717226:web:ba684d48793534d675cbd3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        username: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password, imgUrl) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const date = Date.now();
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      username: name,
      authProvider: "local",
      email,
      dateCreated: date,
      profileImage: imgUrl,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, logInWithEmailAndPassword, registerWithEmailAndPassword, logout, signInWithGoogle, storage };
