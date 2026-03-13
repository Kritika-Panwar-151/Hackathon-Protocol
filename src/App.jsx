import LoginK from "./pages/LoginK";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Submit from "./pages/Submit";
import Results from "./pages/Results";
import FaceScannerK from "./pages/FaceScannerK";
import TravellerList from "./pages/TravellerList";
function App() {
  return (
    <>
      <Navbar />

      <div className="p-6">
        <Routes>
          <Route path="/face-scan" element={<FaceScannerK />} />
          <Route path="/" element={<LoginK />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/results" element={<Results />} />
          <Route path="/travellers" element={<TravellerList />} />
        </Routes>
      </div>
    </>
  );
}

export default App;