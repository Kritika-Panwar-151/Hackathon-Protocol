import { useLocation, useNavigate } from "react-router-dom";

export default function SecurityAlertK() {

  const location = useLocation();
  const navigate = useNavigate();
  const traveler = location.state || {};

  return (
    <div className="max-w-xl mx-auto p-6 bg-red-100 rounded shadow">

      <h2 className="text-2xl font-bold text-red-700 mb-4">
        🚨 Security Alert
      </h2>

      <p className="font-semibold">
        {traveler.reason}
      </p>

      <div className="mt-4 bg-white p-4 rounded">

        <p><strong>Name:</strong> {traveler.name}</p>
        <p><strong>Nationality:</strong> {traveler.nationality}</p>
        <p><strong>Passport:</strong> {traveler.passportNumber}</p>

      </div>

      <p className="mt-4 text-red-700 font-semibold">
        Traveler must be detained for further investigation.
      </p>

      <button
        onClick={() => navigate("/passport-verification")}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Process Next Traveler
      </button>

    </div>
  );
}