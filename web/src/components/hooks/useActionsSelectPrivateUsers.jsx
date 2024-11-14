import  {useContext} from 'react';
import {TemplateContext} from "../userPage/contexts/TemplateContext";

const useActionsSelectPrivateUsers = (sortBy, questionId = null) => {

	const { questions, setQuestions } = useContext(TemplateContext);

	const addTags = (newUser) => {
		console.log(newUser);
		// в newUser приходит  объект вида
		// {id: 1, first_name:'Ivan', last_name:'Ivanov', email: 'ivanov@mail.rr'}


		setQuestions((prevState) => {

			const updatedQuestions = [...prevState];
			const questionIndex = questionId ? updatedQuestions.findIndex(question => question.id === questionId) : updatedQuestions.length - 1;
			const targetQuestion = questions[questionIndex];

				if(!targetQuestion.selectedUsers.includes(newUser)) {
					targetQuestion.selectedUsers.push(newUser);
				}

			if (newUser.length === 0) {
				targetQuestion.selectedUsers = [];
			}

			updatedQuestions[questionIndex] = targetQuestion;
			return updatedQuestions;
		});
	}

	const deleteSelectedUser = (selectedUserId)=> {

		setQuestions((prevState) => {
			const updatedQuestions = [...prevState];
			const questionIndex = questionId? updatedQuestions.findIndex(question => question.id === questionId): updatedQuestions.length - 1;
			const targetQuestion = questions[questionIndex];
			targetQuestion.selectedUsers = targetQuestion.selectedUsers.filter((selectedUser) => selectedUser.id !== selectedUserId);

			updatedQuestions[questionIndex] = targetQuestion;
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