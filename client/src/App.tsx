import { useEffect } from "react";
import "./App.css";
import { ChatSection, Sidebar } from "./components";
import { connectToSocket, socket } from "./socket";

function App() {
  useEffect(() => {
    connectToSocket();
  }, []);
  return (
    <div className="App">
      <Sidebar />
      <ChatSection />
    </div>
  );
}

export default App;
