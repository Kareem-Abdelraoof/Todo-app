import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { loginUser, getUser } from "../utils/api";
import "./../styles/Login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(formData);
    localStorage.setItem("jwtToken", response.token);
    localStorage.setItem("userId", response.user_id);
    console.log(response);
    navigate("/todos");
  };
  useEffect(() => {
    async function checkIfLoggedIn() {
      if (localStorage.getItem("jwtToken") || localStorage.getItem("userId")) {
        const response = await getUser(localStorage.getItem("userId"));
        if (response) {
          navigate("/todos");
        }
      }
    }
    checkIfLoggedIn();
  }, []);
  return (
    <div className="loginPaga-login-container">
      <h2 className="loginPaga-login-title">Login</h2>
      <form className="loginPaga-login-form" onSubmit={onSubmit}>
        <div className="loginPaga-form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="loginPaga-form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            required
          />
        </div>
        <div className="loginPaga-button-container">
          <button type="submit" className="loginPaga-btn-primary">
            Login
          </button>
          <Link to="/register" className="loginPaga-btn-link">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
