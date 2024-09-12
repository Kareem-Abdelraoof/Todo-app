import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Group from './../components/Group/Group';
import { errorCatcher } from './../utils/formUtils';
import {
  loginFormInputs,
  loginFormButtons,
  InputInitializer,
  ButtonInitializer,
} from './../config/formData';
import { changeInputState, objectInputOperation } from './../utils/inputUtils';
import { groupInputHandler } from './../components/Group/groupUtils';
import { loginUser } from './../utils/api';
import { checkIfLoggedIn } from './../utils/pageUtils';
import { handleError } from './../utils/errorUtils';

import './../styles/Login.css';
export default function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const inputs = new InputInitializer(loginFormInputs);
  inputs.setOnChange(changeInputState(setLoginFormData, objectInputOperation));
  inputs.setValue(loginFormData);

  const loginFormSubmit = errorCatcher(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      const response = await loginUser(loginFormData);
      setIsLoading(false);
      localStorage.setItem('jwtToken', response.data.token);
      localStorage.setItem('userId', response.data.user_id);
      navigate('/todos');
    },
    handleError(setErrorMessage, setIsLoading)
  );

  // Initialize form buttons with dynamic text and attributes
  const buttons = new ButtonInitializer(loginFormButtons);
  buttons.setText({
    nameOfButton: 'login',
    value: isLoading ? 'Loading...' : 'Login',
  });
  buttons.setAttribute({
    nameOfButton: 'login',
    nameOfAttribute: 'disabled',
    value: isLoading ? true : false,
  });
  useEffect(() => {
    setErrorMessage(location?.state);
    async function loggedIn() {
      const isLoggedIn = await checkIfLoggedIn();
      if (isLoggedIn.status === false) localStorage.clear();
      else navigate('/todos');
    }
    loggedIn();
  }, []);

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={loginFormSubmit}>
        {/* Render form inputs */}
        <Group elements={groupInputHandler(inputs.data)} />

        {/* Display error message if there is one */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {/* Render form buttons */}
        <Group
          className="button-group"
          elements={groupInputHandler(buttons.data)}
        />
      </form>
    </div>
  );
}
