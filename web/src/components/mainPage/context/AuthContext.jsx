import React, { createContext, useContext, useState } from 'react';
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

	const navigate = useNavigate();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState({});

	const signIn = (user) => {
		setIsAuthenticated(true);
		localStorage.setItem("user", JSON.stringify(user));
		setUser(user);
	};

	const signOut = () => {
		setIsAuthenticated(false);
		setUser({});
		navigate('/')
	};

	return (
		<AuthContext.Provider value={{
			isAuthenticated,
			user,
			signIn,
			signOut
		}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
