import React, {useContext, useState} from "react";
import {TemplateContext} from "../TemplateContext";
import {accessOptions} from "../../../const/const";


export const QuestionContext = React.createContext(null);

const QuestionContextProvider = ({ children }) => {

	const { accessLevel, setAccessLevel, setSelectedUsers } = useContext(TemplateContext);
	const [editorAnchor, setEditorAnchor] = useState(false);
	const [showUsers , setShowUsers] = React.useState(false);

	const handleEditorAnchor = () => {
		console.log("handleEditorAnchor");
		setEditorAnchor(!editorAnchor);
	}

	const handleAccessLevel = (event) => {
		const newAccessLevel = event.target.value;
		setAccessLevel(newAccessLevel);
		if(newAccessLevel === 'public'){
			setShowUsers(false);
			setSelectedUsers([]);
		}else {
			setShowUsers(true);
		}
	}

	return <QuestionContext.Provider
				value={{
					handleEditorAnchor,
					handleAccessLevel,
					accessLevel,
					editorAnchor,
					showUsers
				}}>
				{children}
	       </QuestionContext.Provider>;

}

export default QuestionContextProvider;