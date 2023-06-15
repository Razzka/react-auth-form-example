import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { checkEmailValid } from '../utils';
import formStyles from '../form.module.css';
import cn from 'classnames';
import { checkUserExists } from '../authorizationProvider/auth';
import { ExclamationIcon } from '../icons/ExclamationIcon';
import { Logo } from '../icons/Logo';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { email, setEmail } = useContext(AppContext);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEmailValid(true);
  };

  const handleEmailBlur = () => {
    setIsEmailValid(checkEmailValid(email));
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    if (!checkEmailValid(email)) {
      inputRef?.current?.focus();
      setError('Incorrect Email');
    } else if (!(await checkUserExists(email))) {
      setError('Email not found, wanna register first?');
      buttonRef?.current?.focus();
    } else {
      navigate('/password');
    }

    setSubmitting(false);
  };

  return (
    <div>
      <h1>Welcome to Razzka's!</h1>

      <div className={formStyles.bigLogo}>
        <Logo />
      </div>

      <form noValidate onSubmit={handleSubmit} className={formStyles.form}>
        <label className={formStyles.label}>
          Email
          <input
              aria-description="Enter email in this field"
            tabIndex={1}
            autoFocus={!email}
            className={cn(formStyles.input, {
              [formStyles.invalid]: !isEmailValid,
            })}
            ref={inputRef}
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
          />
        </label>
        <div className={formStyles.error} aria-live="polite">
        {error && <ExclamationIcon />}
          <span className={formStyles.error_text}>{error}</span>
        </div>
        <div className={formStyles.buttons}>
          <button
            tabIndex={3}
            className={formStyles.button_secondary}
            type="button"
            ref={buttonRef}
            aria-description="Navigate to Registration page"
            onClick={handleRegister}
          >
            Register
          </button>
          <button
            tabIndex={2}
            className={formStyles.button_primary}
            disabled={submitting}
            autoFocus={!!email}
            aria-description="Submit email to authenticate"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
