import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

	const navigate = useNavigate();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	// const { resetTemplateStates } = useContext(TemplateContext);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");

		if(storedUser) {
			setIsAuthenticated(true);
		}
	}, [])

	const signIn = (user) => {
		localStorage.setItem("user", JSON.stringify(user));

		const storedUser = localStorage.getItem("user");

		if (storedUser) {
			setIsAuthenticated(true);
			navigate('/home');
		}
	};

	const signOut = () => {
		localStorage.removeItem("user");

		const storedUser = localStorage.getItem("user");

		if (!storedUser) {
			setIsAuthenticated(false);
			navigate('/');
		}
	};

	return (
		<AuthContext.Provider value={{
			isAuthenticated,
			signIn,
			signOut
		}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
