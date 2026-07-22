/* Hallmark · context: AuthContext · pre-emit critique: P5 H5 E5 S5 R5 V5 · genre: modern-minimal */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount } from '../types';
import { secureStorage } from '../utils/secureStorage';

interface AuthContextType {
  currentUser: UserAccount | null;
  users: UserAccount[];
  login: (emailOrNim: string, passwordOrPin: string) => Promise<UserAccount>;
  signup: (userData: Omit<UserAccount, 'id' | 'role' | 'avatar'> & { role?: UserAccount['role']; adminCode?: string }) => Promise<UserAccount>;
  logout: () => void;
  updateUserRole: (userId: string, role: UserAccount['role']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_ADMIN: UserAccount = {
  id: 'usr-admin',
  name: 'Admin BAAK IF 2026',
  nim: '261110001',
  whatsapp: '089988776655',
  email: import.meta.env.VITE_ADMIN_EMAIL || 'admin@example.com',
  password: import.meta.env.VITE_ADMIN_PASSWORD || 'admin2026',
  role: 'admin',
  avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=BAAK'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [users, setUsers] = useState<UserAccount[]>([]);

  // Load registered users and current session
  useEffect(() => {
    fetch('/api/users')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then((data) => {
        setUsers(data);
        secureStorage.setItem('infotik_users', data);
      })
      .catch(() => {
        const loadedUsers = secureStorage.getItem<UserAccount[]>('infotik_users');
        if (loadedUsers) {
          const mapped = loadedUsers.map((u) =>
            u.id === 'usr-admin'
              ? {
                  ...u,
                  email: import.meta.env.VITE_ADMIN_EMAIL || 'admin@example.com',
                  password: import.meta.env.VITE_ADMIN_PASSWORD || 'admin2026'
                }
              : u
          );
          setUsers(mapped);
        } else {
          const initialUsers = [DEFAULT_ADMIN];
          setUsers(initialUsers);
          secureStorage.setItem('infotik_users', initialUsers);
        }
      });

    const session = secureStorage.getItem<UserAccount>('infotik_current_user');
    if (session) {
      setCurrentUser(session);
    }
  }, []);

  const login = async (emailOrNim: string, passwordOrPin: string): Promise<UserAccount> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrNim, password: passwordOrPin })
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        secureStorage.setItem('infotik_current_user', data.user);
        return data.user;
      }
      const errData = await res.json();
      throw new Error(errData.message || 'Login gagal.');
    } catch (err: any) {
      console.warn('[Auth Login Fallback]', err);
      const user = users.find(
        (u) =>
          (u.email === emailOrNim || u.nim === emailOrNim) &&
          u.password === passwordOrPin
      );

      if (!user) {
        throw new Error(err.message || 'Email/NIM atau password salah!');
      }

      setCurrentUser(user);
      secureStorage.setItem('infotik_current_user', user);
      return user;
    }
  };

  const signup = async (
    userData: Omit<UserAccount, 'id' | 'role' | 'avatar'> & { role?: UserAccount['role']; adminCode?: string }
  ): Promise<UserAccount> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        secureStorage.setItem('infotik_current_user', data.user);
        return data.user;
      }
      const errData = await res.json();
      throw new Error(errData.message || 'Registrasi gagal.');
    } catch (err: any) {
      console.warn('[Auth Register Fallback]', err);
      const exists = users.find((u) => u.nim === userData.nim || u.email === userData.email);
      if (exists) {
        throw new Error('NIM atau Email sudah terdaftar!');
      }

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
      secureStorage.setItem('infotik_users', updatedList);

      setCurrentUser(newUser);
      secureStorage.setItem('infotik_current_user', newUser);
      return newUser;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    secureStorage.removeItem('infotik_current_user');
  };

  const updateUserRole = (userId: string, role: UserAccount['role']) => {
    fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role })
    }).catch((err) => console.warn('[Update Role Fallback]', err));

    const updated = users.map((u) => (u.id === userId ? { ...u, role } : u));
    setUsers(updated);
    secureStorage.setItem('infotik_users', updated);

    if (currentUser && currentUser.id === userId) {
      const updatedUser = { ...currentUser, role };
      setCurrentUser(updatedUser);
      secureStorage.setItem('infotik_current_user', updatedUser);
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
