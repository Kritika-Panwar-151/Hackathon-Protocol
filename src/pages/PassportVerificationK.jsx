import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
export default function PassportVerificationK() {

  const [passportNumber, setPassportNumber] = useState("");
  const [nationality, setNationality] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [noPassport, setNoPassport] = useState(false);
  const navigate = useNavigate();
  const verifyPassport = async (e) => {

    e.preventDefault();

    if(!name || !nationality){
      setStatus("Name and Nationality are required");
      return;
    }

    if(!noPassport){

      if(!passportNumber){
        setStatus("Enter passport number or select 'No Passport'");
        return;
      }

      const q = query(
  collection(db, "stolenPassports"),
  where("passportNumber", "==", passportNumber)
);

const querySnapshot = await getDocs(q);

if (!querySnapshot.empty) {

  setStatus("⚠ Stolen passport detected! Security alert.");

  // STORE ALERT IN FIRESTORE
  await addDoc(collection(db, "securityAlerts"), {
    name: name,
    nationality: nationality,
    passport: passportNumber,
    reason: "Stolen Passport detected",
    status: "detained",
    timestamp: new Date()
  });

  setTimeout(() => {
    navigate("/security-alert", {
      state: {
        name,
        nationality,
        passportNumber,
        reason: "Stolen passport detected"
      }
    });
  }, 1500);

  return;
}

    }

    setStatus("✔ Identity recorded. Proceeding to facial recognition...");

setTimeout(() => {
  navigate("/face-scan", {
    state: {
      name,
      nationality,
      passportNumber: noPassport ? null : passportNumber,
      noPassport
    }
  });
}, 1500);

  };

  return (

    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">

      <h2 className="text-xl font-bold mb-4">
        Passport Verification
      </h2>

      <form onSubmit={verifyPassport} className="flex flex-col gap-4">

        {/* NAME */}

        <label>Name *</label>

        <input
          type="text"
          className="border p-2 rounded"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        {/* NATIONALITY */}

        <label>Nationality *</label>

        <input
          type="text"
          className="border p-2 rounded"
          value={nationality}
          onChange={(e)=>setNationality(e.target.value)}
        />

        {/* NO PASSPORT OPTION */}

        <label className="flex items-center gap-2">

          <input
            type="checkbox"
            checked={noPassport}
            onChange={()=>setNoPassport(!noPassport)}
          />

          No Passport Available

        </label>

        {/* PASSPORT FIELD */}

        {!noPassport && (

          <>

            <label>Passport Number</label>

            <input
              type="text"
              className="border p-2 rounded"
              placeholder="Example: A1234567"
              value={passportNumber}
              onChange={(e)=>setPassportNumber(e.target.value.toUpperCase())}
            />

          </>

        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Verify Identity
        </button>

      </form>

      {status && (

        <div className="mt-4 p-3 bg-gray-100 rounded font-semibold">
          {status}
        </div>

      )}

    </div>

  );

}