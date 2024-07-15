import { useEffect } from "react";
import "./App.css";
import { ChatSection, Sidebar } from "./components";
import { connectToSocket } from "./socket";

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
