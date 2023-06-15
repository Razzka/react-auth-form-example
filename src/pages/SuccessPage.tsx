import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import { logout } from '../authorizationProvider/auth';
import formStyles from './form.module.css';

export const SuccessPage = () => {
  const navigate = useNavigate();
  const { setEmail } = useContext(AppContext);
  const handleLogout = async () => {
    await logout();
    setEmail('');
    navigate('/');
  };

  return (
    <div>
      <h1>Successfully Authorized!</h1>

      <button aria-description="Log out and navigate to main page" className={formStyles.button_primary} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
