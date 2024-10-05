import "./ChatPage.css";
import NewPrompt from "../../components/newPrompt/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";

const ChatPage = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(${import.meta.env.VITE_API_URL}/api/chats/${chatId}, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chats">
          {isPending
            ? "Loading..."
            : error
            ? "An error has occurred: "
            : data?.history?.map((message, i) => (
                <>
                {message.img &&(
                  <IKImage
                  urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                  path={message.img}
                  height="300"
                  width="400"
                  transformation={[{height: 300, width: 400}]}
                  loading="lazy"
                  lqip={{active:true, quality:20}}
                  />
                )}
                  <div
                    key={i}
                    className={
                      message.role === "user" ? "message user" : "message"
                    }
                  >
                    {/* Check if message.parts exists and has at least one item */}
                    {message.parts && message.parts.length > 0 ? (
                      <Markdown>{message.parts[0].text}</Markdown>
                    ) : (
                      <span>No content available</span>
                    )}
                  </div>
                </>
              ))}

          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;