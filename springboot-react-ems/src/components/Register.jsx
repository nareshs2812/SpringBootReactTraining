import { useState } from "react";
import axios from "axios";
import './Register.css';

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/auth/register", {
        userName,
        password,
        email,
      });
      alert("Registration successful!");
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="container">
      <h1 className="register-heading">Create Your Account</h1>
      <form onSubmit={handleRegister} className="register-form">
        <label htmlFor="userName">User Name</label>
        <input
          id="userName"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter username"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          required
        />

        <label type="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
