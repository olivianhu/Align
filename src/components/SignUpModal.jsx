// components/SignUpModal.js
import { useState } from "react";
import PropTypes from "prop-types";

const SignUpModal = ({ open, onSignUp }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp(name, email, password);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
      <div className="bg-white rounded-2xl p-8 w-96">
        <h2 className="text-xl font-semibold mb-4">Sign Up to Continue</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border p-2 rounded"
            placeholder="Email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border p-2 rounded"
            placeholder="Password"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
SignUpModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onSignUp: PropTypes.func.isRequired,
};

export default SignUpModal;
