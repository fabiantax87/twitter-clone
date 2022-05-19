import { useState } from "react";
import { db } from "../../firebase/firebase-config.js";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Register.scss";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [formValid, setFormValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const accountCollection = collection(db, "user");

  const submitAccount = async (e: any) => {
    e.preventDefault();

    if (username !== "" || email !== "" || password !== "" || confirmPass !== "") {
      if (password === confirmPass) {
        let date = Date.now();

        try {
          await addDoc(accountCollection, {
            dateCreated: date,
            accountDetails: {
              username: username,
              email: email,
              password: password,
            },
          });

          navigate("/");
        } catch (e) {
          console.log(e);
        }
      } else {
        setFormValid(false);
        setErrorMessage("Passwords do not match, try again.");
      }
    } else {
      setFormValid(false);
      setErrorMessage("Not all fields have been filled, try again.");
    }
  };

  const ErrorMessage: any = (msg: string) => {
    if (!formValid && errorMessage !== "") {
      return <p className="error-msg">{msg}</p>;
    } else {
      return;
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      {ErrorMessage(errorMessage)}
      <form className="register-form" onSubmit={(e: any) => submitAccount(e)}>
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
