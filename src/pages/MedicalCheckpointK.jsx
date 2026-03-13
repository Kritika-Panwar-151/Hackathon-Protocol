import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function MedicalCheckpointK() {

  const [data, setData] = useState(null);
  const [scanned, setScanned] = useState(false);

  const handleScan = (result) => {

    if (result && !scanned) {

      try {

        const decoded = JSON.parse(result[0].rawValue);

        setData(decoded);
        setScanned(true);

      } catch {

        console.log("Invalid QR");

      }

    }

  };

  return (

    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">

      <h2 className="text-xl font-bold mb-4">
        Medical / Emergency Checkpoint
      </h2>

      {!scanned && (
        <Scanner onScan={handleScan} />
      )}

      {data && (

        <div className="mt-4 p-4 bg-red-100 rounded">

          <h3 className="font-semibold mb-2">
            ⚠ Medical Priority Traveler
          </h3>

          <p><b>Name:</b> {data.name}</p>
          <p><b>Nationality:</b> {data.nat}</p>
          <p><b>Health Status:</b> {data.health}</p>

          <button
            className="bg-red-600 text-white px-4 py-2 rounded mt-3"
          >
            Send to Medical Team
          </button>

          <button
            className="bg-gray-600 text-white px-4 py-2 rounded mt-3 ml-3"
            onClick={()=>{
              setData(null)
              setScanned(false)
            }}
          >
            Scan Next Traveler
          </button>

        </div>

      )}

    </div>

  );

}