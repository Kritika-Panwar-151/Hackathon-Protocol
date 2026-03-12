import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Hackathon App</h1>

      <div className="space-x-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/submit" className="hover:underline">Submit</Link>
        <Link to="/results" className="hover:underline">Results</Link>
      </div>
    </nav>
  );
}

export default Navbar;