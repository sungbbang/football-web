import { createContext, useContext, useEffect, useState } from 'react';
import { verifyToken } from '../api/user';
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    verifyToken()
      .then(res => {
        setUser(res.result);
        setIsAuthenticated(true);
      })
      .catch(error => {
        console.log('토큰 인증 실패: ', error);
        setUser(null);
        setIsAuthenticated(false);
      });
  }, []);

  const login = userData => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    console.log('context: ', context);
    throw new Error('context error');
  }

  return context;
};
