import { assets } from "../../assets/assets";
import "./ExoHome.css";

const ExoHome = () => {
  return (
    <div className="exoSection">
      <div className="exoLeft">
        <h1>ExoNav</h1>
        <h2>A Journey Through the Habitable Zones</h2>
        <h3>
        ExoNav, an immersive web to explore the galaxy and 
        discover habitable exoplanets including AR / VR, and gaming experiences.
        </h3>
      </div>

      <div className="exoRight">
        <img src={assets.exohome}></img>
      </div>
    </div>
  );
};

export default ExoHome;