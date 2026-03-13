import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function TravellerJ() {

  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [passportphoto, setPassportphoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPassportphoto(file);   // ✅ fixed
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await addDoc(collection(db, "travelers"), {
        name,
        nationality,
        passportNumber,
        passportphoto: passportphoto ? `/passports/${passportphoto.name}` : null,
        createdAt: new Date()
      });

      alert("Traveler Registered Successfully");

      setName("");
      setNationality("");
      setPassportNumber("");
      setPassportphoto(null);
      setPreview(null);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">

      <h2 className="text-2xl font-bold mb-4">
        Traveler Registration
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Traveler Name"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Nationality"
          className="w-full border p-2 rounded"
          value={nationality}
          onChange={(e)=>setNationality(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Passport Number"
          className="w-full border p-2 rounded"
          value={passportNumber}
          onChange={(e)=>setPassportNumber(e.target.value)}
        />

        <div>
          <label className="block mb-2 font-medium">
            Upload Passport Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        {preview && (
          <img
            src={preview}
            alt="passport preview"
            className="w-full mt-4 rounded"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Verify Passport
        </button>

      </form>
    </div>
  );
}