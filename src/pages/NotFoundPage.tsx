import { useNavigate } from 'react-router-dom';
import React from 'react';
import formStyles from '../form.module.css';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleToMainPage = async () => {
    navigate('/');
  };
  return (
    <div>
      <h1>Not Found</h1>

      <button className={formStyles.button_primary} onClick={handleToMainPage}>
        To Main Page
      </button>
    </div>
  );
};
