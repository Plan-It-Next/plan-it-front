// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    user_id: string;
    name: string;
    email: string;
    password: string;
}
interface Group {
    group_id: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isAuthenticated: boolean;

    currentGroup: Group | null;
    setCurrentGroup: (group: Group | null) => void;
    groupLoading: boolean;
    groupError: string | null;
    fetchUserGroups: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
    const [groupLoading, setGroupLoading] = useState(false);
    const [groupError, setGroupError] = useState<string | null>(null);

    useEffect(() => {
        // Recuperar usuario del localStorage al cargar
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const fetchUserGroups = async () => {
        if (!user) return;
        setGroupLoading(true);
        setGroupError(null);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8000/groups/${user.user_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch group');
            }

            const data = await response.json();
            if (data && data.length > 0) {
                setCurrentGroup(data[0]);
            }
        } catch (err) {
            setGroupError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setGroupLoading(false);
        }
    };


    const value = {
        user,
        setUser,
        isAuthenticated: !!user,

        currentGroup,
        setCurrentGroup,
        groupLoading,
        groupError,
        fetchUserGroups
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook personalizado para usar el contexto
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}