import React, {useContext, useRef, useState} from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	TextField,
	Switch,
	Box, Menu,
} from '@mui/material';
import { Search as SearchIcon, DarkMode, LightMode } from '@mui/icons-material';
import SignOutBtn from './SignOutBtn';
import SignInBtn from './SignInBtn';
import SignUpBtn from './SignUpBtn';
import { AuthContext } from './context/AuthContext';
import LanguageSelector from "./LanguageSelector";
import MenuComponent from "./MenuComponent";
import useActionsTemplates from "../hooks/useActionsTemplates";
import {useNavigate} from "react-router-dom";

function Header() {

	const navigate = useNavigate();
	const { isAuthenticated } = useContext(AuthContext);
	const { filterTemplates } = useActionsTemplates();
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [language, setLanguage] = useState('EN');
	const [searchText, setSearchText] = useState('');

	const isRedirected = useRef(false);

	const handleThemeChange = () => {
		setIsDarkMode((prevMode) => !prevMode);
	};

	const handleSearchChange = (event) => {
		if (event.target.value.length === 1 && !isRedirected.current) {
			navigate('/templates');
			isRedirected.current = true;
		}

		if (event.target.value.length === 0) {
			setTimeout(() => {
				navigate(-1);
			}, 1000);
			isRedirected.current = false;
		}

		setSearchText(event.target.value);
		filterTemplates(event.target.value);
	};


	const handleLanguageChange = (event) => {
		setLanguage(event.target.value);
	};

	return (
		<AppBar
			position="static"
			className={`appBar ${isDarkMode? 'dark' : 'light'}`}
		>
			<Toolbar
			className="justify-content-between h-100"
			>
				<Toolbar>
					<MenuComponent/>
					<Box className='searchBox'>
						<SearchIcon
							className={`searchIcon ${isDarkMode ? 'dark' : 'light'}`}
						/>
						<TextField
							variant="standard"
							size="small"
							placeholder="Search..."
							className={`searchTextField ${isDarkMode ? 'dark' : 'light'}`}
							value={searchText}
							onChange={handleSearchChange}
						/>
					</Box>
				</Toolbar>
				<Toolbar>
					<IconButton onClick={handleThemeChange}>
						{
							isDarkMode ?
								<DarkMode className='darkMode'/>:
								<LightMode className='lightMode'/>
						}
					</IconButton>
					<Switch checked={isDarkMode} onChange={handleThemeChange} color="default" />
					{/*<LanguageSelector isDarkMode={isDarkMode} handleLanguageChange={handleLanguageChange} language={language}/>*/}
					{isAuthenticated ? (
						<Box>
							<SignOutBtn/>
						</Box>
					) : (
						<Box>
							<SignInBtn/>
							<SignUpBtn/>
						</Box>
					)}
				</Toolbar>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
