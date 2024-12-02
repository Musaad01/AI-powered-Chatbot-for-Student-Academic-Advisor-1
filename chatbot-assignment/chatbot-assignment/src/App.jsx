import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import Chat from "./pages/Chat";
import DeviceSelector from "./components/DeviceSelector";
import "./styles/App.css";

function App() {
  const [device, setDevice] = useState("laptop");

  const handleDeviceChange = (newDevice) => {
    setDevice(newDevice);
    console.log("Device changed to:", newDevice);
  };

  return (
    <Router>
      <div className="App">
        <DeviceSelector
          activeDevice={device}
          onDeviceChange={handleDeviceChange}
        />
        <div className={`view-container ${device}`}>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
