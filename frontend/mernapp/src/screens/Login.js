import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';  // Importing the CSS file

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://gofood-delivery-app-backend.onrender.com/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      }),
    });

    const json = await response.json();
    
    console.log(json);
    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };

  const onChangeEvent = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="icon">
        </div>
        <h2 className="text-center text-light">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChangeEvent}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChangeEvent}
            />
          </div>
          <div className="form-check">
              <input className="checkbox" type="checkbox" /> Remember me
              <Link to="#">Forgot Password?</Link>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
          <Link to="/creatuser" className="btn btn-danger w-100 mt-3">New User</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
