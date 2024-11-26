import  {useContext} from 'react';
import {TemplateContext} from "../userPage/contexts/TemplateContext";

const useActionsSelectPrivateUsers = (targetQuestionId, sortBy) => {

	const { setQuestions } = useContext(TemplateContext);

	const addTags = (newUser) => {
		// в newUser приходит  объект вида
		// {id: 1, first_name:'Ivan', last_name:'Ivanov', email: 'ivanov@mail.rr'}

		setQuestions((prevState) => {
			const updatedQuestions = [...prevState];
			const targetQuestionIndex = updatedQuestions.findIndex(question => question.id === targetQuestionId);
			const targetQuestion = updatedQuestions[targetQuestionIndex];

				if(!targetQuestion.selectedUsers.includes(newUser)) {
					targetQuestion.selectedUsers.push(newUser);
				}

			updatedQuestions[targetQuestionIndex] = targetQuestion;
			return updatedQuestions;
		});
	}

	const deleteSelectedUser = (selectedUserId)=> {
		setQuestions((prevState) => {
			const updatedQuestions = [...prevState];
			const targetQuestionIndex = updatedQuestions.findIndex(question => question.id === targetQuestionId);
			const targetQuestion = updatedQuestions[targetQuestionIndex];

			targetQuestion.selectedUsers = targetQuestion.selectedUsers.filter((selectedUser) => selectedUser.id !== selectedUserId);

			updatedQuestions[targetQuestionIndex] = targetQuestion;
			return updatedQuestions;
		})

	}
	const getOptionLabel = (user) => `${user.first_name} ${user.last_name}`;
	const getTagLabel =(user, sortBy)=> sortBy ==='name' || sortBy === ''? user.first_name + ' ' + user.last_name: user.email;

	return  {
		addTags,
		deleteSelectedUser,
		getOptionLabel,
		getTagLabel,
    };
}

export default useActionsSelectPrivateUsers;