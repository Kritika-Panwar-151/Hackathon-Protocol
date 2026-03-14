import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
export default function QRGeneratorK() {

 const location = useLocation();
const traveler = location.state || {};
const navigate = useNavigate();
  const [qrData, setQrData] = useState(null);
  const [instruction, setInstruction] = useState("");

  const generateQR = async () => {

  let borderID = "";
  let message = "";

  // NO PASSPORT CASE
  if (traveler.noPassport) {

    borderID = "TEMP-" + Math.floor(Math.random() * 100000);

    message = "Proceed to Humanitarian Lane for document verification";

  }

  // MEDICAL CASE
  else if (traveler.health === "medical") {

    borderID = "MED-" + Math.floor(Math.random() * 100000);

    message = "Please wait here. Medical personnel will assist you.";

  }

  // NORMAL CASE
  else {

    borderID = "BORDER-" + Math.floor(Math.random() * 100000);

    message = "Proceed to assigned lane.";

  }

  const travelerData = {
    borderID,
    name: traveler.name,
    nationality: traveler.nationality,
    passport: traveler.passportNumber || "none",
    category: traveler.category,
    lane: traveler.lane,
    priority: traveler.priority,
    health: traveler.health
  };

  await addDoc(collection(db, "travelers"), travelerData);

  const qrPayload = JSON.stringify(travelerData);
  setInstruction(message);
  setQrData(qrPayload);
};
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">

      <h2 className="text-xl font-bold mb-4">
        Generate Border QR
      </h2>

      <div className="flex flex-col gap-3">

        <div className="p-4 bg-gray-100 rounded mb-4">

  <p><strong>Name:</strong> {traveler.name}</p>
  <p><strong>Nationality:</strong> {traveler.nationality}</p>
  <p><strong>Category:</strong> {traveler.category}</p>
  <p><strong>Assigned Lane:</strong> {traveler.lane}</p>

</div>

        <button
  onClick={generateQR}
  className="bg-blue-600 text-white px-4 py-2 rounded"
>
  Generate QR Pass
</button>

      </div>

      {qrData && (
        <div className="mt-6 flex flex-col items-center">

          <QRCodeCanvas value={qrData} size={220} />

          <p className="mt-3 text-sm text-gray-600">
            QR contains offline traveler data
          </p>

        </div>
      )}
      {instruction && (
  <p className="mt-4 font-semibold text-green-700">
    {instruction}
  </p>
)}
{qrData && (
  <button
    onClick={() => navigate("/passport-verification")}
    className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
    Process Next Traveler
  </button>
)}

    </div>
  );
}