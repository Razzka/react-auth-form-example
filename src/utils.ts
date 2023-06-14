import sha256 from 'crypto-js/sha256';

export const checkEmailValid = (email: string) => {
  const dotIndex = email.indexOf('@');
  return dotIndex !== -1 && dotIndex !== email.length - 1;
};

export const hashPassword = async (password: string) => {
  return sha256(password).toString();
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
