
 export function getQuestions(questions, userId, currentView) {

	 const user = JSON.parse(localStorage.getItem("user"));

	 if (!user) {
		 return questions.filter(question => question.access === 'public');
	 }

	 return questions.filter((question) => (userId === user.user.id && currentView === 'templateEditor' ) || question.access === 'public' || question.selectedUsers.some(selectedUser => selectedUser.id === user.id));
}
