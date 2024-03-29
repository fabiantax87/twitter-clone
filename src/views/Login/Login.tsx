import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logInWithEmailAndPassword, auth, signInWithGoogle } from "../../firebase/firebase-config.js";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  const checkDetails = (e: any) => {
    e.preventDefault();
    logInWithEmailAndPassword(email, password);
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
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={(e: any) => checkDetails(e)}>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        <button onClick={(e) => signInWithGoogle()}>Sign in with Google</button>
      </form>
      <Link to={"/register"}>Register instead</Link>
    </div>
  );
};

export default Login;
