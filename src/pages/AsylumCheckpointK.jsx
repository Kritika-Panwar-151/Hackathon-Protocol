import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AsylumCheckpointK() {

  const [data, setData] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [reason, setReason] = useState("");
  const [familyMembers, setFamilyMembers] = useState(0);
  const [vulnerability, setVulnerability] = useState("");
  const [needs, setNeeds] = useState("");
  const [notes, setNotes] = useState("");

  const [priority, setPriority] = useState("");
  const [agency, setAgency] = useState("");

  // QR SCAN HANDLER
  const handleScan = (result) => {

  console.log("Scan result:", result);

  if (!result) return;

  try {

    const raw = result[0]?.rawValue || result.rawValue;

    const decoded = JSON.parse(raw);

    setData(decoded);
    setScanned(true);

  } catch {

    console.log("Invalid QR format");

  }

};

  // PRIORITY CALCULATION
  const calculatePriority = () => {

    let level = "NORMAL";

    if (needs === "medical") level = "HIGH";
    if (vulnerability === "minor" || vulnerability === "pregnant") level = "HIGH";
    if (familyMembers > 4) level = "MEDIUM";

    setPriority(level);

    return level;

  };

  // STORE CASE
  const registerCase = async () => {

    const level = calculatePriority();

    const asylumCase = {

      borderID: data.borderID,
      name: data.name,
      nationality: data.nationality,
      passport: data.passport,

      category: data.category,
      lane: data.lane,
      laneNumber: data.laneNumber,
      priority: data.priority,

      asylumReason: reason,
      familyMembers: familyMembers,
      vulnerability: vulnerability,
      needs: needs,
      notes: notes,
      agency: agency,

      checkpointPriority: level,

      timestamp: new Date().toISOString().split("T")[0]

    };

    try {

      await addDoc(collection(db, "asylumCases"), asylumCase);

      alert("Asylum case registered successfully");

      console.log("Stored:", asylumCase);

    } catch (error) {

      console.error("Error storing asylum case:", error);

    }

  };

  return (

    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">

      <h2 className="text-xl font-bold mb-4">
        Asylum / Humanitarian Checkpoint
      </h2>

      {/* QR SCANNER */}

      {/* QR SCANNER */}

{/* QR SCANNER */}

{!scanned && (
  <div className="w-full max-w-md mx-auto">

    <Scanner
      onScan={handleScan}
      onError={(error) => console.log("Scanner Error:", error)}
      constraints={{
        video: {
          facingMode: "environment"
        }
      }}
      styles={{
        container: {
          width: "100%"
        },
        video: {
          width: "100%"
        }
      }}
    />

  </div>
)}

      {/* TRAVELER DATA */}

      {data && (

        <div className="mt-6">

          <div className="p-4 bg-gray-100 rounded mb-4">

            <h3 className="font-semibold mb-2">Traveler Details</h3>

            <p><b>Border ID:</b> {data.borderID}</p>
            <p><b>Name:</b> {data.name}</p>
            <p><b>Nationality:</b> {data.nationality}</p>
            <p><b>Passport:</b> {data.passport}</p>
            <p><b>Category:</b> {data.category}</p>
            <p><b>Lane:</b> {data.lane}</p>
            <p><b>Lane Number:</b> {data.laneNumber}</p>
            <p><b>Priority:</b> {data.priority}</p>

          </div>

          <div className="flex flex-col gap-3">

            <label>Reason for Asylum</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="border p-2 rounded"
            />

            <label>Family Members</label>
            <input
              type="number"
              value={familyMembers}
              onChange={(e) => setFamilyMembers(Number(e.target.value))}
              className="border p-2 rounded"
            />

            <label>Vulnerability Status</label>
            <select
              value={vulnerability}
              onChange={(e) => setVulnerability(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Select</option>
              <option value="none">None</option>
              <option value="minor">Minor</option>
              <option value="pregnant">Pregnant</option>
              <option value="elderly">Elderly</option>
              <option value="disabled">Disabled</option>
            </select>

            <label>Immediate Needs</label>
            <select
              value={needs}
              onChange={(e) => setNeeds(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Select</option>
              <option value="none">None</option>
              <option value="medical">Medical Assistance</option>
              <option value="food">Food</option>
              <option value="shelter">Shelter</option>
              <option value="legal">Legal Assistance</option>
            </select>

            <label>Officer Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="border p-2 rounded"
            />

            <label>Assign Agency / Shelter</label>
            <select
              value={agency}
              onChange={(e) => setAgency(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Select Agency</option>
              <option value="UNHCR">UNHCR Refugee Center</option>
              <option value="RedCross">Red Cross Medical Unit</option>
              <option value="ShelterA">Temporary Shelter Camp A</option>
              <option value="ShelterB">Temporary Shelter Camp B</option>
              <option value="LegalAid">Legal Aid Desk</option>
            </select>

            <button
              onClick={registerCase}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
            >
              Register Asylum Case
            </button>

            {priority && (

              <div className="mt-3 p-3 bg-yellow-100 rounded">
                <b>Priority Level:</b> {priority}
              </div>

            )}

            {/* NEXT TRAVELER */}

            <button
              className="bg-gray-600 text-white px-4 py-2 rounded mt-3"
              onClick={() => {

                setData(null);
                setScanned(false);
                setReason("");
                setFamilyMembers(0);
                setVulnerability("");
                setNeeds("");
                setNotes("");
                setPriority("");
                setAgency("");

              }}
            >
              Scan Next Traveler
            </button>

          </div>

        </div>

      )}

    </div>

  );

}