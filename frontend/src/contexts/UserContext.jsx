import { createContext, useContext } from 'react';
export const UserContext = createContext(null);

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      'useUserContext는 UserContextProvider 안에서 사용되어야 합니다.',
    );
  }

  return context;
};

export const UserProvider = ({ children }) => {
  return <UserContext.Provider value={null}>{children}</UserContext.Provider>;
};
