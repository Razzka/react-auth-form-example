// Mocking authorization in local storage

const LOCAL_STORAGE_KEY = 'AUTH_MOCK';

const tryParse = (): Record<string, string> => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '');
  } catch {
    return {};
  }
};

let passwords: Record<string, string> = tryParse();

type EmailAndPassword = { email: string; password: string };

export const checkUserExists = async (email: string) => {
  const lowerCaseEmail = email.toLowerCase();
  return passwords[lowerCaseEmail] !== undefined;
};

export const logout = async () => {
  // Do Nothing as we don't actually authorize users
};

export const checkCodeValid = async (code: string) => {
  return code === '1234';
};

export const register = async ({ email, password }: EmailAndPassword) => {
  const lowerCaseEmail = email.toLowerCase();
  if (passwords[lowerCaseEmail] === undefined) {
    passwords[lowerCaseEmail] = password;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(passwords));
    return true;
  }

  return false;
};

export const tryLogin = async ({ email, password }: EmailAndPassword) => {
  const lowerCaseEmail = email.toLowerCase();
  return passwords[lowerCaseEmail] === password;
};
