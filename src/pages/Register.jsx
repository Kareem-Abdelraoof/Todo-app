import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Group from './../components/Group/Group';
import { errorCatcher } from './../utils/formUtils';
import {
  registerFormInputs,
  registerFormButtons,
  InputInitializer,
  ButtonInitializer,
} from './../config/formData';
import { changeInputState, objectInputOperation } from './../utils/inputUtils';
import { groupInputHandler } from './../components/Group/groupUtils';
import { checkIfLoggedIn } from './../utils/pageUtils';
import { registerUser } from './../utils/api';
import './../styles/Register.css';

export default function Register() {
  const [registerFormData, setRegisterFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const inputs = new InputInitializer(registerFormInputs);
  inputs.setOnChange(
    changeInputState(setRegisterFormData, objectInputOperation)
  );
  inputs.setValue(registerFormData);

  const buttons = new ButtonInitializer(registerFormButtons);
  buttons.setText({
    nameOfButton: 'register',
    value: isLoading ? 'Loading...' : 'Register',
  });
  buttons.setAttribute({
    nameOfButton: 'register',
    nameOfAttribute: 'disabled',
    value: isLoading ? true : false,
  });

  const handleError = (error) => {
    if (error.response) {
      setErrorMessage(error.response.data.message);
    } else {
      setErrorMessage('There Was No Response ');
    }
    setIsLoading(false);
  };
  const registerFormSubmit = errorCatcher(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await registerUser(registerFormData);
    setIsLoading(false);
    console.log(
      `the token is :${response.token} and the user id is ${response.user_id}`
    );
    localStorage.setItem('jwtToken', response.token);
    localStorage.setItem('userId', response.user_id);
    navigate('/todos');
  }, handleError);

  useEffect(() => {
    setErrorMessage(location?.state);
    async function loggedIn(params) {
      const isLoggedIn = await checkIfLoggedIn();
      if (isLoggedIn.status === false) localStorage.clear();
      else navigate('/todos');
    }
    loggedIn();
  }, []);

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={registerFormSubmit}>
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
