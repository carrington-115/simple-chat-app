import { useEffect, useRef, useState } from "react";
import "./chats.css";
import { socket } from "../socket";

interface messageType {
  title?: string;
  description?: string;
  id?: string;
  message?: string;
  author?: boolean;
}

const ChatSection = () => {
  const [initialMessage, setInitialMessage] = useState<messageType>({
    title: "Chat Application",
    description:
      "A test chat application with reactjs on the frontend and nodejs, socket on the backend",
  });
  const [activityContent, setActivityContent] =
    useState<string>("Chat Application");
  const [messageInput, setMessageInput] = useState<string>("");
  const [messages, setMessages] = useState<messageType[]>([]);
  const [messageStatus, setMessageStatus] = useState<boolean>(false);
  const messagesRef = useRef<HTMLElement>(null);
  const socketId: string | undefined = socket.id?.substring(0, 5);

  const getSocketMessages = () => {
    socket.on("message", (data) => {
      data.forEach(({ id, message }: { id: string; message: string }) => {
        if (id === socketId) {
          setMessages((prev) => [
            ...prev,
            { id: id, message: message, author: true },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            { id: id, message: message, author: false },
          ]);
        }
      });
    });
  };

  const handleSendMessage = () => {
    if (messageInput !== "") {
      socket.emit("message", messageInput);
      setMessageInput("");
    }
  };

  const handleOnSubmitMessage = (e: any) => {
    e.preventDefault();
    handleSendMessage();
  };

  useEffect(() => {
    if (messages.length > 0) {
      setMessageStatus(true);
    }
    if (messagesRef.current) {
      messagesRef.current.scrollBy(0, messagesRef.current.scrollHeight);
    }
    getSocketMessages();

    socket.on("user", (data) => {
      setActivityContent(data);
    });

    return () => {
      socket.off("message");
    };
  }, [messageStatus, messages]);

  return (
    <main>
      <section className="activity-section">{activityContent}</section>
      <section className="messages">
        {messageStatus ? (
          <section className="message-inner-container" ref={messagesRef}>
            {messages.map(({ id, message, author }, index) => (
              <div
                style={{
                  alignSelf: `${author ? "flex-end" : "flex-start"}`,
                  color: `${author ? "white" : "white"}`,
                  backgroundColor: `${
                    author
                      ? "rgba(255, 255, 255, 0.25)"
                      : "rgba(255, 255, 255, 0.1)"
                  }`,
                }}
                className="message-container"
                key={index}
              >
                <p>{message}</p>
                <span>From: {id}</span>
              </div>
            ))}
          </section>
        ) : (
          <section className="top-message">
            <h1>{initialMessage.title}</h1>
            <p>{initialMessage.description}</p>
          </section>
        )}
      </section>

      <form className="input-entry-point" onSubmit={handleOnSubmitMessage}>
        <input
          type="text"
          placeholder="Enter your message"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button
          type="submit"
          className="send-message-btn"
          onClick={handleSendMessage}
        >
          <span className="material-symbols-outlined">send</span>
        </button>
      </form>
    </main>
  );
};

export default ChatSection;
