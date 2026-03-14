import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export default function LoginK() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!role) {
      alert("Please select a role");
      return;
    }

    try {

      await signInWithEmailAndPassword(auth, email, password);

      if (role === "security") {
        navigate("/passport-verification");
      }

      else if (role === "asylum") {
        navigate("/asylum-scanner");
      }

      else if (role === "admin") {
        navigate("/admin");
      }
      else if (role === "ngo") {
        navigate("/ngo-dashboard");
      }

    } catch (error) {

      console.log(error);
      alert("Login failed");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          Border Control Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Officer Email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          {/* ROLE SELECT */}

          <select
            value={role}
            onChange={(e)=>setRole(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Role</option>
            <option value="security">Security Officer</option>
            <option value="asylum">Asylum Officer</option>
            <option value="admin">Admin</option>
            <option value="ngo">NGO</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>

        </form>

      </div>

    </div>

  );

}