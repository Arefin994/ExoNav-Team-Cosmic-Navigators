import "./HomePage.css";
import { useState } from "react";
import AISection from "../../components/AISection/AISection";
import GameSection from "../../components/GameSection/GameSection";
import Footer from "../../components/Footer/Footer";
import ExoHome from "../../components/ExoHome/ExoHome";

const HomePage = () => {
  const [typingStatus, setTypingStatus] = useState("Mehedi");

  // const test = async () => {
  //   await fetch("http://localhost:3000/api/test", {
  //     credentials: "include",
  //   });
  // };

  return (
    <div className="homepage">
      <div className="">
        <ExoHome />{" "}
      </div>
      <div className="">
        <GameSection />
      </div>
      <div className="">
        <AISection
          typingStatus={typingStatus}
          setTypingStatus={setTypingStatus}
        />
      </div>
      

      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;