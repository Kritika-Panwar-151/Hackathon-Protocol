import { useState } from "react";

function Form() {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submitted: " + input);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md max-w-md">
      <label className="block mb-2 font-medium">
        Enter Data
      </label>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 w-full rounded mb-4"
        placeholder="Type something..."
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}

export default Form;