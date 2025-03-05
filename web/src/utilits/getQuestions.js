
 export function getQuestions(questions, userId, currentView) {

	 const user = JSON.parse(localStorage.getItem("user"));

	 // const user = {
		//  id: 1,
		//  first_name: "Иван",
		//  last_name: "Иванов",
		//  email: "ivan@example.com"
	 // }
	 return questions.filter((question) => (userId === user.user.id && currentView === 'templateEditor' ) || question.access === 'public' || question.selectedUsers.some(selectedUser => selectedUser.id === user.id));
}
