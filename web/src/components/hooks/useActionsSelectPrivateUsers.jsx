import  {useContext} from 'react';
import {TemplateContext} from "../contexts/TemplateContext";

const useActionsSelectPrivateUsers = (targetQuestion,  sortBy) => {

	const { setQuestions } = useContext(TemplateContext);

	const addUser = (newUser) => {
		// в newUser приходит  объект вида
		// {id: 1, first_name:'Ivan', last_name:'Ivanov', email: 'ivanov@mail.rr'}
		setQuestions((preQuestions) =>
			preQuestions.map((question) =>
			 question.id === targetQuestion.id && !targetQuestion.selectedUsers.includes(newUser)
				? {...question, selectedUsers: [...question.selectedUsers, newUser ]} :
				question
		) );
	}

	const deleteSelectedUser = (selectedUserId)=> {
		console.log('targetQuestion', targetQuestion);
		setQuestions((preQuestions) =>
			preQuestions.map((question) =>
			question.id === targetQuestion.id
				? {...question, selectedUsers: question.selectedUsers.filter((user)=> user.id !== selectedUserId) }:
				question
			));
	}
	const getOptionLabel = (user) => `${user.first_name} ${user.last_name}`;
	const getTagLabel =(user, sortBy)=> sortBy ==='name' || sortBy === ''? user.first_name + ' ' + user.last_name: user.email;

	return  {
		addUser,
		deleteSelectedUser,
		getOptionLabel,
		getTagLabel,
    };
}

export default useActionsSelectPrivateUsers;