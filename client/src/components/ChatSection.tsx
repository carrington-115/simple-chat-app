import { useEffect, useRef, useState } from "react";
import "./chats.css";
import { socket } from "../socket";

interface messageType {
  title: string;
  description: string;
}

const ChatSection = () => {
  const [initialMessage, setInitialMessage] = useState<messageType>({
    title: "Chat Application",
    description:
      "A test chat application with reactjs on the frontend and nodejs, socket on the backend",
  });
  const [messageInput, setMessageInput] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [messageStatus, setMessageStatus] = useState<boolean>(false);
  const messagesRef = useRef<HTMLElement>(null);

  const getSocketMessages = () => {
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
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

    return () => {
      socket.off("message");
    };
  }, [messageStatus, messages]);

  return (
    <main>
      <section className="messages">
        {messageStatus ? (
          <section className="message-inner-container" ref={messagesRef}>
            {messages.map((props, index) => (
              <div className="message-container" key={index}>
                {props}
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
