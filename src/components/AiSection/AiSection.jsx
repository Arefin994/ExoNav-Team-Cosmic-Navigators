// AISection.js
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { assets } from "../../assets/assets";
import PropTypes from "prop-types";

import "./AISection.css";

const AISection = ({ typingStatus, setTypingStatus }) => {
  return (
    <div className="aiSection">
      <div className="left">
        <h1>ExoNav AI</h1>
        <h2>Supercharge your Creativity and Productivity</h2>
        <h3>
          Explore the future of AI-driven space exploration and productivity.
        </h3>
        <Link to="/dashboard" className="btn">
          Explore AI
        </Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <img src={assets.bot} alt="" className="bot" />
          <div className="chat">
            <div className="chatImg">
              <img
                src={
                  typingStatus === "Mehedi"
                    ? assets.human1
                    : typingStatus === "Elma"
                    ? assets.human2
                    : assets.bot
                }
                alt=""
              />
            </div>

            <div className="autotype">
              <TypeAnimation
                sequence={[
                  "Mehedi: What is ExoNav AI",
                  2000,
                  () => {
                    setTypingStatus("AI");
                  },
                  "AI: Exoplanet Exploration using AI",
                  2000,
                  () => {
                    setTypingStatus("Elma");
                  },
                  "Elma: How ExoNav AI Works",
                  2000,
                  () => {
                    setTypingStatus("AI");
                  },
                  "AI: Based on scientists' Research",
                  2000,
                  () => {
                    setTypingStatus("Mehedi");
                  },
                ]}
                wrapper="span"
                speed={50}
                cursor={true}
                omitDeletionAnimation={true}
                style={{ fontSize: "16px", color: "white" }}
                repeat={Infinity}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes validation
AISection.propTypes = {
  typingStatus: PropTypes.string.isRequired, // Validate typingStatus as a string
  setTypingStatus: PropTypes.func.isRequired, // Validate setTypingStatus as a function
};

export default AISection;