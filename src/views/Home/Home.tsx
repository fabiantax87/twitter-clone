import { useSelector } from "react-redux";
import { selectAccount } from "../../store/account/accountSlice";
import { logout } from "../../firebase/firebase-config.js";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase-config.js";
import { useEffect } from "react";

const Home = () => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const Test: any = () => {
    const store = useSelector(selectAccount);
    if (store) {
      return <h1>It works!!!</h1>;
    } else {
      return;
    }
  };

  const logUserOut = () => {
    logout();
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div>
      <p>home</p>
      <button onClick={(e) => logUserOut()}>Logout</button>
      <Test />
    </div>
  );
};

export default Home;
