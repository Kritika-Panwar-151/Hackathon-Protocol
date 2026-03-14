import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, onSnapshot } from "firebase/firestore";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function AdminDashboard() {

  const [travelers, setTravelers] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    asylum: 0,
    medical: 0,
    alerts: 0
  });

  useEffect(() => {

  const unsubscribeTravelers = onSnapshot(
    collection(db, "travelers"),
    (snapshot) => {

      const travelerData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setTravelers(travelerData);
    }
  );

  const unsubscribeAlerts = onSnapshot(
    collection(db, "securityAlerts"),
    (snapshot) => {

      const alertData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setAlerts(alertData);
    }
  );

  return () => {
    unsubscribeTravelers();
    unsubscribeAlerts();
  };

}, []);

  const calculateStats = (travelerData, alertData) => {

    let asylum = 0;
    let medical = 0;

    travelerData.forEach(t => {

      if (t.category === "asylum" || t.category === "refugee") asylum++;

      if (t.health === "medical") medical++;

    });

    setStats({
      total: travelerData.length,
      asylum,
      medical,
      alerts: alertData.length
    });

  };

  const categoryData = [
  { name: "Tourist", value: travelers.filter(t => t.category === "tourist").length },
  { name: "Worker", value: travelers.filter(t => t.category === "worker").length },
  { name: "Migrant", value: travelers.filter(t => t.category === "migrant").length },
  { name: "Refugee", value: travelers.filter(t => t.category === "refugee").length },
  { name: "Asylum", value: travelers.filter(t => t.category === "asylum").length }
].filter(c => c.value > 0);

const laneData = [
  {
    lane: "1 (Medical)",
    count: travelers.filter(t => t.laneNumber === "Lane 1").length
  },
  {
    lane: "2(Doc Verification)",
    count: travelers.filter(t => t.laneNumber === "Lane 2").length
  },
  {
    lane: "3 (Asylum)",
    count: travelers.filter(t => t.laneNumber === "Lane 3").length
  },
  {
    lane: "4 (Immigration)",
    count: travelers.filter(t => t.laneNumber === "Lane 4").length
  }
];

  const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444", "#9333ea"];

  return (

    <div className="p-8">

      <h1 className="text-2xl font-bold mb-6">
        Border Operations Dashboard
      </h1>

      {/* SUMMARY CARDS */}

      <div className="grid grid-cols-4 gap-4 mb-8">

        <div className="bg-blue-500 text-white p-4 rounded">
          <h2 className="text-lg">Total Travelers</h2>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-red-500 text-white p-4 rounded">
          <h2 className="text-lg">Security Alerts</h2>
          <p className="text-2xl font-bold">{stats.alerts}</p>
        </div>

        <div className="bg-yellow-500 text-white p-4 rounded">
          <h2 className="text-lg">Asylum Cases</h2>
          <p className="text-2xl font-bold">{stats.asylum}</p>
        </div>

        <div className="bg-green-500 text-white p-4 rounded">
          <h2 className="text-lg">Medical Emergencies</h2>
          <p className="text-2xl font-bold">{stats.medical}</p>
        </div>

      </div>

      {/* GRAPHS */}

      <div className="grid grid-cols-2 gap-8">

        {/* CATEGORY PIE CHART */}

        <div className="bg-white p-4 rounded shadow">

          <h2 className="font-semibold mb-3">
            Traveler Categories
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >

                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* LANE BAR CHART */}

        <div className="bg-white p-4 rounded shadow">

          <h2 className="font-semibold mb-3">
            Lane Traffic
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={laneData}>

              <XAxis dataKey="lane" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="count" fill="#2563eb" />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* SECURITY ALERTS TABLE */}

      <div className="mt-10 bg-white p-4 rounded shadow">

        <h2 className="font-semibold mb-3">
          Security Alerts
        </h2>

        <table className="w-full text-left">

          <thead>

            <tr className="border-b">
              <th>Name</th>
              <th>Nationality</th>
              <th>Passport</th>
              <th>Reason</th>
            </tr>

          </thead>

          <tbody>

            {alerts.map((a, i) => (

              <tr key={i} className="border-b">

                <td>{a.name}</td>
                <td>{a.nationality}</td>
                <td>{a.passport}</td>
                <td className="text-red-600 font-semibold">{a.reason}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}