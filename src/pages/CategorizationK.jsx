import { useState } from "react";

export default function CategorizationK() {

  const [category, setCategory] = useState("");
  const [health, setHealth] = useState("");
  const [lane, setLane] = useState("");
  const [priority, setPriority] = useState("");
  const [emergencyAlert, setEmergencyAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    let assignedLane = "";
    let priorityLevel = "NORMAL";
    let emergency = false;

    // MEDICAL EMERGENCY
    if (health === "medical") {
      assignedLane = "Medical / Emergency Lane";
      priorityLevel = "HIGH";
      emergency = true;
    }

    // REFUGEE / ASYLUM
    else if (category === "refugee") {
      assignedLane = "Humanitarian / Asylum Lane";

      if (
        health === "child" ||
        health === "pregnant" ||
        health === "elderly" ||
        health === "disabled"
      ) {
        priorityLevel = "MEDIUM";
      } else {
        priorityLevel = "MEDIUM";
      }
    }

    // TOURIST / WORKER
    else {
      assignedLane = "Normal Immigration Lane";

      if (
        health === "child" ||
        health === "pregnant" ||
        health === "elderly" ||
        health === "disabled"
      ) {
        priorityLevel = "MEDIUM";
      } else {
        priorityLevel = "NORMAL";
      }
    }

    setLane(assignedLane);
    setPriority(priorityLevel);
    setEmergencyAlert(emergency);
  };

  // Priority color helper
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

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* CATEGORY */}
        <label>Traveler Category</label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Category</option>
          <option value="tourist">Tourist / Visitor</option>
          <option value="worker">Worker / Migrant</option>
          <option value="refugee">Refugee / Asylum Seeker</option>
        </select>

        {/* HEALTH */}
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

      {/* RESULT */}
      {lane && (
        <div className="mt-4 p-4 bg-gray-100 rounded">

          <p className="font-semibold">
            Assigned Lane: {lane}
          </p>

          <p className={`mt-2 font-semibold ${getPriorityColor()}`}>
            Priority Level: {priority}
          </p>

          {emergencyAlert && (
            <div className="mt-3 p-3 bg-red-100 text-red-700 rounded font-semibold">
              ⚠ Emergency Case – Medical personnel deployed.
              Send traveler immediately to Medical Lane.
            </div>
          )}

        </div>
      )}

    </div>
  );
}