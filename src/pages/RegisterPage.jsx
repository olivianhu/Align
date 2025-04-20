import { useState } from "react";
import { Mail, Lock, User } from 'lucide-react';
import supabase from '../helper/supabaseClient'
import { Link, useNavigate } from "react-router-dom";
import backgroundImg from '../assets/background.png';
import icons from "../assets/Group 3.png";


const RegisterPage = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    username: "",
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

    console.log(input);
    const { user } = data;
    const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: user.id, name: input.username, email: input.email }]);

    if (profileError) {
        console.error('Error saving username:', profileError);
    } else {
      alert("User account created!");
      navigate("/login");
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
    <div
      className="w-full min-h-[92vh] flex flex-col justify-center items-center px-4"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[30%] rounded-[40px] text-black text-base sm:text-lg p-6 sm:p-10 md:p-14 lg:p-18 my-10 shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-16 sm:gap-20">
          {/* Header */}
          <div className="flex gap-6 sm:gap-8 items-center justify-center mt-4"> 
            <h1 className="text-4xl sm:text-4xl font-semibold">Sign Up</h1>
            <img src={icons} alt="" className="w-28 h-8 sm:w-36 sm:h-10" />
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-5">
            {message && <span className="text-sm text-red-600">{message}</span>}

            <div className="relative">
              <Mail className="size-5 sm:size-6 absolute left-3 top-3.5 text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="bg-[#E8F1FF] rounded-xl pl-12 pr-4 py-3 w-full"
                onChange={handleInput}
              />
            </div>

            <div className="relative">
              <User className="size-5 sm:size-6 absolute left-3 top-3.5 text-gray-500" />
              <input
                type="text"
                name="username"
                placeholder="Name"
                className="bg-[#E8F1FF] rounded-xl pl-12 pr-4 py-3 w-full"
                onChange={handleInput}
              />
            </div>

            <div className="relative">
              <Lock className="size-5 sm:size-6 absolute left-3 top-3.5 text-gray-500" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="bg-[#E8F1FF] rounded-xl pl-12 pr-4 py-3 w-full"
                onChange={handleInput}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="text-center flex flex-col gap-4 items-center">
            <div>
              Already have an account?{" "}
              <Link to="/login" className="text-[#4672D3] hover:underline">
                Log In
              </Link>
            </div>
            <button className="bg-[#4672D3] text-white px-6 py-3 rounded-2xl w-32 hover:bg-[#3558CE] transition">
              Sign Up {'>'}
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default RegisterPage;