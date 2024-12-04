import React, { useContext, useState } from 'react';
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
import {TemplateContext} from "../contexts/TemplateContext";
import MainPage from "./MainPage";

function Header() {
	const { isAuthenticated, user } = useContext(AuthContext);
	const { handleFilteredTemplate, setShowAllTemplates } = useContext(TemplateContext);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [language, setLanguage] = useState('EN');
	const [searchText, setSearchText] = useState('');

	const handleThemeChange = () => {
		setIsDarkMode((prevMode) => !prevMode);
	};

	const handleSearchChange = (event) => {
		setShowAllTemplates(true);
		setSearchText(event.target.value);
		handleFilteredTemplate(event.target.value);
	};

	const handleLanguageChange = (event) => {
		setLanguage(event.target.value);
	};

	return (
		<AppBar
			data-context="Header"
			position="static"
			sx={{ bgcolor: isDarkMode ? '#4A5568' : '#ffffff',
				boxShadow: 2,
				height: '9%',
			}}>
			<Toolbar
			className="justify-content-between h-100"
			>
				<Toolbar>
					<MenuComponent/>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							mr: 2,
							borderBottom: "1px solid #A0AEC0",
							px: 1
						}}
					>

						<SearchIcon
							sx= {{ mr: 1, color: isDarkMode ? '#b9baba' : '#727476' }}
						/>
						<TextField
							variant="standard"
							size="small"
							placeholder="Search..."
							value={searchText}
							onChange={handleSearchChange}
							InputProps={{
								disableUnderline: true,
								sx: { color: isDarkMode ? '#f9fafb' : '#727476' }
							}}
						/>
					</Box>
				</Toolbar>
				<Toolbar>
					<IconButton onClick={handleThemeChange} color="inherit" sx={{ mx: 1 }}>
						{isDarkMode ? <DarkMode sx={{ color: '#A0AEC0' }} /> : <LightMode sx={{ color: '#4b525d' }} />}
					</IconButton>
					<Switch checked={isDarkMode} onChange={handleThemeChange} color="default" />
					<LanguageSelector isDarkMode={isDarkMode} handleLanguageChange={handleLanguageChange} language={language}/>
					{isAuthenticated ? (
						<Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
						<SignOutBtn/>
						</Box>
					) : (
						<Box sx={{ display: 'flex', ml: 2 }}>
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
