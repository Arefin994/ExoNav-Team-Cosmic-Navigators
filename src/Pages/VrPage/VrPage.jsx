import { Link } from "react-router-dom";
import "./VrPage.css";
import { assets } from "../../assets/assets";

const VrPage = () => {
  return (
    <div className="vrpage">
      <div className="planets">
        <div className="planet">
          <div className="planetImg">
            <img src={assets.vrImg} alt="" />
          </div>
          <div className="planetbtn">
            <Link
              style={{ textDecoration: "none" }}
              className="explore-button"
              to="/vr/planet-1"
            >
              VR View
            </Link>
          </div>
        </div>
        <div className="planet">
          <div className="">
            <div className="planetImg">
              <img src={assets.vr1} alt="" />
            </div>
          </div>
          <div className="planetbtn">
            <Link
              style={{ textDecoration: "none" }}
              className="explore-button"
              to="/vr/planet-2"
            >
              VR View
            </Link>
          </div>
        </div>
        <div className="planet">
          <div className=""></div>
          <div className="planetbtn">
            <Link
              style={{ textDecoration: "none" }}
              className="explore-button"
              to="/vr/planet-3"
            >
              VR View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VrPage;