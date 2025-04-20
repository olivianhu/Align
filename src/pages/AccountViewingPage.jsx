import { useNavigate } from "react-router-dom";
import supabase from "../helper/supabaseClient";
import { UserContext } from "../UserContext";
import { useContext } from "react";

export default function UserSettingsPage() {
  const navigate = useNavigate();
  const { userId, name, email } = useContext(UserContext);

  const user = {
    id: userId,
    name: name,
    email: email
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
    <div className="w-full min-h-[92vh] flex flex-col items-center justify-center text-white bg-[#EB6A53] px-4">
    {/* Header */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
        Your account details
      </h1>

      {/* User Info Box */}
      <div className="bg-white text-black rounded-[30px] w-[90%] md:w-3/4 lg:w-2/3 xl:w-1/2 px-6 sm:px-10 md:px-16 py-10 sm:py-12 text-center shadow-lg">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold">Username</h2>
          <p className="text-lg sm:text-xl">{user.name}</p>
        </div>

        <div className="mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold">Email</h2>
          <p className="text-lg sm:text-xl">{user.email}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center">
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
