import React, { createContext, useContext, useState } from 'react';
import type { User } from '../types';
import { getUsers } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (nickName: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (nickName: string, password: string): Promise<boolean> => {
    if (password !== '123456') {
      throw new Error('Contraseña incorrecta. La contraseña fija es 123456');
    }

    try {
      const users = await getUsers();
      const foundUser = users.find((u) => u.nickName === nickName);

      if (!foundUser) {
        throw new Error('El usuario no existe en la base de datos');
      }

      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    } catch (error) {
      console.error('Error en el login:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};