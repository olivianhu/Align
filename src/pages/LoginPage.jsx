import { useState } from "react";
import { Mail, Lock } from 'lucide-react';
import supabase from '../helper/supabaseClient'
import backgroundImg from '../assets/background.png';
import { Link } from "react-router-dom";
import icons from "../assets/Group 3.png";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    });

    if (error) {
      setInput({
        email: "",
        password: "",
      });
      return;
    }

    if (data) {
      alert("Successfully logged in!")
      return null;
    }
  };

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
        backgroundImage: `url(${backgroundImg})`, 
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }} 
    >
      <div className="bg-white p-18 w-[30%] rounded-[50px] text-black text-xl h-[80%] m-10 mb-10 right-10 absolute">
        <form onSubmit={handleSubmit} className="flex flex-col gap-24 justify-center">
          <div className="flex gap-8 w-[90%] items-center">
            <h1 className="text-5xl font-semibold">Sign In</h1>
            <img src={icons} alt="" className="w-38 h-10"/>
          </div>

          <div className="flex flex-col gap-4">
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
            <div className="text-md text-[#3558CE]">
              Forgot password?
            </div>
          </div>
          
          <div className="text-center flex flex-col gap-3 items-center">
            <div>Don’t have an account? <Link to="/signup" className="text-[#4672D3]">Sign up</Link></div>
            <button className="bg-blue px-4 py-3 bg-[#4672D3] rounded-2xl text-white w-32">Log in {'>'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;