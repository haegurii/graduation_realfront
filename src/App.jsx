import { useEffect } from "react";
import Router from "./Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connectWithSocketIOServer } from "./utils/wss";

import "./App.css";

function App() {
  useEffect(() => {
    connectWithSocketIOServer();
  }, []);

  return (
    <div>
      <Router />
      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      />
    </div>
  );
}

export default App;
