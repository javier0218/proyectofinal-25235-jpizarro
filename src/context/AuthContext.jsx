import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || null;
    });

    const login = (username, password) => {
        // Aquí iría la lógica real de autenticación, por ahora es un mock
        if (username === 'roma' && password === '1234') {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';
            setToken(token);
            localStorage.setItem('token', token); // Guardar el token en localStorage
            // Marcar como autenticado para componentes que usan localStorage (Header, etc.)
            localStorage.setItem('auth', 'true');
            // Disparar evento para notificar cambios de auth en la misma pestaña
            window.dispatchEvent(new Event('authChange'));
            return true;
        }
        return false;
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token'); // Eliminar el token de localStorage
        localStorage.removeItem('auth');
        window.dispatchEvent(new Event('authChange'));
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    return useContext(AuthContext);
}



