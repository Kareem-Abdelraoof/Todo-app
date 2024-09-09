import { registerUser, loginUser } from "./api";

export const useFormInput = (setstate) => {
  return (event) => {
    const { name, value, type, checked } = event.target;
    setstate((prevState) => {
      return {
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };
};

const authenticateAndNavigate = async (authData, navigate, authPerform) => {
  const response = await authPerform(authData);
  console.log(`the response is ${response}`);
  console.log(`the response token is ${response.token}`);
  console.log(`the user id  is ${response.user_id}`);
  localStorage.setItem("jwtToken", response.token);
  localStorage.setItem("userId", response.user_id);
  navigate("/todos");
};

export const loginAndNavigate = async (authData, navigate) =>
  await authenticateAndNavigate(authData, navigate, loginUser);
export const registerAndNavigate = (authData, navigate, setIsLoading) =>
  authenticateAndNavigate(authData, navigate, registerUser, setIsLoading);
