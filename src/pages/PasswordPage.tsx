import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../AppContext';
import { tryLogin } from '../authorizationProvider/auth';
import formStyles from '../form.module.css';
import { ExclamationIcon } from '../icons/ExclamationIcon';
import cn from 'classnames';
import { hashPassword, sleep } from '../utils';

export const PasswordPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { email } = useContext(AppContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (!email) {
      navigate('/');
    }
  }, [email, navigate]);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangeEmailClick = () => {
    navigate('/');
  };

  const handleRequestCodeClick = () => {
    navigate('/code');
  };

  const setErrorAndFocus = (error: string) => {
    inputRef?.current?.focus();
    setError(error);
  };

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    if (!password) {
      setErrorAndFocus('Enter Password');
    } else {
      const hashedPassword = await hashPassword(password);
      const passwordValid = await tryLogin({ email, password: hashedPassword });
      await sleep(1000);
      if (passwordValid) {
        navigate('/success');
      } else {
        setErrorAndFocus('Incorrect Password. Try again.');
      }
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h1>Enter Password</h1>
      <form noValidate onSubmit={handleSubmit} className={formStyles.form}>
        <label className={formStyles.label}>
          Password
          <input
            tabIndex={1}
            ref={inputRef}
            autoFocus
            className={formStyles.input}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <label className={formStyles.checkbox_label}>
          <input
            type="checkbox"
            className={formStyles.checkbox}
            checked={showPassword}
            onChange={handleShowPasswordChange}
          />{' '}
          Show password
        </label>
        <div className={formStyles.error} aria-live="polite">
          {error && <ExclamationIcon />}
          <span className={formStyles.error_text}>{error}</span>
        </div>
        <div className={formStyles.buttons}>
          <button
            tabIndex={4}
            className={formStyles.button_secondary}
            type="button"
            onClick={handleChangeEmailClick}
          >
            Change Email
          </button>

          <button
            className={cn(formStyles.link, formStyles.onlyDesktop)}
            type="button"
            tabIndex={3}
            onClick={handleRequestCodeClick}
          >
            Log in using a one-time code
          </button>
          <button
            tabIndex={2}
            className={formStyles.button_primary}
            disabled={submitting}
            type="submit"
          >
            Submit
          </button>
        </div>
        <button
          className={cn(formStyles.link, formStyles.onlyBrowser)}
          type="button"
          tabIndex={3}
          onClick={handleRequestCodeClick}
        >
          Log in using a one-time code
        </button>
      </form>
    </div>
  );
};
