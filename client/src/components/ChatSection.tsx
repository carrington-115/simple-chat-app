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
      console.log(data);
      console.log(messages);
      setMessages(data);
    });
  };

  const handleSendMessage = () => {
    if (messageInput !== "") {
      socket.emit("message", messageInput);
      setMessageInput("");
      getSocketMessages();
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      setMessageStatus(true);
    }
    if (messagesRef.current) {
      messagesRef.current.scrollBy(0, messagesRef.current.scrollHeight);
    }
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

      <form className="input-entry-point" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Enter your message"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button
          type="button"
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
