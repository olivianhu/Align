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
    <form onSubmit={handleSubmitEvent} className="flex flex-col gap-3 w-40">
      <h1 className="text-lg font-bold">Login</h1>
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
  );
};

export default Login;