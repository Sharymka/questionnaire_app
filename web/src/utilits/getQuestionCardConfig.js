export function getQuestionCardConfig(setQuestionStatus, id) {

	switch (setQuestionStatus) {
		case "readOnly":
			return {
				id: id,
				toolBlock: false,
				question: 'readOnly',
				answer: 'readOnly',
				checkboxMode: "readOnly"
			}
		case "edit":
			return {
				id: id,
				toolBlock: true,
				question: "edit",
				answer: "readOnly",
				checkboxMode: "edit"
			}
		case "select":
			return {
				id: id,
				toolBlock: false,
				question: "readOnly",
				answer: "fillOut",
				checkboxMode: "select"
			}
		default:
			return {
				id: id,
				toolBlock: true,
				question: "readOnly",
				answer: "readOnly",
				checkboxMode: "readOnly",
			};
	}
}
