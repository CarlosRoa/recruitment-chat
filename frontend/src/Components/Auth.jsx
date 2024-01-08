import React, {useEffect, useState} from 'react';
import app from '../firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from './Login';

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
    });

    return (
        <AuthContext.Provider value={{currentUser}}>
            {currentUser ? children : <Login />}
        </AuthContext.Provider>
    );
}