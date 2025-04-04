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
		} else {
			console.log("Нет данных в localStorage");
		}
	};

	const signOut = () => {
		console.log('signOut');
		localStorage.removeItem("user");

		const storedUser = localStorage.getItem("user");

		if (!storedUser) {
			console.log("Данные Удалены:", storedUser);
			setIsAuthenticated(false);
			// resetTemplateStates();
			navigate('/');
		} else {
			console.log("Данные в localStorage не удалились:", JSON.parse(storedUser));
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
