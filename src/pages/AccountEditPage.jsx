import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../helper/supabaseClient";
import { UserContext } from "../UserContext"; 

export default function EditAccountPage() {
  const navigate = useNavigate();
  const { userId, name, email, setName, setEmail } = useContext(UserContext); 

  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);

  const handleSave = async () => {
    console.log("Saving...", { name, email });

    const { error } = await supabase
      .from("profiles")
      .update({ name: newName, email: newEmail })
      .eq("id", userId); // Replace with the actual user ID

    if (error) {
      console.error("Error saving data:", error);
    } else {
      setName(newName);
      setEmail(newEmail);
    }

    navigate("/account"); 
  };

  const handleCancel = () => {
    navigate("/account");
  };

  return (
    <div className="w-full h-[92vh] flex flex-col items-center justify-center text-black bg-[#EB6A53]">
      <div className="bg-white rounded-[40px] px-16 py-12 text-left shadow-lg w-[500px] max-w-[90%]">
        <h1 className="text-3xl font-bold mb-10">Account details</h1>

        {/* Username Input */}
        <div className="mb-6">
          <label htmlFor="username" className="block text-lg font-semibold mb-2">Name</label>
          <input
            id="username"
            className="w-full border border-black rounded px-4 py-2"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>

        {/* Email Input */}
        <div className="mb-10">
          <label htmlFor="email" className="block text-lg font-semibold mb-2">Email</label>
          <input
            id="email"
            className="w-full border border-black rounded px-4 py-2"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 text-sm">
          <button
            onClick={handleSave}
            className="bg-[#B8EBA8] text-black font-semibold px-6 py-2 rounded hover:bg-[#A0DB8E] transition"
          >
            Save Changes
          </button>
          <button
            onClick={handleCancel}
            className="border border-black px-6 py-2 rounded hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
