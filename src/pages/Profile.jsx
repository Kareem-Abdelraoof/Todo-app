import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Group from './../components/Group/Group';
import { errorCatcher } from './../utils/formUtils';
import {
  profilePasswordFormInputs,
  profilePasswordFormButtons,
  profileUpdateFormInputs,
  profileUpdateFormButtons,
  InputInitializer,
  ButtonInitializer,
} from './../config/formData';
import { changeInputState, objectInputOperation } from './../utils/inputUtils';
import { groupInputHandler } from './../components/Group/groupUtils';
import { changeUserPassword, updateUser, getUser } from './../utils/api';
import { checkIfLoggedIn } from './../utils/pageUtils';
import { handleError } from './../utils/errorUtils';

import './../styles/Profile.css';
export default function Profile() {
  const navigate = useNavigate();
  const [passwordFormData, setPasswordFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [updateFormData, setUpdateFormData] = useState({
    email: '',
    username: '',
  });
  const [isLoadingPassword, setIsloadingPassword] = useState(false);
  const [isLoadingUpdate, setIsloadingUpdate] = useState(false);
  const [errorMessagePassword, setErrorMessagePassword] = useState('');
  const [errorMessageUpdate, setErrorMessageUpdate] = useState('');
  const [hasChangedInfo, setHasChangedInfo] = useState(false);
  const [hasChangedPassword, setHasChangedPassword] = useState(false);

  // Initialize password form Inputs with dynamic text and attributes
  const passwordInputs = new InputInitializer(profilePasswordFormInputs);
  passwordInputs.setOnChange(
    changeInputState(setPasswordFormData, objectInputOperation)
  );
  passwordInputs.setValue(passwordFormData);

  // Initialize password form buttons with dynamic text and attributes
  const passwordButtons = new ButtonInitializer(profilePasswordFormButtons);
  passwordButtons.setText({
    nameOfButton: 'update-password',
    value: isLoadingPassword ? 'Loading...' : 'Update Password',
  });
  passwordButtons.setAttribute({
    nameOfButton: 'update-password',
    nameOfAttribute: 'disabled',
    value: isLoadingPassword ? true : false,
  });
  // Initialize update form Inputs with dynamic text and attributes
  const updateInputs = new InputInitializer(profileUpdateFormInputs);
  updateInputs.setOnChange(
    changeInputState(setUpdateFormData, objectInputOperation)
  );
  updateInputs.setValue(updateFormData);

  // Initialize update form buttons with dynamic text and attributes
  const updateButtons = new ButtonInitializer(profileUpdateFormButtons);
  updateButtons.setText({
    nameOfButton: 'update-info',
    value: isLoadingUpdate ? 'Loading...' : 'Update Info',
  });
  updateButtons.setAttribute({
    nameOfButton: 'update-info',
    nameOfAttribute: 'disabled',
    value: isLoadingUpdate ? true : false,
  });

  // password form submit
  const profilePasswordFormSubmit = errorCatcher(
    async (e) => {
      e.preventDefault();
      setIsloadingPassword(true);
      const response = await changeUserPassword(passwordFormData);
      setHasChangedPassword(true);
      setIsloadingPassword(false);
    },
    handleError(setErrorMessagePassword, setIsloadingPassword)
  );

  // update form submit
  const profileUpdateFormSubmit = errorCatcher(
    async (e) => {
      e.preventDefault();
      setIsloadingUpdate(true);
      const response = await updateUser(updateFormData);
      console.log(response);
      setHasChangedInfo(true);
      setIsloadingUpdate(false);
    },
    handleError(setErrorMessageUpdate, setIsloadingUpdate)
  );

  console.log(
    `the jwtToken is :${localStorage.getItem('jwtToken')}\n and the userId is :${localStorage.getItem('userId')}`
  );

  useEffect(() => {
    async function loggedIn() {
      const isLoggedIn = await checkIfLoggedIn();
      if (isLoggedIn.status === true)
        setUpdateFormData({
          email: isLoggedIn.user.email,
          username: isLoggedIn.user.username,
        });
      else {
        localStorage.clear();
        navigate('/login', { state: 'You Must Login First' });
      }
    }
    loggedIn();
  }, []);

  return (
    <div>
      <div className="profile-container">
        <div className="profile-forms-Container">
          <div className="profile-form">
            <h3>Change Password</h3>
            <form onSubmit={profilePasswordFormSubmit}>
              <Group elements={groupInputHandler(passwordInputs.data)} />
              {errorMessagePassword && (
                <div className="error-message">{errorMessagePassword}</div>
              )}
              {hasChangedPassword && (
                <div className="success-message">
                  The User Password Updated Successfully
                </div>
              )}
              <Group
                className="button-group"
                elements={groupInputHandler(passwordButtons.data)}
              />
            </form>
          </div>

          <div className="profile-form">
            <form
              className="update-profile-form"
              onSubmit={profileUpdateFormSubmit}
            >
              <div>
                <h3>Update Profile Information</h3>
                <Group elements={groupInputHandler(updateInputs.data)} />
                {errorMessageUpdate && (
                  <div className="error-message">{errorMessageUpdate}</div>
                )}
                {hasChangedInfo && (
                  <div className="success-message">
                    The User Updated Successfully
                  </div>
                )}
              </div>
              <Group
                className="button-group"
                elements={groupInputHandler(updateButtons.data)}
              />
            </form>
          </div>
        </div>
        <div className="profile-link-container">
          <Link to="/todos" className="profile-link">
            Go To Your Todos
          </Link>
        </div>
      </div>
    </div>
  );
}
