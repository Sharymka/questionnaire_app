import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState({});

	const signIn = (user) => {
		setIsAuthenticated(true);
		setUser(user);
	};

	const signOut = () => {
		setIsAuthenticated(false);
		setUser({});
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
