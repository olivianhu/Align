import { useState } from "react";

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
      <div className="bg-white p-12 w-[30%] rounded-[50px] text-black text-xl h-[85%] m-10 right-10 absolute">
        <form onSubmit={handleSubmitEvent} className="flex flex-col gap-3 justify-center">
          <div className="flex gap-10 w-[90%] items-center">
            <h1 className="text-5xl font-semibold">Sign In</h1>
            <img src="Group 3.png" alt="" className="w-38 h-10"/>
          </div>
          <div>
            <label htmlFor="user-email">Email:</label>
            <input
              type="email"
              id="user-email"
              name="email"
              placeholder="example@gmail.com"
              className="border border-gray-300 rounded-md text-sm px-1"
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-300 rounded-md text-sm px-1"
              onChange={handleInput}
            />
          </div>
          <button className="bg-blue">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;