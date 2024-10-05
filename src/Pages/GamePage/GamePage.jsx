import { Link } from "react-router-dom";
import GameSection from "../../components/GameSection/GameSection";

const GamePage = () => {
  return (
    <div>
      <Link to="/gameMenu/game">
        <GameSection />
      </Link>
    </div>
  );
};

export default GamePage;