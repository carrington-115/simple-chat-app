import { useEffect } from "react";
import "./App.css";
import { ChatSection, Sidebar } from "./components";
import io from "socket.io-client";
function App() {
  const socket = io("http://localhost:5000");
  const connectSocket = () => {
    socket.on("connect", () => {
      console.log(socket);
    });
  };
  useEffect(() => {
    connectSocket();
  }, []);
  return (
    <div className="App">
      <Sidebar />
      <ChatSection />
    </div>
  );
}

export default App;
