import React, { useEffect, useState} from "react";
import {postData} from "../../Requests";

export const TemplateContext = React.createContext(null);

function TemplateProvider({children}) {

	const [title, setTitle] = React.useState('');
	const [topic, setTopic] = React.useState('education');
	const [description, setDescription] = React.useState('');
	const [question, setQuestion] = React.useState('');
	const [questions, setQuestions] = useState([]);
	const [answerType, setAnswerType] = React.useState('singleLine');
	const [checkboxOptions, setCheckboxOptions] = React.useState([ { value: '', selected: false }]);
	const [accessLevel, setAccessLevel] =  useState('public');
	const [selectedUsers, setSelectedUsers] = React.useState([]);
	const [selectedTags, setSelectedTags] = useState([]);
	const [editorAnchor, setEditorAnchor] = React.useState(
		questions && questions.length > 0
			? questions.map((question, index) => ({ id: index, editorAnchorValue: false }))
			: []
	);
	const [showUsers , setShowUsers] = React.useState(false);
	const [privateUsersAnchor, setPrivateUsersAnchor] = React.useState(questions && questions.length > 0
		? questions.map((question, index) => ({ id: index, privateUsersAnchorValue: true }))
		: [] );


	useEffect(() => {
		if (questions.length > editorAnchor.length) {
			setEditorAnchor((prevState) => [
				...prevState,
				{ id: questions.length - 1, editorAnchorValue: false },
			]);
		}

		setPrivateUsersAnchor(
			questions.map((question, index) => ({
				id: index,
				privateUsersAnchorValue: question.access === "restricted"
			}))
		);

	}, [questions]); // Следим за изменениями questions

	const saveTemplate = async ()=> {
		const requestData = {
			title:title,
			topic:topic,
			description:description,
			questions:questions,
			tags:selectedTags,
		}
		try {
			const response = await postData('api/template', requestData);

			const responseData = await response.json();

			if (response.ok) {
				console.log("Save template successfully:", responseData);
			}else {
				console.log("template saving failed:", responseData.error);
				// setMessage(data.error);
			}
		}catch (error) {
			console.log("Registered failed:", error.message);
		}

		resetInitialStates();
		setTitle('');
		setTopic('education');
		setDescription('');
		setQuestions([]);
		setSelectedTags([]);


	}

	const handleTitle = (event) => {
		setTitle(event.target.value);
	};

	const handleTopic= (event) => {
		setTopic(event.target.value);
	}

	const handleDescription = (event) => {
		setDescription(event.target.value);
	};

	const handleQuestion = (event) => {
		setQuestion(event.target.value);
	};

	const handleAnswerType = (event) => {
		const newAnswerType = event.target.value;
		setAnswerType(newAnswerType);
		if(newAnswerType !== 'checkboxes') {
			setCheckboxOptions([]);
		}
	}

	const handleCheckboxes = (event) => {
		setCheckboxOptions((prevState) =>
			prevState.map((option) => ({
				...option,
				selected: option.value === event.target.value
			}))
		);
	};

	const handleAddCheckboxOption = () => {
		setCheckboxOptions([...checkboxOptions, { value: '', selected: false }]);
	};

	const handleDeleteCheckboxOption = (selecteDindex) => {
		setCheckboxOptions(prevState => (prevState.filter((option, index)=> index!== selecteDindex)));
	};

	const handleCheckboxTextField = (event, selectedIndex)=> {
		setCheckboxOptions((prevState) => (
			prevState.map((option, index)=> selectedIndex === index? {...option, value: event.target.value}  : option )
		));
	}

	const handleAddQuestion = () => {
		setQuestions((prevState) => [...prevState, {
			name: question,
			answerType: answerType,
			checkboxOptions: checkboxOptions,
			access: accessLevel,
			selectedUsers: selectedUsers,
		}])
		resetInitialStates();
		resetEditorAnchor();
	}

	const handleDeleteQuestion = (questionIndex) => {
		setQuestions(prevState => prevState.filter((question, index) => index !== questionIndex))
	}

	const resetInitialStates = ()=> {
		setQuestion('');
		setAnswerType('singleLine');
		setAccessLevel('public');
		setCheckboxOptions([]);
		setSelectedUsers([]);
	}

	const resetEditorAnchor = () => {
		setEditorAnchor((prevState) => prevState.map((option, index)=> {
			return {...option, editorAnchorValue: false};
		}))
	}

	const handleEditQuestion = (newValue, selectedIndex, field) => {
		setQuestions((prevState) =>
			prevState.map((option, index) =>
				selectedIndex === index
					? { ...option, [field]: newValue }
					: option
			)
		);
	}
	const handleAccessLevel = (event) => {
		setAccessLevel(event.target.value);
		if(event.target.value === 'public'){
			setShowUsers(false);
			setSelectedUsers([]);
		}else {
			setShowUsers(true);
		}
	}

	const handleEditorAnchor = (questionIndex) => {
		setEditorAnchor((prevState) =>
			prevState.map((item) => {
				if(item.id === questionIndex) {
					return {...item, editorAnchorValue: !item.editorAnchorValue}
				}else {
					return {...item, editorAnchorValue: false};
				}
			}));
	}

  return (
	  <TemplateContext.Provider value={{
		  title,
		  setTitle,
		  handleTitle,
		  topic,
		  setTopic,
		  handleTopic,
		  description,
		  setDescription,
		  handleDescription,
		  handleQuestion,
		  answerType,
		  handleAnswerType,
		  checkboxOptions,
		  handleCheckboxes,
		  handleAddCheckboxOption,
		  handleDeleteCheckboxOption,
		  handleCheckboxTextField,
		  accessLevel,
		  setAccessLevel,
		  selectedUsers,
		  setSelectedUsers,
		  selectedTags,
		  setSelectedTags,
		  questions,
		  setQuestions,
		  handleAddQuestion,
		  handleEditQuestion,
		  handleEditorAnchor,
		  handleDeleteQuestion,
		  editorAnchor,
		  handleAccessLevel,
		  showUsers,
		  privateUsersAnchor,
		  setPrivateUsersAnchor,
		  saveTemplate
	  }}>
		  {children}
	  </TemplateContext.Provider>

  );
}

export default TemplateProvider;