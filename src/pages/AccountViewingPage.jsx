import { useNavigate } from "react-router-dom";
import supabase from "../helper/supabaseClient";

export default function UserSettingsPage() {
  const navigate = useNavigate();

  // Placeholder user info — replace with real user data from context or Supabase
  const user = {
    name: "Bob",
    email: "bob@gmail.com"
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="w-full h-[92vh] flex flex-col items-center justify-center text-white bg-[#EB6A53]">
      {/* Header */}
      <h1 className="text-5xl font-bold text-white mb-10">Your account details</h1>

      {/* User Info Box */}
      <div className="bg-white text-black rounded-[40px] w-[40%] px-16 py-12 text-center shadow-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Username</h2>
          <p className="text-xl">{user.name}</p>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold">Email</h2>
          <p className="text-xl">{user.email}</p>
        </div>

        <div className="flex gap-8 justify-center">
          <button
            className="border border-black px-4 py-2 rounded-md hover:bg-[#F5BDBC] transition"
            onClick={() => navigate("/account/edit")}
          >
            Edit details
          </button>
          <button 
            onClick={handleSignOut} 
            className="border border-black px-4 py-2 rounded-md hover:bg-[#F5BDBC] transition"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
