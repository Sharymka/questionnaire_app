import * as React from 'react';
import {LABEL_USERS, users} from '../../../../../const/const';
import {useContext, useState} from "react";
import NameOrEmailSorter from "../NameOrEmailSorter";
import CustomAutoComplete from "../../reusableSimpleComp/CustomAutoComplete";
import {TemplateContext} from "../../../contexts/TemplateContext";

 function AutocompletePrivateUsersCard(props) {

	const { selectedUsers, questionIndex } = props;
	const { setQuestions } = useContext(TemplateContext);
	const [sortBy, setSortBy] = useState('');

	const handleSelectedUsers = (newUser) => {
		console.log(newUser);
		if (newUser.length === 0) {
			setQuestions((prevState) =>
				prevState.map((question) => ({ ...question, selectedUsers: [] }))
			);
		} else {
			newUser.forEach((user) => {
				setQuestions((prevState) =>
					prevState.map((question, index) => {
						if(index === questionIndex ) {
							if (question.selectedUsers.includes(user)) {
								return question;
							} else {
								return { ...question, selectedUsers: [...question.selectedUsers, user] };
							}
						} else {
							return question;
						}
					})
				);
			});
		}
	}

	const deleteUser = (selectedUserId) => {
		setQuestions((prevState) =>
			prevState.map((question, index) => {
				if (index === questionIndex) {
					return {
						...question,
						selectedUsers: question.selectedUsers.filter((user, index) => user.id !== selectedUserId),
					};
				} else {
					return question;
				}
			})
		);
	};
	const getOptionLabel = (option) => option.first_name + " " + option.last_name;
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

export default AutocompletePrivateUsersCard;