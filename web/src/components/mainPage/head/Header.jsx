import React, { useContext, useState } from 'react';
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Button,
	TextField,
	Switch,
	Box,
	Select,
	MenuItem,
} from '@mui/material';
import { Search as SearchIcon, DarkMode, LightMode } from '@mui/icons-material';
import SignOutBtn from './SignOutBtn';
import SignInBtn from './SignInBtn';
import SignUpBtn from './SignUpBtn';
import { AuthContext } from '../context/AuthContext';

function Header() {
	const { isAuthenticated, user } = useContext(AuthContext);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [language, setLanguage] = useState('ru');
	const [searchText, setSearchText] = useState('');

	const handleThemeChange = () => {
		setIsDarkMode((prevMode) => !prevMode);
	};

	const handleSearchChange = (event) => {
		setSearchText(event.target.value);
	};

	const handleLanguageChange = (event) => {
		setLanguage(event.target.value);
	};

	return (
		<AppBar
			position="static"
			sx={{
				bgcolor: isDarkMode ? 'primary.dark' : 'linear-gradient(to right, #ffffff, #f0f0f0)',
				boxShadow: 3,
			}}
		>
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'black' }}>
					My Application
				</Typography>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						mr: 2,
						bgcolor: 'white',
						borderRadius: 1,
						boxShadow: 1,
						px: 1,
						border: 'none',
					}}
				>
					<SearchIcon color="action" sx={{ mr: 1 }} />
					<TextField
						variant="standard"
						size="small"
						placeholder="Search..."
						value={searchText}
						onChange={handleSearchChange}
						InputProps={{
							disableUnderline: false,
							sx: { color: 'black' },
						}}
						sx={{ '& .MuiInputBase-root': { borderRadius: 1, bgcolor: 'white', border: 'none' } }}
					/>
				</Box>
				<IconButton onClick={handleThemeChange} color="inherit" sx={{ mx: 1 }}>
					{isDarkMode ? <DarkMode sx={{ color: 'black' }} /> : <LightMode sx={{ color: 'yellow' }} />}
				</IconButton>
				<Switch checked={isDarkMode} onChange={handleThemeChange} color="default" />
				<Select
					value={language}
					onChange={handleLanguageChange}
					variant="outlined"
					size="small"
					sx={{
						mx: 2,
						minWidth: 80,
						bgcolor: 'white',
						color: 'black',
						borderRadius: 1,
						boxShadow: 1,
						'& .MuiSelect-icon': { color: 'primary.main' },
						'& .MuiOutlinedInput-notchedOutline': { border: 'none' },
					}}
				>
					<MenuItem value="ru">RU</MenuItem>
					<MenuItem value="en">EN</MenuItem>
				</Select>
				{isAuthenticated ? (
					<Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
						<Typography variant="body1" sx={{ mr: 2, color: 'black', fontWeight: 'bold' }}>
							Привет, {user.first_name} {user.last_name}!
						</Typography>
						<SignOutBtn />
					</Box>
				) : (
					<Box sx={{ display: 'flex', ml: 2 }}>
						<SignInBtn />
						<SignUpBtn />
					</Box>
				)}
			</Toolbar>
		</AppBar>
	);
}

export default Header;
