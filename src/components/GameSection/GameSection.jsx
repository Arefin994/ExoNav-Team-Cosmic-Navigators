import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./GameSection.css";

const GameSection = () => {
  return (
    <div className="gameSection">
      <div className="gameLeft">
        <video src={assets.game} autoPlay loop muted></video>
      </div>

      <div className="gameRight">
        <h1>ExoNav Mission</h1>
        <h2>Conquer the Unknown, One Mission at a Time</h2>
        <h3>
           Battle alien forces, uncover hidden
          secrets, and explore new worlds in this thrilling journey beyond the
          stars.
        </h3>
        <Link to="/gameMenu" className="btn">
          Lets Play
        </Link>
      </div>
    </div>
  );
};

export default GameSection;