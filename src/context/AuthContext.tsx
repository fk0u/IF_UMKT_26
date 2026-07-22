/* Hallmark · context: AuthContext · genre: modern-minimal */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount } from '../types';

interface AuthContextType {
  currentUser: UserAccount | null;
  users: UserAccount[];
  login: (emailOrNim: string, passwordOrPin: string) => Promise<UserAccount>;
  signup: (userData: Omit<UserAccount, 'id' | 'role' | 'avatar'> & { role?: UserAccount['role'] }) => Promise<UserAccount>;
  logout: () => void;
  updateUserRole: (userId: string, role: UserAccount['role']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_ADMIN: UserAccount = {
  id: 'usr-admin',
  name: 'Admin BAAK IF 2026',
  nim: '260000000',
  whatsapp: '081111111111',
  email: import.meta.env.VITE_ADMIN_EMAIL || 'admin@infotik.com',
  password: import.meta.env.VITE_ADMIN_PASSWORD || 'admin2026',
  role: 'admin',
  avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=admin'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [users, setUsers] = useState<UserAccount[]>([]);

  // Load registered users and current session
  useEffect(() => {
    const savedUsers = localStorage.getItem('infotik_users');
    if (savedUsers) {
      let loadedUsers: UserAccount[] = JSON.parse(savedUsers);
      // Sync admin account in local storage with current .env configuration
      loadedUsers = loadedUsers.map((u) =>
        u.id === 'usr-admin'
          ? {
              ...u,
              email: import.meta.env.VITE_ADMIN_EMAIL || 'admin@infotik.com',
              password: import.meta.env.VITE_ADMIN_PASSWORD || 'admin2026'
            }
          : u
      );
      setUsers(loadedUsers);
      localStorage.setItem('infotik_users', JSON.stringify(loadedUsers));
    } else {
      const initialUsers = [DEFAULT_ADMIN];
      setUsers(initialUsers);
      localStorage.setItem('infotik_users', JSON.stringify(initialUsers));
    }

    const session = localStorage.getItem('infotik_current_user');
    if (session) {
      setCurrentUser(JSON.parse(session));
    }
  }, []);

  const login = async (emailOrNim: string, passwordOrPin: string): Promise<UserAccount> => {
    // 300ms simulated network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const user = users.find(
      (u) =>
        (u.email === emailOrNim || u.nim === emailOrNim) &&
        u.password === passwordOrPin
    );

    if (!user) {
      throw new Error('Email/NIM atau password salah!');
    }

    setCurrentUser(user);
    localStorage.setItem('infotik_current_user', JSON.stringify(user));
    return user;
  };

  const signup = async (userData: Omit<UserAccount, 'id' | 'role' | 'avatar'> & { role?: UserAccount['role'] }): Promise<UserAccount> => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    // Check if NIM or Email already exists
    const exists = users.find((u) => u.nim === userData.nim || u.email === userData.email);
    if (exists) {
      throw new Error('NIM atau Email sudah terdaftar!');
    }

    // NIM Angkatan 2026 validation for regular signup
    if (!userData.nim.startsWith('26') && userData.role !== 'admin') {
      throw new Error('Pendaftaran ditolak: NIM bukan Mahasiswa Angkatan 2026!');
    }

    const newUser: UserAccount = {
      name: userData.name,
      nim: userData.nim,
      whatsapp: userData.whatsapp,
      email: userData.email,
      password: userData.password,
      id: 'usr-' + Date.now(),
      role: userData.role || 'user',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(userData.name)}`
    };

    const updatedList = [...users, newUser];
    setUsers(updatedList);
    localStorage.setItem('infotik_users', JSON.stringify(updatedList));

    setCurrentUser(newUser);
    localStorage.setItem('infotik_current_user', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('infotik_current_user');
  };

  const updateUserRole = (userId: string, role: UserAccount['role']) => {
    const updated = users.map((u) => (u.id === userId ? { ...u, role } : u));
    setUsers(updated);
    localStorage.setItem('infotik_users', JSON.stringify(updated));

    if (currentUser && currentUser.id === userId) {
      const updatedUser = { ...currentUser, role };
      setCurrentUser(updatedUser);
      localStorage.setItem('infotik_current_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, users, login, signup, logout, updateUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
