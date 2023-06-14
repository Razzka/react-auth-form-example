import React, { createContext, useState } from 'react';

interface AppContextProps {
  email: string;
  setEmail: (email: string) => void;
}

export const AppContext = createContext<AppContextProps>({
  email: '',
  setEmail: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [email, setEmail] = useState('');

  return (
    <AppContext.Provider value={{ email, setEmail }}>
      {children}
    </AppContext.Provider>
  );
};
