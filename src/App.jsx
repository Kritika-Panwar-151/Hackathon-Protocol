import LoginK from "./pages/LoginK";
import PassportVerificationK from "./pages/PassportVerificationK";
import { Routes, Route } from "react-router-dom";


import Dashboard from "./pages/Dashboard";
import Submit from "./pages/Submit";
import Results from "./pages/Results";
import FaceScannerK from "./pages/FaceScannerK";
import CategorizationK from "./pages/CategorizationK";
import NormalCheckpointK from "./pages/NormalCheckpointK";
import MedicalCheckpointK from "./pages/MedicalCheckpointK";
import AsylumCheckpointK from "./pages/AsylumCheckpointK";
import QRGeneratorK from "./pages/QRGeneratorK";
import SecurityAlertK from "./pages/SecurityAlertK";
function App() {
  return (
    <>
      

      <div className="p-6">
        <Routes>

          <Route path="/" element={<LoginK />} />
          
<Route path="/security-alert" element={<SecurityAlertK />} />
          <Route path="/passport-verification" element={<PassportVerificationK />} />
          <Route path="/normal-scanner" element={<NormalCheckpointK />} />
          <Route path="/medical-scanner" element={<MedicalCheckpointK />} />
          <Route path="/asylum-scanner" element={<AsylumCheckpointK />} />
          <Route path="/qr-generator" element={<QRGeneratorK />} />
          <Route path="/face-scan" element={<FaceScannerK />} />
          <Route path="/categorization" element={<CategorizationK />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/results" element={<Results />} />

        </Routes>
      </div>
    </>
  );
}

export default App;