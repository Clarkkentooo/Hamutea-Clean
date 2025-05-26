import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in from localStorage
        const token = localStorage.getItem('adminToken');
        const userStr = localStorage.getItem('adminUser');
        
        if (token && userStr) {
            try {
                const user = JSON.parse(userStr);
                // Add verification flags if they don't exist
                if (user && !('phoneVerified' in user)) {
                    user.phoneVerified = true;
                }
                if (user && !('emailVerified' in user)) {
                    user.emailVerified = true;
                }
                setCurrentUser(user);
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminUser');
            }
        }
        
        setLoading(false);
    }, []);

    const login = (userData, token) => {
        // Ensure verification flags are set
        if (userData && !('phoneVerified' in userData)) {
            userData.phoneVerified = true;
        }
        if (userData && !('emailVerified' in userData)) {
            userData.emailVerified = true;
        }
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(userData));
        setCurrentUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setCurrentUser(null);
    };

    const updateUser = (userData) => {
        localStorage.setItem('adminUser', JSON.stringify(userData));
        setCurrentUser(userData);
    };

    return (
        <AuthContext.Provider value={{ 
            currentUser, 
            login, 
            logout, 
            updateUser,
            isAuthenticated: !!currentUser,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};