import { useState } from "react";
import { Mail, Lock } from 'lucide-react';

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      //dispatch action from hooks
    }
    alert("please provide a valid input");
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
        backgroundImage: "url('background.png')", 
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }} 
    >
      <div className="bg-white p-18 w-[30%] rounded-[50px] text-black text-xl h-[80%] m-10 mb-10 right-10 absolute">
        <form onSubmit={handleSubmitEvent} className="flex flex-col gap-24 justify-center">
          <div className="flex gap-8 w-[90%] items-center">
            <h1 className="text-5xl font-semibold">Sign In</h1>
            <img src="Group 3.png" alt="" className="w-38 h-10"/>
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
            <div>Don’t have an account? <a href="" className="text-[#4672D3]">Sign up</a></div>
            <button className="bg-blue px-4 py-3 bg-[#4672D3] rounded-2xl text-white w-32">Log in {'>'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;