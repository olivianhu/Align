import { useState, useContext } from "react";
import { Mail, Lock } from 'lucide-react';
import supabase from '../helper/supabaseClient'
import backgroundImg from '../assets/background.png';
import { Link, useNavigate } from "react-router-dom";
import icons from "../assets/Group 3.png";
import { UserContext } from "../UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { setEmail, setName, setIsLogged, setUserId } = useContext(UserContext);
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
      alert("Successfully logged in!");
      setEmail(input.email);

      const { data, error } = await supabase
          .from('profiles') 
          .select('name, id') 
          .eq('email', input.email) 
          .single(); 

      if (error) {
        console.error('Error fetching user:', error.message);
        return;
      }

      console.log(data)
      setName(data.name);
      setUserId(data.id);
      setIsLogged(true);
      navigate("/");
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
            <h1 className="text-4xl sm:text-5xl font-semibold">Sign In</h1>
            <img src={icons} alt="" className="w-28 h-8 sm:w-36 sm:h-10" />
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-5">
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
              <Lock className="size-5 sm:size-6 absolute left-3 top-3.5 text-gray-500" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="bg-[#E8F1FF] rounded-xl pl-12 pr-4 py-3 w-full"
                onChange={handleInput}
              />
            </div>

            <div className="text-[#3558CE] text-sm sm:text-md text-right cursor-pointer hover:underline">
              Forgot password?
            </div>
          </div>

          {/* Footer */}
          <div className="text-center flex flex-col gap-4 items-center">
            <div>
              Don’t have an account?{" "}
              <Link to="/signup" className="text-[#4672D3] hover:underline">
                Sign up
              </Link>
            </div>
            <button className="bg-[#4672D3] text-white px-6 py-3 rounded-2xl w-32 hover:bg-[#3558CE] transition">
              Log in {'>'}
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default Login;