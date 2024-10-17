import React, {useEffect} from 'react';
import {LABEL_USERS, users} from '../../const/const';
import {useContext, useState} from "react";
import {TemplateContext} from "./TemplateContext";
import NameOrEmailSorter from "./NameOrEmailSorter";
import CustomAutoComplete from "./ReusableComponents/CustomAutoComplete";
import {getData, postData} from "../../Requests";

export default function AutocompletePrivateUsers() {
	const { selectedUsers, setSelectedUsers } =  useContext(TemplateContext);
	const [ sortBy, setSortBy ] = useState('');

	const [users, setUsers] = useState([]);


	useEffect(() => {
		const getUsers = async() => {
			try {
				const response = await postData('api/users',{fields:['id', 'first_name', 'last_name', 'email']});
				const data = await response.json();

				if(response.ok) {
					console.log("template was saved successfully");
					setUsers(data);
				} else {
					console.log("template saving failed");
					console.log(data.error);
				}
			} catch(error){
				console.log("template saving failed");
			}
		}
		getUsers();
	}, [])

	const handleSelectedUsers = (newUser) => {
		if (newUser.length === 0) {
			setSelectedUsers([]);
		}
		newUser.forEach((user) => {
			setSelectedUsers((prevState) => {
				if (prevState.includes(user)) {
					return prevState;
				} else {
					return [...prevState, user];
				}
			});
		})
	}

	const deleteUser = (optionId)=> {
		setSelectedUsers((prevState) => prevState.filter((user)=> user.id !== optionId))
	}
	const getOptionLabel = (option) => `${option.first_name} ${option.last_name}`;
	const getTagLabel =(option, sortBy)=> sortBy ==='name' || sortBy === ''? option.first_name + '' + option.last_name: option.email

	return (
		<>
			<NameOrEmailSorter selectedUsers={selectedUsers} sortBy={sortBy} setSortBy={setSortBy} />
				<CustomAutoComplete
					value={selectedUsers}
					customOptions={users}
					getOptionLabel={getOptionLabel}
					getTagLabel={getTagLabel}
					label={LABEL_USERS}
					handleValue={handleSelectedUsers}
					sortBy={sortBy}
					deleteTag={deleteUser}
					placeholder=''
				/>
		</>

	);
}

