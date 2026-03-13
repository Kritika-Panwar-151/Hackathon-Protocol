import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function TravellerList() {

  const [travellers, setTravellers] = useState([]);

  useEffect(() => {

    const fetchTravellers = async () => {
      const querySnapshot = await getDocs(collection(db, "travelers"));

      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setTravellers(data);
    };

    fetchTravellers();

  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Registered Travelers</h2>

      {travellers.map(t => (
        <div key={t.id} className="border p-4 mb-4 rounded">

          <h3 className="font-semibold">{t.name}</h3>

          <p>Nationality: {t.nationality}</p>

          <p>Passport: {t.passportNumber}</p>

          {t.passportphoto && (
            <img src={t.passportphoto} width="200" />
          )}

        </div>
      ))}

    </div>
  );
}