import {getQuestionCardConfig} from "./getQuestionCardConfig";

export function getDefaultTempConfig(context, question) {
	switch (context) {
		case "addTemplate":
			return {
				header: 'edit',
				sidePanel: true
			}
		case "myTemplates":
			return {
				header: 'edit',
				sidePanel: true
			}
		case "filledForm":
			return {
				header: 'readOnly',
				sidePanel: false
			}
		default:
			return {
				header: 'edit',
				sidePanel: true
			};
		// case "edit":
		// 	return {
		// 		toolBlock: true,
		// 		question: 'edit',
		// 		checkboxMode: "readOnly",
		// 	};
		// case "select":
		// 	return {
		// 		toolBlock: true,
		// 		question: 'edit',
		// 		checkboxMode: "readOnly",
		// 	};
		// default:
		// 	return {
		// 		toolBlock: true,
		// 		question: 'edit',
		// 		checkboxMode: "readOnly",
		// 	};
	}
}