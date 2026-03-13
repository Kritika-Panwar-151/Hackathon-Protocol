import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function QRGeneratorK() {

  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");
  const [category, setCategory] = useState("");
  const [lane, setLane] = useState("");
  const [qrData, setQrData] = useState(null);

  const generateQR = async () => {

    const borderID = "BORDER-" + Math.floor(Math.random() * 100000);

    const travelerData = {
      borderID,
      name,
      nationality,
      category,
      lane,
      security: "clear"
    };

    // Save in Firestore (online database)
    await addDoc(collection(db, "travelers"), travelerData);

    // Store data inside QR (offline verification)
    const qrPayload = JSON.stringify(travelerData);

    setQrData(qrPayload);

  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">

      <h2 className="text-xl font-bold mb-4">
        Generate Border QR
      </h2>

      <div className="flex flex-col gap-3">

        <input
          type="text"
          placeholder="Traveler Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Nationality"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Category (tourist/refugee/etc)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Assigned Lane"
          value={lane}
          onChange={(e) => setLane(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={generateQR}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
        >
          Generate QR
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

    </div>
  );
}