import CreatePost from "components/CreatePost/CreatePost";
import Navigation from "components/Navigation/Navigation";
import PostList from "components/PostList/PostList";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home-container">
      <Navigation />
      <div className="content">
        <CreatePost />
        <PostList />
      </div>
    </div>
  );
};

export default Home;
