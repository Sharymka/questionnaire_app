import {answerTypeName} from "../const/const";

export function getAnswerTypeName(value, firstKey) {
	let field = value[firstKey]
	return answerTypeName[field];
}
