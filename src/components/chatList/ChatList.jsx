import { Link } from "react-router-dom";
import "./chatList.css";
import { assets } from "../../assets/assets";
import { useQuery } from "@tanstack/react-query";

const ChatList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(${import.meta.env.VITE_API_URL}/api/userchats, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="chatList">
      <span className="title">Dashboard</span>
      <Link style={{ textDecoration: "none" }} to="/dashboard">
        Create a new chat
      </Link>
      <Link style={{ textDecoration: "none" }} to="/dashboard">
        Explore ExoNav AI
      </Link>
      <Link style={{ textDecoration: "none" }} to="/dashboard">
        Contact
      </Link>
      <hr />
      <span className="title">Recent Chats</span>

      <div className="list">
        {data?.map((chat) => (
          <Link key={chat._id} style={{ textDecoration: "none" }} to={`/dashboard/chats/${chat._id}`}>
            {chat.title}
          </Link>
        ))}
      </div>
      <hr />
      <div className="upgrade">
        <img src={assets.AI_icon} alt="" />
        <div className="texts">
          <h6>Upgrade to ExoNav AI Pro</h6>
          <h6>Get unlimited access to all features</h6>
        </div>
      </div>
    </div>
  );
};

export default ChatList;