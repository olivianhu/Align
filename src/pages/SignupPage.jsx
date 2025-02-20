import { useState } from "react";
import { Mail, Lock } from 'lucide-react';
import supabase from '../helper/supabaseClient'
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data) {
      alert("User account created!");
      navigate("/login")
    }

    setInput({
      email: "",
      password: ""
    });
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full h-[92vh] flex flex-col justify-center relative"
      style={{
        backgroundImage: "url('background.png')", 
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }} 
    >
      <div className="bg-white p-18 w-[30%] rounded-[50px] text-black text-xl h-[80%] m-10 mb-10 right-10 absolute">
        <form onSubmit={handleSubmit} className="flex flex-col gap-24 justify-center">
          <div className="flex gap-6 w-[95%] items-center">
            <h1 className="text-5xl font-semibold">Sign Up</h1>
            <img src="Group 3.png" alt="" className="w-38 h-10"/>
          </div>

          <div className="flex flex-col gap-4">
            {message && <span>{message}</span>}
            <div className="flex items-center">
              <Mail className="size-6 absolute ml-3"/>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="bg-[#E8F1FF] rounded-xl text-md pl-12 p-3 w-full"
                onChange={handleInput}
              />
            </div>
            <div className="flex items-center">
              <Lock className="size-6 absolute ml-3"/>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="bg-[#E8F1FF] rounded-xl text-md pl-12 p-3 w-full"
                onChange={handleInput}
              />
            </div>
          </div>
          
          <div className="text-center flex flex-col gap-3 items-center">
            <div>Already have an account? <Link to="/login" className="text-[#4672D3]">Log In</Link></div>
            <button className="bg-blue px-4 py-3 bg-[#4672D3] rounded-2xl text-white w-32">Sign Up {'>'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;