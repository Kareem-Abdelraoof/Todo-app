import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, getUser } from "../utils/api";
import "./../styles/Register.css";

export default function Register() {
  const navigate = useNavigate();
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
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await registerUser(formData);
    localStorage.setItem("jwtToken", response.token);
    localStorage.setItem("userId", response.user_id);
    console.log(response);
    navigate("/todos");
  };

  return (
    <div className="registerPage-register-container">
      <h2>Register</h2>
      <form className="registerPage-register-form" onSubmit={onSubmit}>
        <label htmlFor="username" className="registerPage-form-label">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={onChange}
          required
        />
        <label htmlFor="email" className="registerPage-form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          required
        />
        <label htmlFor="password" className="registerPage-form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          required
        />

        <button type="submit" className="registerPage-btn-register">
          Register
        </button>
      </form>
      <Link to="/login" className="registerPage-btn-link">
        Login
      </Link>
    </div>
  );
}
