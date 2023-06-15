import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../AppContext';
import { checkCodeValid } from '../authorizationProvider/auth';
import formStyles from './form.module.css';
import { ExclamationIcon } from '../icons/ExclamationIcon';
import cn from "classnames";

export const CodePage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { email } = useContext(AppContext);
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!email) {
      navigate('/');
    }
  }, [email]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handlePassword = () => {
    navigate('/password');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) {
      setError('Enter Code');
      inputRef?.current?.focus();
      return;
    }

    setSubmitting(true);
    const codeValid = await checkCodeValid(code);
    if (codeValid) {
      navigate('/success');
    } else {
      setError('Incorrect Code. For test use code 1234.');
      inputRef?.current?.focus();
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h1>Code has been sent by email</h1>
      <form onSubmit={handleSubmit} className={formStyles.form}>
        <label className={formStyles.label}>
          Code
          <input
            ref={inputRef}
            tabIndex={1}
            autoFocus
            className={cn(formStyles.input, {
              [formStyles.invalid]: error,
            })}
            type="number"
            value={code}
            aria-description="Enter code from email in this field"
            onChange={handleCodeChange}
          />
        </label>
        <div className={formStyles.error} aria-live="polite">
          {error &&<ExclamationIcon /> }
          <span className={formStyles.error_text}>{error}</span>
        </div>
        <div className={formStyles.buttons}>
          <button
            tabIndex={3}
            aria-description="Navigate to Password enter page"
            className={formStyles.button_secondary}
            type="button"
            onClick={handlePassword}
          >
            Enter Password
          </button>
          <button
            tabIndex={2}
            aria-description="Submit the code to authenticate"
            className={formStyles.button_primary}
            type="submit"
            disabled={submitting}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
