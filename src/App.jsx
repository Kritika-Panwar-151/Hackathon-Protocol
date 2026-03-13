import LoginK from "./pages/LoginK";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Submit from "./pages/Submit";
import Results from "./pages/Results";
import FaceScannerK from "./pages/FaceScannerK";
import CategorizationK from "./pages/CategorizationK";
import QRGeneratorK from "./pages/QRGeneratorK";
import MedicalCheckpointK from "./pages/MedicalCheckpointK";
import NormalCheckpointK from "./pages/NormalCheckpointK";
import AsylumCheckpointK from "./pages/AsylumCheckpointK";
import PassportVerificationK from "./pages/PassportVerificationK";
function App() {
  return (
    <>
      <Navbar />

      <div className="p-6">
        <Routes>
          <Route path="/passport-verification" element={<PassportVerificationK />} />
          <Route path="/normal-scanner" element={<NormalCheckpointK />} />
          <Route path="/medical-scanner" element={<MedicalCheckpointK />} />
          <Route path="/asylum-scanner" element={<AsylumCheckpointK />} />
          <Route path="/qr-generator" element={<QRGeneratorK />} />
          <Route path="/face-scan" element={<FaceScannerK />} />
          <Route path="/categorization" element={<CategorizationK />} />
          <Route path="/" element={<LoginK />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </>
  );
}

export default App;