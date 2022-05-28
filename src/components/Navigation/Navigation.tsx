import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, logout } from "../../firebase/firebase-config.js";
import "./Navigation.scss";

const Navigation = () => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="nav-container">
      <ul className="links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <button onClick={(e) => logout()}>Logout</button>
        </li>
        <li></li>
      </ul>
    </div>
  );
};

export default Navigation;
