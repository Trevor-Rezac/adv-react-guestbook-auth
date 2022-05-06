import { createContext, useContext, useState } from 'react';
import { getUser, signInUser, signUpUser } from '../services/user';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const currentUser = getUser();
  const [user, setUser] = useState(currentUser || { email: null }); 

  const login = async (email, password) => {
    const existingUser = await signInUser({ email, password });

    if (existingUser) {
      setUser(existingUser);
    }
  };

  const signUp = async (email, password) => {
    const newUser = await signUpUser({ email, password});

    if (newUser) {
      setUser(newUser);
    }
  }

  const logout = () => {
    setUser({ email: null });
  }

  return (
    <UserContext.Provider value={{ user, login, signUp, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider')
  }

  return context;
}