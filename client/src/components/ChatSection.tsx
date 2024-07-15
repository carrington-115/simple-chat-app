import { useState } from "react";
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
  return (
    <main>
      <section className="messages">
        <section className="top-message">
          <h1>{initialMessage.title}</h1>
          <p>{initialMessage.description}</p>
        </section>
      </section>

      <form
        className="input-entry-point"
        onSubmit={(e) => e.preventDefault()}
        action=""
      >
        <input type="text" placeholder="Enter your message" />
        <button type="submit" className="send-message-btn">
          <span className="material-symbols-outlined">send</span>
        </button>
      </form>
    </main>
  );
};

export default ChatSection;
