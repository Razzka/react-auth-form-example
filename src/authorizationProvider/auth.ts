// Mocking authorization in local storage

const LOCAL_STORAGE_KEY = 'AUTH_MOCK';

const tryParse = (): Record<string, string> => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '');
  } catch {
    return {
      a: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb'
    };
  }
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let passwords: Record<string, string> = tryParse();

type EmailAndPassword = { email: string; password: string };

export const checkUserExists = async (email: string) => {
  await sleep(1000);
  const lowerCaseEmail = email.toLowerCase();
  return passwords[lowerCaseEmail] !== undefined;
};

export const logout = async () => {
  // Do Nothing as we don't actually authorize users
};

export const checkCodeValid = async (code: string) => {
  await sleep(1000);
  return code === '1234';
};

export const register = async ({ email, password }: EmailAndPassword) => {
  await sleep(1000);
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
  await sleep(1000);
  return passwords[lowerCaseEmail] === password;
};
