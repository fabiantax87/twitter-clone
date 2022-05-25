import { useEffect, useState } from "react";
import { registerWithEmailAndPassword, auth } from "../../firebase/firebase-config.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Register.scss";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  const register = (e: any) => {
    e.preventDefault();
    if (password === confirmPass) {
      registerWithEmailAndPassword(username, email, password);
    } else {
      alert("Passwords do not match, try again");
    }
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Register;
