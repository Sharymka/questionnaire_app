// Функция трансформации
export function transformForm(matchedForm){

	if (!matchedForm) return null;

	return {
		id: matchedForm.id,
		title: matchedForm.template?.title || "",
		topic: matchedForm.template?.topic || "",
		description: matchedForm.template?.description || "",
		tags: matchedForm.template?.tags || "",
		img: matchedForm.template?.img || "",
		user: `${matchedForm.user?.first_name} ${matchedForm.user?.last_name}` || "",
		questions: matchedForm.questions || "",
	};
}
