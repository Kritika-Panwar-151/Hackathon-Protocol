import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CategorizationK() {

  const location = useLocation();
  const traveler = location.state || {};
  const navigate = useNavigate();

  console.log("Traveler Data from Face Scan:", traveler);

  const [category, setCategory] = useState("");
  const [health, setHealth] = useState("");
  const [lane, setLane] = useState("");
  const [priority, setPriority] = useState("");
  const [emergencyAlert, setEmergencyAlert] = useState(false);
  const [laneNumber, setLaneNumber] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    let assignedLane = "";
    let laneNo = "";
    let priorityLevel = "NORMAL";
    let emergency = false;

    // MEDICAL EMERGENCY
    if (health === "medical") {

      assignedLane = "Medical / Emergency Lane";
      laneNo = "Lane 1";
      priorityLevel = "HIGH";
      emergency = true;

    }

    // NO PASSPORT
    else if (traveler.noPassport) {

      assignedLane = "Document Verification Lane";
      laneNo = "Lane 2";
      priorityLevel = "MEDIUM";

    }

    // REFUGEE / ASYLUM
    else if (category === "refugee" || category === "asylum") {

      assignedLane = "Humanitarian / Asylum Lane";
      laneNo = "Lane 3";

      if (
        health === "child" ||
        health === "pregnant" ||
        health === "elderly" ||
        health === "disabled"
      ) {
        priorityLevel = "MEDIUM";
      }

    }

    // NORMAL TRAVELERS
    else {

      assignedLane = "Normal Immigration Lane";
      laneNo = "Lane 4";

      if (
        health === "child" ||
        health === "pregnant" ||
        health === "elderly" ||
        health === "disabled"
      ) {
        priorityLevel = "MEDIUM";
      }

    }

    setLane(assignedLane);
    setLaneNumber(laneNo);
    setPriority(priorityLevel);
    setEmergencyAlert(emergency);

    // STORE TRAVELER IN FIRESTORE
    try {

      const travelerData = {
        borderID: "BORDER-" + Math.floor(Math.random() * 10000),

        name: traveler.name,
        nationality: traveler.nationality,
        passport: traveler.passportNumber || "none",

        category: category,
        health: health,

        lane: assignedLane,
        laneNumber: laneNo,

        priority: priorityLevel,

        timestamp: new Date().toISOString().split("T")[0]
      };

      await addDoc(collection(db, "travelers"), travelerData);

      console.log("Traveler stored in Firestore:", travelerData);

    } catch (error) {

      console.error("Error storing traveler:", error);

    }

  };

  const getPriorityColor = () => {

    if (priority === "HIGH") return "text-red-600";
    if (priority === "MEDIUM") return "text-yellow-600";
    return "text-green-600";

  };

  return (

    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">

      <h2 className="text-xl font-bold mb-4">
        Traveler Categorization
      </h2>

      {traveler && (
        <div className="mb-4 p-3 bg-gray-100 rounded">
          <p><strong>Name:</strong> {traveler.name}</p>
          <p><strong>Nationality:</strong> {traveler.nationality}</p>
          <p><strong>Passport:</strong> {traveler.passportNumber || "None"}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <label>Traveler Category</label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Category</option>

          <option value="tourist">Tourist / Visitor</option>
          <option value="worker">Worker</option>
          <option value="migrant">Migrant</option>

          <option value="refugee">Refugee</option>
          <option value="asylum">Asylum Seeker</option>

        </select>

        <label>Health Status</label>

        <select
          value={health}
          onChange={(e) => setHealth(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Status</option>

          <option value="clear">Clear</option>
          <option value="medical">Medical Emergency</option>

          <option value="child">Child / Minor</option>
          <option value="pregnant">Pregnant</option>
          <option value="elderly">Elderly</option>
          <option value="disabled">Disabled</option>

        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Assign Lane
        </button>

      </form>

      {lane && (

        <div className="mt-4 p-4 bg-gray-100 rounded">

          <p className="font-semibold">
            Assigned Lane: {lane}
          </p>

          <p className="font-semibold">
            Lane Number: {laneNumber}
          </p>

          <p className={`mt-2 font-semibold ${getPriorityColor()}`}>
            Priority Level: {priority}
          </p>

          {emergencyAlert && (
            <div className="mt-3 p-3 bg-red-100 text-red-700 rounded font-semibold">
              ⚠ Emergency Case – Medical personnel deployed.
            </div>
          )}

        </div>

      )}

      <button
        onClick={() =>
          navigate("/qr-generator", {
            state: {
              ...traveler,
              category,
              health,
              lane,
              laneNumber,
              priority
            }
          })
        }
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Proceed to QR Generation
      </button>

    </div>

  );

}