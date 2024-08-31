import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { changeUserPassword, updateUser, getUser } from "../utils/api";
import "./../styles/Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [infoData, setInfoData] = useState({
    email: "",
    username: "",
  });
  useEffect(() => {
    if (!localStorage.getItem("jwtToken") || !localStorage.getItem("userId")) {
      navigate("/login");
    } else {
      async function checkIfLoggedIn() {
        const response = await getUser(localStorage.getItem("userId"));
        if (!response) {
          localStorage.clear();
          navigate("/login");
        } else {
          const { user } = await getUser(localStorage.getItem("userId"));
          setInfoData({ email: user.email, username: user.username });
        }
      }
      checkIfLoggedIn();
    }
  }, []);

  const change = (name) => {
    if (name === "password") return { data: passwordData, fn: setPasswordData };
    if (name === "info") return { data: infoData, fn: setInfoData };
  };
  const changeForms = (name) => {
    const operation = change(name);
    return (e) => {
      operation.fn({ ...operation.data, [e.target.name]: e.target.value });
    };
  };
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    const response = await changeUserPassword(passwordData);
    console.log(response);
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };
  const handleSubmitInfo = async (e) => {
    e.preventDefault();
    const response = await updateUser(infoData);
  };
  return (
    <div className="profile-container">
      <div className="profile-panel">
        <h3>Change Your Password</h3>
        <form onSubmit={handleSubmitPassword}>
          <div className="form-group">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={changeForms("password")}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={changeForms("password")}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmNewPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={passwordData.confirmNewPassword}
              onChange={changeForms("password")}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Change Password
          </button>
        </form>
      </div>

      <div className="profile-panel">
        <h3>Update Your Information</h3>
        <form onSubmit={handleSubmitInfo}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={infoData.email}
              onChange={changeForms("info")}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={infoData.username}
              onChange={changeForms("info")}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Update Information
          </button>
        </form>
      </div>
      <Link className="submit-button" to="/todos">
        Back to todos
      </Link>
    </div>
  );
}
