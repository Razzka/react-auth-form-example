import bcrypt from 'bcryptjs';

export const checkEmailValid = (email: string) => {
  const dotIndex = email.indexOf('@');
  return dotIndex !== -1 && dotIndex !== email.length - 1;
};

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
