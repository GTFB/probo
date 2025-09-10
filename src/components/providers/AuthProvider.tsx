'use client';

import { createContext, useContext, useState,  } from 'react';

export type SessionData = {
    token: string;
    group: string;
    sections: string[];
    timestamp: number;
  }

const AuthContext = createContext<{
    sessionData: SessionData|null;
    setSessionData: (value: SessionData) => void;
} | null>(null);


type AuthProviderProps = {
  children: React.ReactNode;
  initialSessionData: SessionData|null;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default function AuthProvider({ children, initialSessionData }: AuthProviderProps) {
  const [sessionData, setSessionData] = useState<SessionData|null>(initialSessionData);

  return (
    <AuthContext.Provider value={{ sessionData, setSessionData }}>
      {children}
    </AuthContext.Provider>
  );
}