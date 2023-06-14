import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import { logout } from '../authorizationProvider/auth';
import formStyles from '../form.module.css';

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

      <button className={formStyles.button_primary} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
