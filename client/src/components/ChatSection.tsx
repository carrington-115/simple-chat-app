import { useEffect, useState } from "react";
import "./chats.css";

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
  const [socketStatus, setSocketStatus] = useState<boolean>(false);

  const handleSendMessage = () => {};

  return (
    <main>
      <section className="messages">
        <section className="top-message">
          <h1>{initialMessage.title}</h1>
          <p>{initialMessage.description}</p>
        </section>
      </section>

      <form className="input-entry-point" onSubmit={(e) => e.preventDefault()}>
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
