import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./views/Home/Home";
import Layout from "./views/Layout/Layout";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Profile from "./views/Profile/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
