import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function NGODashboard() {

  const [asylumTravelers, setAsylumTravelers] = useState([]);

  useEffect(() => {

    // query only humanitarian lane travelers
    const q = query(
      collection(db, "travelers"),
      where("lane", "==", "Humanitarian / Asylum Lane")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setAsylumTravelers(data);

    });

    return () => unsubscribe();

  }, []);

  // statistics
  console.log(asylumTravelers);

  const children = asylumTravelers.filter(t => t.health === "child").length;
  const pregnant = asylumTravelers.filter(t => t.health === "pregnant").length;
  const elderly = asylumTravelers.filter(t => t.health === "elderly").length;

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        NGO Humanitarian Dashboard
      </h1>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-4 gap-4 mb-8">

        <div className="bg-blue-100 p-4 rounded">
          <p>Total Asylum Seekers</p>
          <p className="text-2xl font-bold">{asylumTravelers.length}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded">
          <p>Children</p>
          <p className="text-2xl font-bold">{children}</p>
        </div>

        <div className="bg-pink-100 p-4 rounded">
          <p>Pregnant Women</p>
          <p className="text-2xl font-bold">{pregnant}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <p>Elderly</p>
          <p className="text-2xl font-bold">{elderly}</p>
        </div>

      </div>

      {/* TABLE */}
      <h2 className="text-xl font-semibold mb-2">
        Asylum Seekers
      </h2>

      <table className="w-full border">

        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">BorderId</th>
            <th className="border p-2">Nationality</th>
            <th className="border p-2">Health</th>
            <th className="border p-2">Priority</th>
            <th className="border p-2">Lane</th>
          </tr>
        </thead>

        <tbody>

          {asylumTravelers.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No asylum seekers yet
              </td>
            </tr>
          ) : (
            asylumTravelers.map((t) => (
              <tr key={t.id}>

                <td className="border p-2">{t.name || "-"}</td>
                <td className="border p-2">{t.borderID || "-"}</td>
                <td className="border p-2">{t.nationality || "-"}</td>
                <td className="border p-2">{t.health || "-"}</td>
                <td className="border p-2">{t.priority || "-"}</td>
                <td className="border p-2">{t.laneNumber || "-"}</td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}