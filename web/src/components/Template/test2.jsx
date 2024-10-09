import * as React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {users} from '../../const/const';
import {FormControlLabel, Radio} from "@mui/material";
import {useState} from "react";

export default function FixedTags() {
	const [checkedUsers, setCheckedUsers] = React.useState([]);
	const [sortBy, setSortBy] = useState('');

	const handleCheckedUsers = (newUser) => {
		if (newUser.length === 0) {
			setCheckedUsers([]);
		}
		newUser.forEach((user) => {
			setCheckedUsers((prevState) => {
				if (prevState.includes(user)) {
					return prevState;
				} else {
					return [...prevState, user];
				}
			});
		})
	}

	const handelSorter = (value) => {
		if(sortBy !== value) {
			setSortBy(value);
		} else {
			setSortBy('');
		}
		// setSortBy('name');
	}

	const deleteTag = (optionId)=> {
		setCheckedUsers((prevState) => prevState.filter((user)=> user.id !== optionId))
	}

	const sortedUsers = (sortBy)=> {
		checkedUsers.sort((a, b) => {
			if (sortBy === 'name') {
				return `${a.first_name}`.localeCompare(`${b.first_name}`);

			} else {
				return a.email.localeCompare(b.email);
			}
		});
	}

	return (
		<>
			<div>
				<FormControlLabel
					control={
						<Radio
							checked={sortBy === 'name'}
								onClick={() => {
									handelSorter('name');
									sortedUsers()
								}
							}
						/>
					}
					label="Сортировать по имени"
					sx={{
						typography: 'body1',  // Стиль текста
						color: '#555',        // Цвет текста
						'& .MuiRadio-root': { // Стилизация радио-кнопки
							color: '#8199b0',
						},
						'& .MuiRadio-root.Mui-checked': {
							color: '#3b464f', // Цвет активной радио-кнопки
						},
						'& .MuiFormControlLabel-label': {
							fontWeight: 'bold', // Жирный текст лейбла
						},
					}}
				/>
				<FormControlLabel
					control={
						<Radio
							checked={sortBy === 'email'}
							onClick={() => {
								handelSorter('email');
								sortedUsers()
							}}
						/>
					}
					label="Сортировать по электронной почте"
				/>
			</div>
			<Autocomplete
				multiple
				className=' d-flex diraction-row w-90'
				id="fixed-tags-demo"
				value={checkedUsers}
				onChange={(event, newUser) => {
					handleCheckedUsers(newUser)
				}}
				options={users}
				getOptionLabel={(option) => option.first_name + '' + option.last_name}

				renderTags={(tagValue, getTagProps) =>
					tagValue.map((option, index) => {
						const {key, ...tagProps} = getTagProps({index});
						return (
							<Chip
								key={key}
								label={sortBy ==='name' || sortBy === ''? option.first_name + '' + option.last_name: option.email}
								{...tagProps}
								onDelete={(event) => {
									event.preventDefault();
									deleteTag(option.id)
								}}
							/>
						);
					})
				}
				style={{width: 500 }}
				renderInput={(params) => (
					<TextField {...params} label="Пользователи" placeholder="Favorites" />
				)}
			/>
		</>

	);
}

