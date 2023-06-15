import React, { useContext, useRef, useState } from 'react';
import { AppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';
import { checkUserExists, register } from '../authorizationProvider/auth';
import formStyles from '../form.module.css';
import cn from 'classnames';
import { ExclamationIcon } from '../icons/ExclamationIcon';
import { checkEmailValid, hashPassword } from '../utils';

export const RegisterPage: React.FC = () => {
  const { email, setEmail } = useContext(AppContext);
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Enter Email');
      emailInputRef?.current?.focus();
      return;
    }

    if (!checkEmailValid(email)) {
      setError('Email is not valid');
      emailInputRef?.current?.focus();
      return;
    }

    if (!password) {
      setError('Enter Password');
      passwordInputRef?.current?.focus();
      return;
    }

    setError('');
    setSubmitting(true);

    const hashedPassword = await hashPassword(password);

    const registered = await register({ email, password: hashedPassword });

    if (registered) {
      setRedirecting(true);
      setTimeout(() => {
        navigate('/');
      }, 2500);
    } else {
      setError('Email already in use.');
    }
    setSubmitting(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEmailValid(true);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsPasswordValid(true);
  };

  const handleEmailBlur = async () => {
    setIsEmailValid(checkEmailValid(email) && !(await checkUserExists(email)));
  };

  const handlePasswordBlur = () => {
    setIsPasswordValid(validatePassword(password));
  };

  const validatePassword = (password: string) => {
    return password.trim() !== '';
  };

  const handleToLogin = () => {
    navigate('/');
  };

  if (redirecting) {
    return (
      <div>
        <h1>Success</h1>
        <p>Successfully registered. Use new credentials to Log In.</p>
        <p className={formStyles.additional_info}>
          You will be redirected to login page shortly. If it doesn't, click{' '}
          <button className={formStyles.link} onClick={handleToLogin}>
            here
          </button>
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className={formStyles.form}>
      <h1>Registration</h1>
      <label className={formStyles.label}>
        Email
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          required
          ref={emailInputRef}
          autoFocus={!email}
          autoComplete="username"
          className={cn(formStyles.input, {
            [formStyles.invalid]: !isEmailValid,
          })}
          aria-description="Enter email in this field"
          tabIndex={1}
        />
      </label>
      <label className={formStyles.label}>
        Password
        <input
          type="password"
          value={password}
          ref={passwordInputRef}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          required
          autoFocus={!!email}
          autoComplete="current-password"
          aria-description="Enter password in this field"
          className={cn(formStyles.input, {
            [formStyles.invalid]: !isPasswordValid,
          })}
          tabIndex={2}
        />
      </label>
      <div className={formStyles.error} aria-live="polite">
        {error && <ExclamationIcon />}
        <span className={formStyles.error_text}>{error}</span>
      </div>
      <div className={formStyles.buttons}>
        <button
          tabIndex={4}
          type="button"
          aria-description="Navigate to main page"
          className={formStyles.button_secondary}
          onClick={handleToLogin}
        >
          Back to Login
        </button>
        <button
          tabIndex={3}
          type="submit"
          aria-description="Submit the registration info"
          disabled={submitting}
          className={formStyles.button_primary}
        >
          Register
        </button>
      </div>
    </form>
  );
};
