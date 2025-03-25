import { useNavigate } from "react-router-dom";

export default function UserSettingsPage() {
  const navigate = useNavigate();

  // Placeholder user info — replace with real user data from context or Supabase
  const user = {
    username: "123456",
    email: "123456@gmail.com"
  };

  return (
    <div className="w-full h-[92vh] flex flex-col items-center justify-center text-white bg-[#EB6A53]">
      {/* Header */}
      <h1 className="text-5xl font-bold text-white mb-10">Your account details</h1>

      {/* User Info Box */}
      <div className="bg-white text-black rounded-[40px] px-16 py-12 text-center shadow-lg">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Username</h2>
          <p className="text-lg">{user.username}</p>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold">Email</h2>
          <p className="text-lg">{user.email}</p>
        </div>

        <button
          className="border border-black px-6 py-3 rounded-md hover:bg-[#F5BDBC] transition"
          onClick={() => navigate("/account/edit")}
        >
          Edit details
        </button>
      </div>
    </div>
  );
}
