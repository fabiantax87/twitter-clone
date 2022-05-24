import { useSelector } from "react-redux";
import { selectAccount } from "../../store/account/accountSlice";

const Home = () => {
  const Test: any = () => {
    const store = useSelector(selectAccount);
    if (store) {
      return <h1>It works!!!</h1>;
    } else {
      return;
    }
  };

  return (
    <div>
      <p>home</p>
      <Test />
    </div>
  );
};

export default Home;
